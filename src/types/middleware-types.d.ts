import { Request, Response, NextFunction } from 'express';

// 认证中间件类型
export interface AuthMiddleware {
  verifyToken(req: Request, res: Response, next: NextFunction): Promise<void>;
  checkRole(role: string): (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

// 速率限制中间件类型
export interface RateLimitMiddleware {
  standard(req: Request, res: Response, next: NextFunction): Promise<void>;
  upload(req: Request, res: Response, next: NextFunction): Promise<void>;
}

// 验证中间件类型
export interface ValidationMiddleware {
  validateBody(schema: any): (req: Request, res: Response, next: NextFunction) => Promise<void>;
  validateQuery(schema: any): (req: Request, res: Response, next: NextFunction) => Promise<void>;
} 