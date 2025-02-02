import { Component } from '@angular/core';
import type { OnInit } from '@angular/core';
import { DesignSystemService } from '../design-system.service';
import { Theme } from '../types';

@Component({
  selector: 'app-theme-switcher',
  template: `
    <div class="theme-switcher">
      <select [value]="currentThemeId" (change)="onThemeChange($event)">
        <option *ngFor="let theme of themes" [value]="theme.id">
          {{ theme.name }}
        </option>
      </select>
      
      <button *ngIf="showCustomize" (click)="openCustomizer()">
        自定义主题
      </button>
    </div>
  `
})
export class ThemeSwitcherComponent implements OnInit {
  currentThemeId: string;
  themes: Theme[] = [];
  showCustomize = false;

  constructor(private designSystem: DesignSystemService) {}

  ngOnInit() {
    this.designSystem.getCurrentTheme().subscribe({
      next: (theme: Theme) => {
        this.currentThemeId = theme.id;
      },
      error: (error: any) => {
        console.error('Error getting current theme:', error);
      },
      complete: () => {}
    });
  }

  async onThemeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    await this.designSystem.setTheme(select.value);
  }

  openCustomizer() {
    // 实现打开主题自定义器的逻辑
  }
} 