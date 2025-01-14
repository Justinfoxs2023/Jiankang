export const TYPES = {
  // 基础设施
  Logger: Symbol.for('Logger'),
  Metrics: Symbol.for('Metrics'),
  AlertService: Symbol.for('AlertService'),
  Redis: Symbol.for('Redis'),

  // 业务服务
  SystemSettingsService: Symbol.for('SystemSettingsService'),
  AuditService: Symbol.for('AuditService'),
  ExerciseService: Symbol.for('ExerciseService'),
  NutritionService: Symbol.for('NutritionService'),
  PaymentService: Symbol.for('PaymentService')
}; 