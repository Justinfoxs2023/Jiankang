declare namespace TCM {
  interface AssessmentResult {
    id: string;
    userId: string;
    constitution: string;
    score: number;
    details: Record<string, any>;
    timestamp: Date;
  }

  interface SymptomRecord {
    id: string;
    symptom: string;
    severity: number;
    frequency: string;
    duration: string;
    notes?: string;
  }

  interface ConstitutionAssessment {
    type: string;
    score: number;
    symptoms: SymptomRecord[];
  }

  interface Recommendation {
    type: string;
    suggestions: string[];
    lifestyle: string[];
    diet: string[];
  }

  interface HealthSuggestion {
    category: string;
    items: string[];
    priority: number;
    seasonality?: string;
  }

  interface ConstitutionChangeReport {
    timeline: TimelineEvent[];
    changes: ConstitutionChange[];
    factors: InfluencingFactor[];
    recommendations: Recommendation[];
  }

  interface SeasonalPlan {
    dietary: DietaryPlan;
    lifestyle: LifestylePlan;
    exercises: ExercisePlan;
    preventions: PreventiveMeasures;
  }

  interface Constitution {
    type: string;
    features: string[];
    // ... 其他属性
  }

  interface TimelineEvent {
    id: string;
    date: Date;
    event: string;
    type: string;
  }

  interface ConstitutionChange {
    from: string;
    to: string;
    date: Date;
    reason: string;
  }

  interface InfluencingFactor {
    factor: string;
    impact: 'positive' | 'negative';
    weight: number;
  }

  interface DietaryPlan {
    recommendations: string[];
    restrictions: string[];
    seasonalFoods: string[];
  }

  interface LifestylePlan {
    dailyRoutine: string[];
    habits: string[];
    precautions: string[];
  }

  interface ExercisePlan {
    recommendations: string[];
    intensity: string;
    frequency: string;
    duration: string;
  }

  interface PreventiveMeasures {
    daily: string[];
    seasonal: string[];
    longTerm: string[];
  }
}

export = TCM; 