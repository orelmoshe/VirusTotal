import { Request, Response } from 'express';

export abstract class IUrlController {
    public abstract report(req: Request, res: Response): void;
}