// 主题类型定义
export interface Theme {
  id: string;
  name: string;
  type: 'light' | 'dark' | 'custom';
  
  // 颜色系统
  colors: {
    // 主要颜色
    primary: {
      main: string;
      light: string;
      dark: string;
      contrast: string;
    };
    // 次要颜色
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrast: string;
    };
    // 背景色
    background: {
      default: string;
      paper: string;
      elevated: string;
    };
    // 文本颜色
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      hint: string;
    };
    // 状态颜色
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
    // 边框颜色
    border: {
      default: string;
      light: string;
      focus: string;
    };
  };

  // 排版系统
  typography: {
    // 字体家族
    fontFamily: {
      base: string;
      heading: string;
      code: string;
    };
    // 字体大小
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      heading: {
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
      };
    };
    // 字重
    fontWeight: {
      light: number;
      regular: number;
      medium: number;
      bold: number;
    };
    // 行高
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
      loose: number;
    };
    // 字间距
    letterSpacing: {
      tight: string;
      normal: string;
      wide: string;
    };
  };

  // 间距系统
  spacing: {
    unit: number;
    values: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    layout: {
      gutter: string;
      margin: string;
      padding: string;
    };
  };

  // 圆角系统
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };

  // 阴影系统
  shadows: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    outline: string;
  };

  // 过渡动画
  transitions: {
    duration: {
      shortest: number;
      short: number;
      standard: number;
      long: number;
    };
    easing: {
      easeIn: string;
      easeOut: string;
      easeInOut: string;
      sharp: string;
    };
  };

  // 断点系统
  breakpoints: {
    values: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    unit: 'px' | 'em' | 'rem';
  };

  // 无障碍配置
  accessibility: {
    focusRing: {
      width: string;
      color: string;
      offset: string;
    };
    contrast: {
      enhanced: boolean;
      ratio: number;
    };
    reducedMotion: boolean;
    keyboardFocus: boolean;
  };
}

// 无障碍配置类型
export interface AccessibilityConfig {
  // 视觉设置
  visual: {
    // 高对比度
    highContrast: boolean;
    contrastLevel: number;
    
    // 字体设置
    fontSize: number;
    fontScaling: boolean;
    lineSpacing: number;
    
    // 颜色设置
    colorBlindnessMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
    customColors: Record<string, string>;
    
    // 动效设置
    reducedMotion: boolean;
    animationSpeed: number;
    
    // 焦点设置
    focusIndicators: boolean;
    focusHighlightColor: string;
  };

  // 键盘导航
  keyboard: {
    enabled: boolean;
    shortcuts: Record<string, string>;
    tabNavigation: {
      enabled: boolean;
      indicators: boolean;
      order: 'dom' | 'custom';
    };
    focusTrap: {
      enabled: boolean;
      allowOutsideClick: boolean;
    };
  };

  // 屏幕阅读器
  screenReader: {
    enabled: boolean;
    verbosity: 'low' | 'medium' | 'high';
    announcements: {
      navigation: boolean;
      interactions: boolean;
      updates: boolean;
    };
    descriptions: {
      images: boolean;
      controls: boolean;
      headings: boolean;
    };
    language: {
      primary: string;
      fallback: string;
    };
  };

  // 语音控制
  voice: {
    enabled: boolean;
    commands: {
      navigation: boolean;
      interaction: boolean;
      dictation: boolean;
    };
    feedback: {
      audio: boolean;
      visual: boolean;
      haptic: boolean;
    };
    recognition: {
      language: string;
      continuous: boolean;
      interimResults: boolean;
    };
  };

  // 触摸和手势
  touch: {
    enabled: boolean;
    targetSize: number;
    spacing: number;
    feedback: {
      haptic: boolean;
      visual: boolean;
      audio: boolean;
    };
    gestures: {
      swipe: boolean;
      pinch: boolean;
      doubleTap: boolean;
      longPress: boolean;
    };
  };

  // 内容适配
  content: {
    simplifiedView: boolean;
    readingGuide: boolean;
    textToSpeech: boolean;
    mediaAlternatives: {
      captions: boolean;
      transcripts: boolean;
      audioDescriptions: boolean;
    };
  };

  // 用户偏好
  preferences: {
    saveSettings: boolean;
    autoEnable: boolean;
    quickAccess: string[];
    customizations: Record<string, any>;
  };
}

// 组件变体类型
export interface ComponentVariant {
  name: string;
  styles: Partial<{
    colors: Partial<Theme['colors']>;
    typography: Partial<Theme['typography']>;
    spacing: Partial<Theme['spacing']>;
    borderRadius: Partial<Theme['borderRadius']>;
    shadows: Partial<Theme['shadows']>;
  }>;
}

// 主题变更事件类型
export interface ThemeChangeEvent {
  previousTheme: Theme;
  newTheme: Theme;
  timestamp: Date;
  source: 'user' | 'system' | 'auto';
}

// 无障碍配置变更事件类型
export interface AccessibilityChangeEvent {
  previousConfig: Partial<AccessibilityConfig>;
  newConfig: Partial<AccessibilityConfig>;
  timestamp: Date;
  source: 'user' | 'system' | 'auto';
} 