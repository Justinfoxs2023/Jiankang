import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '../../services/monitoring/alert.service';
import { Alert } from '../../services/monitoring/monitoring.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-alert-dashboard',
  template: `
    <div class="alert-dashboard">
      <!-- 告警概览 -->
      <section class="alert-overview">
        <div class="stats-cards">
          <div class="stat-card" *ngFor="let stat of alertStats">
            <div class="stat-value" [class]="stat.trend">
              {{ stat.value }}
              <i class="trend-icon" [class]="getTrendIcon(stat.trend)"></i>
            </div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-change">
              {{ formatChange(stat.change) }}
              较上周期
            </div>
          </div>
        </div>
      </section>

      <!-- 活跃告警 -->
      <section class="active-alerts">
        <div class="section-header">
          <h2>活跃告警</h2>
          <div class="filters">
            <select [(ngModel)]="currentFilter" (change)="filterAlerts()">
              <option value="all">全部</option>
              <option value="critical">严重</option>
              <option value="high">高危</option>
              <option value="medium">中等</option>
              <option value="low">低危</option>
            </select>
          </div>
        </div>

        <div class="alerts-list">
          <div *ngFor="let alert of filteredAlerts" 
               class="alert-card"
               [class]="alert.severity">
            <div class="alert-header">
              <div class="severity-badge">{{ alert.severity }}</div>
              <div class="alert-time">{{ formatTime(alert.createdAt) }}</div>
            </div>
            
            <div class="alert-content">
              <h3>{{ alert.content.title }}</h3>
              <p>{{ alert.content.message }}</p>
              
              <div class="alert-meta">
                <span class="type">{{ alert.type }}</span>
                <span class="source">{{ alert.content.source }}</span>
              </div>

              <div class="impact-info" *ngIf="alert.impact">
                <div class="impact-item">
                  <span class="label">影响服务</span>
                  <span class="value">{{ alert.impact.services.join(', ') }}</span>
                </div>
                <div class="impact-item" *ngIf="alert.impact.users">
                  <span class="label">影响用户</span>
                  <span class="value">{{ alert.impact.users }}</span>
                </div>
              </div>
            </div>

            <div class="alert-actions">
              <button (click)="acknowledgeAlert(alert)"
                      *ngIf="alert.status === 'active'"
                      class="acknowledge">
                确认
              </button>
              <button (click)="resolveAlert(alert)"
                      *ngIf="alert.status === 'acknowledged'"
                      class="resolve">
                解决
              </button>
              <button (click)="showAlertDetails(alert)" class="details">
                详情
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 告警趋势 -->
      <section class="alert-trends">
        <div class="section-header">
          <h2>告警趋势</h2>
          <div class="period-selector">
            <button *ngFor="let period of periods"
                    [class.active]="currentPeriod === period.value"
                    (click)="setPeriod(period.value)">
              {{ period.label }}
            </button>
          </div>
        </div>

        <div class="trend-charts">
          <div class="chart-container">
            <h3>告警数量趋势</h3>
            <canvas #alertCountChart></canvas>
          </div>
          <div class="chart-container">
            <h3>平均恢复时间</h3>
            <canvas #mttrChart></canvas>
          </div>
        </div>
      </section>

      <!-- 告警分析 -->
      <section class="alert-analysis">
        <div class="analysis-cards">
          <div class="analysis-card top-issues">
            <h3>常见问题</h3>
            <div class="issues-list">
              <div *ngFor="let issue of topIssues" class="issue-item">
                <div class="issue-header">
                  <span class="issue-type">{{ issue.type }}</span>
                  <span class="issue-count">{{ issue.count }}次</span>
                </div>
                <div class="issue-title">{{ issue.title }}</div>
                <div class="issue-impact">
                  影响用户: {{ issue.impact }}
                </div>
              </div>
            </div>
          </div>

          <div class="analysis-card distribution">
            <h3>告警分布</h3>
            <div class="distribution-charts">
              <div class="chart-container">
                <h4>按严重程度</h4>
                <canvas #severityChart></canvas>
              </div>
              <div class="chart-container">
                <h4>按类型</h4>
                <canvas #typeChart></canvas>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./alert-dashboard.component.scss']
})
export class AlertDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private charts: Map<string, any> = new Map();

  alertStats = [
    { label: '活跃告警', value: 0, trend: 'up', change: 15 },
    { label: '本周告警', value: 0, trend: 'down', change: -8 },
    { label: '平均恢复时间', value: '2h 15m', trend: 'stable', change: 0 },
    { label: '自动恢复率', value: '68%', trend: 'up', change: 5 }
  ];

  periods = [
    { label: '24小时', value: '24h' },
    { label: '7天', value: '7d' },
    { label: '30天', value: '30d' }
  ];
  currentPeriod = '24h';
  currentFilter = 'all';

  activeAlerts: Alert[] = [];
  filteredAlerts: Alert[] = [];
  topIssues: any[] = [];

  constructor(private alertService: AlertService) {}

  async ngOnInit() {
    await this.loadDashboard();
    this.initializeCharts();
    this.subscribeToUpdates();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyCharts();
  }

  private async loadDashboard() {
    try {
      // 加载活跃告警
      this.activeAlerts = await this.alertService.getActiveAlerts();
      this.filterAlerts();

      // 加载统计数据
      const period = this.getPeriodDates();
      const stats = await this.alertService.getAlertStatistics(period);
      this.updateStats(stats);

      // 加载分析数据
      this.topIssues = stats.topIssues;
      this.updateCharts(stats);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    }
  }

  private initializeCharts() {
    // 实现图表初始化逻辑
  }

  private updateCharts(stats: any) {
    // 实现图表更新逻辑
  }

  private destroyCharts() {
    this.charts.forEach(chart => chart.destroy());
    this.charts.clear();
  }

  private subscribeToUpdates() {
    // 实现实时更新订阅逻辑
  }

  // UI交互方法
  async acknowledgeAlert(alert: Alert) {
    try {
      await this.alertService.updateAlertStatus(
        alert.id,
        'acknowledged',
        'current-user'
      );
      await this.loadDashboard();
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
    }
  }

  async resolveAlert(alert: Alert) {
    try {
      await this.alertService.updateAlertStatus(
        alert.id,
        'resolved',
        'current-user'
      );
      await this.loadDashboard();
    } catch (error) {
      console.error('Failed to resolve alert:', error);
    }
  }

  filterAlerts() {
    this.filteredAlerts = this.currentFilter === 'all'
      ? this.activeAlerts
      : this.activeAlerts.filter(alert => alert.severity === this.currentFilter);
  }

  async setPeriod(period: string) {
    this.currentPeriod = period;
    await this.loadDashboard();
  }

  // 辅助方法
  private getPeriodDates(): { start: Date; end: Date } {
    const end = new Date();
    const start = new Date();

    switch (this.currentPeriod) {
      case '24h':
        start.setHours(start.getHours() - 24);
        break;
      case '7d':
        start.setDate(start.getDate() - 7);
        break;
      case '30d':
        start.setDate(start.getDate() - 30);
        break;
    }

    return { start, end };
  }

  private updateStats(stats: any) {
    // 实现统计数据更新逻辑
  }

  formatTime(date: Date): string {
    return new Intl.RelativeTimeFormat('zh-CN', {
      numeric: 'auto'
    }).format(
      Math.round((date.getTime() - Date.now()) / (1000 * 60)),
      'minute'
    );
  }

  formatChange(change: number): string {
    return change > 0 ? `+${change}%` : `${change}%`;
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up': return 'arrow_upward';
      case 'down': return 'arrow_downward';
      default: return 'remove';
    }
  }
} 