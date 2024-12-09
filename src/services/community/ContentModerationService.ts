import { Logger } from '@/utils/Logger';
import { ModerationError } from '@/utils/errors';
import { OpenAI } from 'openai';
import { SensitiveWordService } from './SensitiveWordService';
import { ImageModerationService } from './ImageModerationService';

export class ContentModerationService {
  private logger: Logger;
  private openai: OpenAI;
  private sensitiveWord: SensitiveWordService;
  private imageModeration: ImageModerationService;

  constructor() {
    this.logger = new Logger('ContentModeration');
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.sensitiveWord = new SensitiveWordService();
    this.imageModeration = new ImageModerationService();
  }

  /**
   * 内容审核
   */
  async moderateContent(content: {
    text?: string;
    images?: string[];
  }): Promise<ModerationResult> {
    try {
      const results = await Promise.all([
        content.text && this.moderateText(content.text),
        content.images && this.moderateImages(content.images)
      ]);

      const [textResult, imageResult] = results;

      // 合并审核结果
      return this.combineResults(textResult, imageResult);
    } catch (error) {
      this.logger.error('内容审核失败', error);
      throw new ModerationError('CONTENT_MODERATION_FAILED', error.message);
    }
  }

  /**
   * 文本审核
   */
  private async moderateText(text: string): Promise<TextModerationResult> {
    try {
      // 1. 敏感词检查
      const sensitiveWords = await this.sensitiveWord.check(text);

      // 2. AI内容分析
      const aiAnalysis = await this.openai.moderations.create({
        input: text
      });

      // 3. 规则检查
      const ruleViolations = await this.checkContentRules(text);

      return {
        isApproved: this.determineApproval(sensitiveWords, aiAnalysis, ruleViolations),
        sensitiveWords,
        aiAnalysis: aiAnalysis.results[0],
        ruleViolations,
        type: 'text'
      };
    } catch (error) {
      throw new ModerationError('TEXT_MODERATION_FAILED', error.message);
    }
  }

  /**
   * 图片审核
   */
  private async moderateImages(images: string[]): Promise<ImageModerationResult> {
    try {
      const results = await Promise.all(
        images.map(image => this.imageModeration.analyze(image))
      );

      return {
        isApproved: results.every(r => r.isApproved),
        results,
        type: 'image'
      };
    } catch (error) {
      throw new ModerationError('IMAGE_MODERATION_FAILED', error.message);
    }
  }

  /**
   * 实时审核
   */
  async moderateInRealTime(
    content: string,
    callback: (result: ModerationResult) => void
  ): Promise<void> {
    try {
      // 1. 快速检查
      const quickResult = await this.quickCheck(content);
      callback(quickResult);

      // 2. 详细审核
      const detailedResult = await this.moderateContent({ text: content });
      callback(detailedResult);

      // 3. AI深度分析
      const aiResult = await this.deepAnalysis(content);
      callback(aiResult);
    } catch (error) {
      this.logger.error('实时审核失败', error);
      throw new ModerationError('REALTIME_MODERATION_FAILED', error.message);
    }
  }

  /**
   * 批量审核
   */
  async moderateBatch(contents: string[]): Promise<BatchModerationResult> {
    try {
      const results = await Promise.all(
        contents.map(content => this.moderateContent({ text: content }))
      );

      return {
        isAllApproved: results.every(r => r.isApproved),
        results,
        summary: this.generateBatchSummary(results)
      };
    } catch (error) {
      this.logger.error('批量审核失败', error);
      throw new ModerationError('BATCH_MODERATION_FAILED', error.message);
    }
  }

  private async checkContentRules(text: string): Promise<RuleViolation[]> {
    // 实现内容规则检查逻辑
    return [];
  }

  private determineApproval(
    sensitiveWords: string[],
    aiAnalysis: any,
    ruleViolations: RuleViolation[]
  ): boolean {
    return (
      sensitiveWords.length === 0 &&
      !aiAnalysis.flagged &&
      ruleViolations.length === 0
    );
  }

  private async quickCheck(content: string): Promise<ModerationResult> {
    // 实现快速检查逻辑
    return null;
  }

  private async deepAnalysis(content: string): Promise<ModerationResult> {
    // 实现AI深度分析逻辑
    return null;
  }

  private generateBatchSummary(results: ModerationResult[]): BatchSummary {
    // 实现批量审核总结逻辑
    return null;
  }
}

interface ModerationResult {
  isApproved: boolean;
  type: 'text' | 'image';
  details?: any;
}

interface TextModerationResult extends ModerationResult {
  sensitiveWords: string[];
  aiAnalysis: any;
  ruleViolations: RuleViolation[];
}

interface ImageModerationResult extends ModerationResult {
  results: any[];
}

interface RuleViolation {
  rule: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

interface BatchModerationResult {
  isAllApproved: boolean;
  results: ModerationResult[];
  summary: BatchSummary;
}

interface BatchSummary {
  totalCount: number;
  approvedCount: number;
  rejectedCount: number;
  violationTypes: {
    [key: string]: number;
  };
} 