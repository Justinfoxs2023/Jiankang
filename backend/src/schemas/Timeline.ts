import { Schema, model, Document } from 'mongoose';

export interface ITimeline extends Document {
  userId: Schema.Types.ObjectId;  // 用户ID
  activityType: string;  // 活动类型：post/comment/like/follow等
  contentType: string;  // 内容类型
  contentId: Schema.Types.ObjectId;  // 内容ID
  metadata: Record<string, any>;  // 额外元数据
  visibility: 'public' | 'followers' | 'private';  // 可见性
  createdAt: Date;
  updatedAt: Date;
  isHighlight: boolean;  // 是否为重要动态
}

const TimelineSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityType: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  contentId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'contentType'
  },
  metadata: {
    type: Map,
    of: Schema.Types.Mixed
  },
  visibility: {
    type: String,
    enum: ['public', 'followers', 'private'],
    default: 'public'
  },
  isHighlight: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  indexes: [
    { userId: 1, createdAt: -1 },
    { activityType: 1 },
    { contentType: 1, contentId: 1 },
    { visibility: 1 },
    { isHighlight: 1 }
  ]
});

// 添加虚拟字段用于关联具体内容
TimelineSchema.virtual('content', {
  refPath: 'contentType',
  localField: 'contentId',
  foreignField: '_id',
  justOne: true
});

export const Timeline = model<ITimeline>('Timeline', TimelineSchema); 