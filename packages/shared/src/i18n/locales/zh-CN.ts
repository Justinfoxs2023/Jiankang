export default {
  nutrition: {
    noData: '暂无营养数据',
    totalCalories: '总热量',
    distribution: '营养素分布',
    distributionTitle: '营养素分布分析',
    score: '健康评分',
    scoreTitle: '营养健康评分',
    remaining: '剩余',
    recommendations: '营养建议',
    details: '详细营养数据',
    percentage: '占比',
    status: {
      low: '偏低',
      normal: '正常',
      high: '偏高'
    },
    units: {
      kcal: '千卡',
      g: '克',
      mg: '毫克',
      μg: '微克'
    },
    nutrients: {
      calorie: '热量',
      protein: '蛋白质',
      fat: '脂肪',
      carbohydrate: '碳水化合物',
      fiber: '膳食纤维',
      vitamin_a: '维生素A',
      vitamin_b: '维生素B',
      vitamin_c: '维生素C',
      vitamin_d: '维生素D',
      vitamin_e: '维生素E',
      calcium: '钙',
      iron: '铁',
      zinc: '锌',
      sodium: '钠'
    }
  },
  dietPlan: {
    preferences: '计划设置',
    goal: '目标',
    goals: {
      weight_loss: '减重',
      weight_gain: '增重',
      maintenance: '维持体��',
      muscle_gain: '增肌',
      health: '健康饮食'
    },
    activityLevel: '活动水平',
    activity: {
      low: '低强度',
      moderate: '中等强度',
      high: '高强度'
    },
    currentWeight: '当前体重',
    targetWeight: '目标体重',
    weightPlaceholder: '请输入体重(kg)',
    restrictions: '饮食限制',
    restrictions: {
      dairy: '乳制品',
      gluten: '麸质',
      nuts: '坚果',
      seafood: '海鲜',
      eggs: '鸡蛋'
    },
    generate: '生成饮食计划',
    dailyCalories: '每日热量',
    meals: '餐次',
    nutrientTargets: '营养目标',
    mealSchedule: '餐次安排',
    mealTypes: {
      breakfast: '早餐',
      lunch: '午餐',
      dinner: '晚餐',
      snack: '加餐'
    },
    recommendations: '推荐食物',
    error: {
      generation: '生成计划失败',
      invalidWeight: '请输入有效的体重',
      invalidGoal: '请选择有效的目标'
    }
  },
  food: {
    recognition: {
      title: '食物识别',
      upload: '上传图片',
      processing: '正在识别...',
      success: '识别成功',
      error: '识别失败',
      retry: '重试',
      tips: '拍摄或上传食物图片，AI将自动识别食物类型和营养成分'
    },
    types: {
      grain: '谷物',
      meat: '肉类',
      vegetable: '蔬菜',
      fruit: '水果',
      dairy: '乳制品',
      seafood: '海鲜',
      nuts: '坚果',
      beverage: '饮品',
      snack: '零食',
      other: '其他'
    },
    info: {
      name: '食物名称',
      type: '食物类型',
      confidence: '识别置信度',
      nutrients: '营养成分',
      recommendedIntake: '推荐摄入量',
      description: '食物描述'
    }
  },
  exercise: {
    types: {
      walking: '步行',
      running: '跑步',
      cycling: '骑行',
      swimming: '游泳',
      yoga: '瑜伽',
      strength: '力量训练',
      hiit: '高强度间歇训练',
      stretching: '拉伸',
      dance: '舞蹈',
      other: '其他'
    },
    intensity: {
      low: '低强度',
      moderate: '中等强度',
      high: '高强度'
    },
    metrics: {
      duration: '运动时长',
      caloriesBurned: '卡路里消耗',
      steps: '步数',
      distance: '距离',
      speed: '速度',
      pace: '配速',
      heartRate: '心率'
    },
    heartRate: {
      average: '平均心率',
      max: '最大心率',
      min: '最小心率',
      zones: {
        title: '心率区间',
        easy: '轻松区间',
        fatBurn: '燃脂区间',
        cardio: '有氧区间',
        peak: '峰���区间'
      }
    },
    speed: {
      average: '平均速度',
      max: '最大速度',
      min: '最小速度'
    },
    pace: {
      average: '平均配速',
      best: '最佳配速'
    },
    tracking: {
      start: '开始运动',
      stop: '结束运动',
      pause: '暂停',
      resume: '继续',
      lap: '计圈',
      reset: '重置'
    },
    analysis: {
      title: '运动分析',
      totalDuration: '总运动时长',
      totalCalories: '总卡路里消耗',
      intensityDistribution: '强度分布',
      heartRateAnalysis: '心率分析',
      performanceScore: '运动表现评分',
      recommendations: '改进建议'
    },
    strengthTraining: {
      muscleGroup: '训练部位',
      exercise: '动作名称',
      sets: '组数',
      reps: '重复次数',
      weight: '重量',
      addSet: '添加组数',
      addExercise: '添加动作'
    },
    units: {
      minutes: '分钟',
      hours: '小时',
      kilometers: '公里',
      meters: '米',
      steps: '步',
      kcal: '千卡',
      bpm: '次/分钟',
      kmh: '公里/小时',
      minKm: '分钟/公里',
      kg: '千克'
    },
    status: {
      notStarted: '未开始',
      inProgress: '进行中',
      paused: '已暂停',
      completed: '已完成'
    },
    errors: {
      deviceNotFound: '未找到运动设备',
      connectionFailed: '设备连接失败',
      dataCollectionFailed: '数据采集失败',
      syncFailed: '数据同步失败'
    },
    tips: {
      beforeExercise: '运动前请做好充分准备和热身',
      duringExercise: '注意保持正确的运动姿势',
      afterExercise: '运动后请做好放松和拉伸'
    },
    achievements: {
      newRecord: '新纪录',
      goalReached: '目标达成',
      streak: '连续运动',
      milestone: '里程碑'
    }
  },
  posture: {
    startAnalysis: '开始分析',
    stopAnalysis: '停止分析',
    followInstructions: '请按照标准动作进行练习',
    score: '姿态评分',
    issues: '存在问题',
    suggestions: '改进建议',
    deviations: '动作偏差',
    deviation: '偏差',
    keyPoints: {
      nose: '鼻子',
      leftEye: '左眼',
      rightEye: '右眼',
      leftEar: '左耳',
      rightEar: '右耳',
      leftShoulder: '左肩',
      rightShoulder: '右肩',
      leftElbow: '左肘',
      rightElbow: '右肘',
      leftWrist: '左腕',
      rightWrist: '右腕',
      leftHip: '左髋',
      rightHip: '右髋',
      leftKnee: '左膝',
      rightKnee: '右膝',
      leftAnkle: '左踝',
      rightAnkle: '右踝'
    },
    angles: {
      leftElbow: '左肘角度',
      rightElbow: '右肘角度',
      leftKnee: '左膝角度',
      rightKnee: '右膝角度',
      leftHip: '左髋角度',
      rightHip: '右髋角度'
    },
    status: {
      ready: '准备就绪',
      analyzing: '分析中...',
      completed: '分析完成'
    },
    errors: {
      cameraNotFound: '未找到摄像头',
      cameraPermissionDenied: '摄像头权限被拒绝',
      analysisFailed: '姿态分析失败'
    },
    tips: {
      camera: '请确保摄像头可以完整拍摄到全身',
      lighting: '请确保光线充足',
      position: '请保持在摄像头视野范围内',
      movement: '请按照标准动作缓慢进行'
    },
    standardPose: {
      title: '标准姿态',
      description: '请参考标准动作视频进行练习',
      viewVideo: '查看示范视频'
    },
    analysis: {
      title: '姿态分析',
      realtime: '实时分析',
      snapshot: '拍照分析',
      video: '视频分析',
      compare: '对比分析'
    },
    feedback: {
      excellent: '动作标准，继续保持',
      good: '动作基本正确，需要微调',
      needsImprovement: '动作有待改进',
      incorrect: '动作不标准，请调整'
    },
    metrics: {
      symmetry: '动作对称性',
      stability: '身体稳定性',
      range: '运动幅度',
      rhythm: '动作节奏',
      coordination: '身体协调性'
    }
  }
}; 