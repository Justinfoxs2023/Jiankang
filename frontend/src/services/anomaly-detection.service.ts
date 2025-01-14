import * as tf from '@tensorflow/tfjs';
import { LocalDatabase } from '../utils/local-database';
import { RiskAssessmentService } from './risk-assessment.service';

interface AnomalyConfig {
  thresholds: Record<string, number>;
  windowSize: number;
  sensitivityLevel: number;
  detectionMethods: DetectionMethod[];
}

interface DetectionMethod {
  type: 'statistical' | 'ml' | 'rule-based';
  config: any;
  weight: number;
}

interface AnomalyResult {
  isAnomaly: boolean;
  score: number;
  type: string;
  confidence: number;
  details: any;
  timestamp: Date;
}

export class AnomalyDetectionService {
  private db: LocalDatabase;
  private riskService: RiskAssessmentService;
  private model: tf.LayersModel | null = null;
  private config: AnomalyConfig;

  constructor() {
    this.db = new LocalDatabase('anomaly-detection');
    this.riskService = new RiskAssessmentService();
    this.config = {
      thresholds: {
        behavior: 0.8,
        risk: 0.7,
        pattern: 0.85
      },
      windowSize: 100,
      sensitivityLevel: 0.9,
      detectionMethods: [
        {
          type: 'statistical',
          config: { zscore: 2.5 },
          weight: 0.3
        },
        {
          type: 'ml',
          config: { threshold: 0.9 },
          weight: 0.4
        },
        {
          type: 'rule-based',
          config: { rules: [] },
          weight: 0.3
        }
      ]
    };
    this.initialize();
  }

  private async initialize() {
    await this.loadModel();
  }

  private async loadModel() {
    try {
      this.model = await tf.loadLayersModel('/models/anomaly/model.json');
    } catch (error) {
      console.error('加载异常检测模型失败:', error);
    }
  }

  // 检测异常
  async detectAnomalies(
    userId: string,
    data: any
  ): Promise<AnomalyResult[]> {
    try {
      const anomalies: AnomalyResult[] = [];

      // 统计方法检测
      const statisticalAnomalies = await this.detectStatisticalAnomalies(data);
      anomalies.push(...statisticalAnomalies);

      // 机器学习方法检测
      const mlAnomalies = await this.detectMLAnomalies(data);
      anomalies.push(...mlAnomalies);

      // 规则方法检测
      const ruleAnomalies = await this.detectRuleBasedAnomalies(data);
      anomalies.push(...ruleAnomalies);

      // 融合结果
      const fusedResults = await this.fuseAnomalyResults(anomalies);
      
      // 保存结果
      await this.saveAnomalyResults(userId, fusedResults);

      return fusedResults;
    } catch (error) {
      console.error('异常检测失败:', error);
      throw error;
    }
  }

  // 统计方法检测
  private async detectStatisticalAnomalies(data: any): Promise<AnomalyResult[]> {
    const anomalies: AnomalyResult[] = [];
    const method = this.config.detectionMethods
      .find(m => m.type === 'statistical');

    if (!method) return anomalies;

    // Z-score 检测
    const zscore = this.calculateZScore(data);
    if (Math.abs(zscore) > method.config.zscore) {
      anomalies.push({
        isAnomaly: true,
        score: Math.abs(zscore),
        type: 'statistical',
        confidence: this.calculateConfidence(zscore, method.config.zscore),
        details: { zscore },
        timestamp: new Date()
      });
    }

    return anomalies;
  }

  // 机器学习方法检测
  private async detectMLAnomalies(data: any): Promise<AnomalyResult[]> {
    if (!this.model) return [];

    const method = this.config.detectionMethods
      .find(m => m.type === 'ml');

    if (!method) return [];

    try {
      const tensor = tf.tensor(data).expandDims(0);
      const prediction = await this.model.predict(tensor) as tf.Tensor;
      const score = (await prediction.data())[0];

      if (score > method.config.threshold) {
        return [{
          isAnomaly: true,
          score,
          type: 'ml',
          confidence: score,
          details: { modelPrediction: score },
          timestamp: new Date()
        }];
      }
    } catch (error) {
      console.error('ML异常检测失败:', error);
    }

    return [];
  }

  // 规则方法检测
  private async detectRuleBasedAnomalies(data: any): Promise<AnomalyResult[]> {
    const anomalies: AnomalyResult[] = [];
    const method = this.config.detectionMethods
      .find(m => m.type === 'rule-based');

    if (!method) return anomalies;

    for (const rule of method.config.rules) {
      const ruleResult = await this.evaluateRule(rule, data);
      if (ruleResult.isAnomaly) {
        anomalies.push(ruleResult);
      }
    }

    return anomalies;
  }

  // 融合检测结果
  private async fuseAnomalyResults(results: AnomalyResult[]): Promise<AnomalyResult[]> {
    const fusedResults: AnomalyResult[] = [];
    const groupedResults = this.groupResultsByTimestamp(results);

    for (const [timestamp, group] of groupedResults) {
      const weightedScore = this.calculateWeightedScore(group);
      
      if (weightedScore > this.config.sensitivityLevel) {
        fusedResults.push({
          isAnomaly: true,
          score: weightedScore,
          type: 'fused',
          confidence: this.calculateFusedConfidence(group),
          details: {
            originalResults: group,
            weightedScore
          },
          timestamp: new Date(timestamp)
        });
      }
    }

    return fusedResults;
  }

  // 计算Z分数
  private calculateZScore(value: number): number {
    // 实现Z分数计算
    return 0;
  }

  // 计算置信度
  private calculateConfidence(value: number, threshold: number): number {
    return Math.min(1, Math.abs(value) / threshold);
  }

  // 评估规则
  private async evaluateRule(rule: any, data: any): Promise<AnomalyResult> {
    // 实现规则评估
    return {
      isAnomaly: false,
      score: 0,
      type: 'rule',
      confidence: 0,
      details: {},
      timestamp: new Date()
    };
  }

  // 按时间戳分组
  private groupResultsByTimestamp(
    results: AnomalyResult[]
  ): Map<number, AnomalyResult[]> {
    const groups = new Map<number, AnomalyResult[]>();
    
    for (const result of results) {
      const timestamp = result.timestamp.getTime();
      const group = groups.get(timestamp) || [];
      group.push(result);
      groups.set(timestamp, group);
    }

    return groups;
  }

  // 计算加权分数
  private calculateWeightedScore(results: AnomalyResult[]): number {
    return results.reduce((score, result) => {
      const method = this.config.detectionMethods
        .find(m => m.type === result.type);
      return score + (result.score * (method?.weight || 1));
    }, 0) / results.length;
  }

  // 计算融合置信度
  private calculateFusedConfidence(results: AnomalyResult[]): number {
    return results.reduce((conf, result) => conf + result.confidence, 0) / results.length;
  }

  // 保存异常结果
  private async saveAnomalyResults(
    userId: string,
    results: AnomalyResult[]
  ): Promise<void> {
    const storedResults = await this.db.get(`anomalies-${userId}`) || [];
    storedResults.push(...results);
    await this.db.put(`anomalies-${userId}`, storedResults);
  }

  // 获取历史异常
  async getHistoricalAnomalies(
    userId: string,
    options: {
      startDate?: Date;
      endDate?: Date;
      types?: string[];
    } = {}
  ): Promise<AnomalyResult[]> {
    const results = await this.db.get(`anomalies-${userId}`) || [];
    
    return results.filter(result => {
      if (options.startDate && result.timestamp < options.startDate) {
        return false;
      }
      if (options.endDate && result.timestamp > options.endDate) {
        return false;
      }
      if (options.types && !options.types.includes(result.type)) {
        return false;
      }
      return true;
    });
  }

  // 更新配置
  async updateConfig(config: Partial<AnomalyConfig>): Promise<void> {
    this.config = {
      ...this.config,
      ...config
    };
    await this.db.put('anomaly-config', this.config);
  }
} 