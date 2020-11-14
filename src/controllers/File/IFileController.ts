import { Request, Response } from 'express';

export abstract class IFileController {
    public abstract report(req: Request, res: Response): void;
}