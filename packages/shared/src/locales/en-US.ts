import { LocaleMessages } from '../services/i18n';

const messages: LocaleMessages = {
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    save: 'Save',
    loading: 'Loading...',
    success: 'Operation successful',
    error: 'Error occurred',
    warning: 'Warning',
    info: 'Info',
    required: 'Required',
    optional: 'Optional',
    more: 'More',
    less: 'Less',
    search: 'Search',
    filter: 'Filter',
    refresh: 'Refresh',
    noData: 'No data',
    total: 'Total {total} items',
    selected: '{count} items selected',
    all: 'All'
  },
  validation: {
    required: '{field} is required',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    min: '{field} cannot be less than {min}',
    max: '{field} cannot be greater than {max}',
    length: '{field} must be {length} characters',
    minLength: '{field} must be at least {min} characters',
    maxLength: '{field} cannot exceed {max} characters',
    pattern: '{field} format is incorrect',
    passwordMismatch: 'The passwords do not match'
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    forgotPassword: 'Forgot Password',
    resetPassword: 'Reset Password',
    username: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    email: 'Email',
    phone: 'Phone',
    verificationCode: 'Verification Code',
    sendCode: 'Send Code',
    rememberMe: 'Remember Me',
    loginSuccess: 'Login successful',
    loginError: 'Login failed',
    logoutSuccess: 'Logout successful',
    registerSuccess: 'Registration successful',
    registerError: 'Registration failed',
    resetSuccess: 'Reset successful',
    resetError: 'Reset failed'
  },
  healthData: {
    bloodPressure: 'Blood Pressure',
    heartRate: 'Heart Rate',
    bloodSugar: 'Blood Sugar',
    temperature: 'Temperature',
    weight: 'Weight',
    height: 'Height',
    bmi: 'BMI',
    systolic: 'Systolic',
    diastolic: 'Diastolic',
    fasting: 'Fasting',
    afterMeal: 'After Meal',
    unit: {
      mmHg: 'mmHg',
      bpm: 'bpm',
      mmol: 'mmol/L',
      celsius: '°C',
      kg: 'kg',
      cm: 'cm'
    },
    status: {
      normal: 'Normal',
      abnormal: 'Abnormal',
      high: 'High',
      low: 'Low'
    },
    time: {
      morning: 'Morning',
      noon: 'Noon',
      evening: 'Evening',
      beforeMeal: 'Before Meal',
      afterMeal: 'After Meal',
      beforeSleep: 'Before Sleep'
    }
  },
  analysis: {
    trend: 'Trend Analysis',
    statistics: 'Statistical Analysis',
    comparison: 'Comparative Analysis',
    report: 'Analysis Report',
    period: {
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year',
      custom: 'Custom'
    },
    metrics: {
      max: 'Maximum',
      min: 'Minimum',
      avg: 'Average',
      count: 'Measurement Count',
      abnormal: 'Abnormal Count'
    },
    error: 'Error analyzing data',
    noData: 'No data available for analysis',
    riskAssessment: 'Health Risk Assessment',
    riskLevel: {
      low: 'Low Risk',
      medium: 'Medium Risk',
      high: 'High Risk'
    },
    riskFactors: 'Risk Factors',
    trendAnalysis: 'Health Trend Analysis',
    trendType: {
      improving: 'Improving',
      stable: 'Stable',
      worsening: 'Worsening'
    },
    changeRate: 'Change Rate',
    confidence: 'Confidence',
    actualValue: 'Actual Value',
    predictedValue: 'Predicted Value',
    healthAdvice: 'Health Advice',
    seasonality: 'Seasonality Pattern',
    pattern: {
      daily: 'Daily Cycle',
      weekly: 'Weekly Cycle',
      monthly: 'Monthly Cycle'
    },
    outliers: 'Outliers',
    deviation: 'Deviation',
    chart: {
      trend: 'Trend Chart',
      scatter: 'Scatter Plot',
      distribution: 'Distribution Chart',
      radar: 'Radar Chart'
    },
    distribution: 'Value Distribution',
    dimensionScore: 'Dimension Score'
  },
  settings: {
    title: 'Settings',
    general: 'General Settings',
    account: 'Account Settings',
    notification: 'Notification Settings',
    privacy: 'Privacy Settings',
    theme: {
      title: 'Theme Settings',
      light: 'Light',
      dark: 'Dark',
      system: 'System'
    },
    language: {
      title: 'Language Settings',
      zhCN: '简体中文',
      enUS: 'English'
    },
    notification: {
      title: 'Notification Settings',
      push: 'Push Notifications',
      email: 'Email Notifications',
      sms: 'SMS Notifications'
    },
    privacy: {
      title: 'Privacy Settings',
      dataSharing: 'Data Sharing',
      analytics: 'Analytics',
      advertising: 'Personalized Ads'
    }
  },
  errorBoundary: {
    title: 'Page Error',
    message: 'Sorry, something went wrong',
    reload: 'Reload Page'
  },
  logViewer: {
    title: 'Log Viewer',
    loading: 'Loading logs...',
    error: 'Failed to load logs',
    filter: {
      level: 'Log Level',
      search: 'Search Logs',
      timeRange: 'Time Range'
    },
    level: {
      debug: 'Debug',
      info: 'Info',
      warn: 'Warning',
      error: 'Error'
    },
    columns: {
      time: 'Time',
      level: 'Level',
      message: 'Message',
      source: 'Source',
      details: 'Details'
    }
  },
  modal: {
    confirm: {
      title: 'Confirm',
      delete: 'Are you sure you want to delete?',
      cancel: 'Are you sure you want to cancel?',
      logout: 'Are you sure you want to log out?'
    }
  },
  form: {
    required: 'Required',
    optional: 'Optional',
    submit: 'Submit',
    reset: 'Reset'
  },
  table: {
    loading: 'Loading...',
    noData: 'No data',
    operation: 'Operation',
    total: 'Total {total} items'
  },
  advice: {
    title: 'Personalized Health Advice',
    error: 'Error getting health advice',
    noData: 'No data available for advice',
    priority: 'Priority',
    comprehensive: 'Comprehensive Advice',
    comprehensiveTitle: 'Lifestyle Improvement Suggestions',
    lifestyle: 'Maintain regular daily routines',
    exercise: 'Perform moderate aerobic exercise weekly',
    diet: 'Maintain balanced diet, control salt intake',
    sleep: 'Ensure adequate sleep',
    stress: 'Learn to manage stress, maintain positive mood',
    category: {
      immediate: 'Immediate Action',
      short_term: 'Short-term Improvement',
      long_term: 'Long-term Maintenance'
    },
    confidence: 'Advice Confidence',
    impact: 'Impact Level',
    impact: {
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    }
  },
  healthData: {
    type: {
      BLOOD_PRESSURE: 'Blood Pressure',
      HEART_RATE: 'Heart Rate',
      BLOOD_SUGAR: 'Blood Sugar',
      BODY_TEMPERATURE: 'Body Temperature',
      WEIGHT: 'Weight',
      HEIGHT: 'Height',
      STEPS: 'Steps',
      SLEEP: 'Sleep',
      OXYGEN: 'Blood Oxygen'
    }
  },
  validation: {
    required: 'This field is required',
    invalid: 'Invalid input',
    minLength: 'Minimum {min} characters required',
    maxLength: 'Maximum {max} characters allowed',
    min: 'Cannot be less than {min}',
    max: 'Cannot be greater than {max}'
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    forgotPassword: 'Forgot Password',
    username: 'Username',
    password: 'Password',
    email: 'Email',
    rememberMe: 'Remember Me',
    loginSuccess: 'Login successful',
    loginError: 'Login failed',
    logoutSuccess: 'Logout successful',
    registerSuccess: 'Registration successful',
    registerError: 'Registration failed'
  },
  settings: {
    title: 'Settings',
    theme: {
      title: 'Theme Settings',
      light: 'Light',
      dark: 'Dark',
      system: 'System'
    },
    language: {
      title: 'Language Settings',
      zh: 'Chinese',
      en: 'English'
    },
    notification: {
      title: 'Notification Settings',
      enable: 'Enable Notifications',
      sound: 'Sound Alerts',
      vibrate: 'Vibration Alerts'
    },
    privacy: {
      title: 'Privacy Settings',
      dataSharing: 'Data Sharing',
      analytics: 'Usage Analytics'
    }
  },
  error: {
    network: 'Network error',
    server: 'Server error',
    unauthorized: 'Unauthorized access',
    forbidden: 'Access forbidden',
    notFound: 'Resource not found',
    timeout: 'Request timeout',
    unknown: 'Unknown error'
  }
}; 