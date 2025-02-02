import { BiometricVerificationService } from './biometric-verification.service';
import { BehaviorAnalysisService } from './behavior-analysis.service';
import { CryptoService } from './crypto.service';
import { LocalDatabase } from '../utils/local-database';

interface MFAConfig {
  requiredFactors: AuthFactor[];
  securityLevel: 'standard' | 'high' | 'extreme';
  timeoutSeconds: number;
  maxAttempts: number;
}

interface AuthFactor {
  type: 'biometric' | 'behavior' | 'knowledge' | 'possession';
  weight: number;
  required: boolean;
  timeout?: number;
}

interface AuthSession {
  id: string;
  userId: string;
  startTime: Date;
  completedFactors: string[];
  status: 'pending' | 'completed' | 'failed' | 'timeout';
  attempts: number;
}

export class MultiFactorAuthService {
  private db: LocalDatabase;
  private biometricService: BiometricVerificationService;
  private behaviorService: BehaviorAnalysisService;
  private crypto: CryptoService;
  private sessions: Map<string, AuthSession> = new Map();

  constructor() {
    this.db = new LocalDatabase('multi-factor-auth');
    this.biometricService = new BiometricVerificationService();
    this.behaviorService = new BehaviorAnalysisService();
    this.crypto = new CryptoService();
  }

  // 初始化认证会话
  async initializeAuth(userId: string, config?: Partial<MFAConfig>): Promise<string> {
    const defaultConfig: MFAConfig = {
      requiredFactors: [
        { type: 'biometric', weight: 0.4, required: true },
        { type: 'behavior', weight: 0.3, required: true },
        { type: 'knowledge', weight: 0.2, required: true },
        { type: 'possession', weight: 0.1, required: false }
      ],
      securityLevel: 'standard',
      timeoutSeconds: 300,
      maxAttempts: 3
    };

    const sessionConfig = { ...defaultConfig, ...config };
    const sessionId = `mfa_${Date.now()}_${Math.random()}`;

    const session: AuthSession = {
      id: sessionId,
      userId,
      startTime: new Date(),
      completedFactors: [],
      status: 'pending',
      attempts: 0
    };

    this.sessions.set(sessionId, session);
    await this.saveSession(session);

    return sessionId;
  }

  // 验证认证因素
  async verifyFactor(
    sessionId: string,
    factorType: string,
    data: any
  ): Promise<{
    success: boolean;
    remainingFactors: string[];
    sessionStatus: string;
  }> {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('认证会话不存在');

    if (session.status !== 'pending') {
      throw new Error(`认证会话状态无效: ${session.status}`);
    }

    try {
      const verified = await this.verifyFactorData(factorType, session.userId, data);
      
      if (verified) {
        session.completedFactors.push(factorType);
        const remainingFactors = this.getRemainingFactors(session);
        
        if (remainingFactors.length === 0) {
          session.status = 'completed';
        }

        await this.saveSession(session);
        
        return {
          success: true,
          remainingFactors,
          sessionStatus: session.status
        };
      }

      session.attempts++;
      if (session.attempts >= this.getMaxAttempts()) {
        session.status = 'failed';
      }

      await this.saveSession(session);
      
      return {
        success: false,
        remainingFactors: this.getRemainingFactors(session),
        sessionStatus: session.status
      };
    } catch (error) {
      console.error('认证因素验证失败:', error);
      throw error;
    }
  }

  // 验证具体认证因素数据
  private async verifyFactorData(
    factorType: string,
    userId: string,
    data: any
  ): Promise<boolean> {
    switch (factorType) {
      case 'biometric':
        return await this.verifyBiometric(userId, data);
      case 'behavior':
        return await this.verifyBehavior(userId, data);
      case 'knowledge':
        return await this.verifyKnowledge(userId, data);
      case 'possession':
        return await this.verifyPossession(userId, data);
      default:
        throw new Error(`不支持的认证因素类型: ${factorType}`);
    }
  }

  // 生物特征验证
  private async verifyBiometric(userId: string, data: any): Promise<boolean> {
    const result = await this.biometricService.verifyBiometric(
      userId,
      data.type,
      data.biometricData
    );
    return result.verified && result.confidence > 0.9;
  }

  // 行为验证
  private async verifyBehavior(userId: string, data: any): Promise<boolean> {
    const result = await this.behaviorService.verifyBehavior(userId, data);
    return result.verified && result.confidence > 0.85;
  }

  // 知识验证
  private async verifyKnowledge(userId: string, data: any): Promise<boolean> {
    // 实现知识因素验证
    return true;
  }

  // 持有物验证
  private async verifyPossession(userId: string, data: any): Promise<boolean> {
    // 实现持有物因素验证
    return true;
  }

  // 获取剩余认证因素
  private getRemainingFactors(session: AuthSession): string[] {
    const config = this.getConfig(session.userId);
    return config.requiredFactors
      .filter(factor => factor.required)
      .map(factor => factor.type)
      .filter(type => !session.completedFactors.includes(type));
  }

  // 获取最大尝试次数
  private getMaxAttempts(): number {
    return 3;
  }

  // 获取用户配置
  private getConfig(userId: string): MFAConfig {
    // 实现获取用户配置
    return {
      requiredFactors: [
        { type: 'biometric', weight: 0.4, required: true },
        { type: 'behavior', weight: 0.3, required: true },
        { type: 'knowledge', weight: 0.2, required: true },
        { type: 'possession', weight: 0.1, required: false }
      ],
      securityLevel: 'standard',
      timeoutSeconds: 300,
      maxAttempts: 3
    };
  }

  // 保存会话
  private async saveSession(session: AuthSession): Promise<void> {
    const encryptedSession = await this.crypto.encryptData(session);
    await this.db.put(`session:${session.id}`, encryptedSession);
  }

  // 获取会话状态
  async getSessionStatus(sessionId: string): Promise<AuthSession> {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('认证会话不存在');
    return session;
  }

  // 终止会话
  async terminateSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.status = 'failed';
      await this.saveSession(session);
      this.sessions.delete(sessionId);
    }
  }

  // 清理过期会话
  private async cleanupExpiredSessions(): Promise<void> {
    const now = Date.now();
    for (const [sessionId, session] of this.sessions.entries()) {
      const sessionAge = now - session.startTime.getTime();
      if (sessionAge > this.getConfig(session.userId).timeoutSeconds * 1000) {
        await this.terminateSession(sessionId);
      }
    }
  }
} 