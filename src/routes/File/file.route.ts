import express, { Request, Response } from 'express';
import { fileController } from '../../controllers';
export const router = express.Router({
    strict: true
});

router.post('/',(req: Request, res: Response) => {
        fileController.report(req, res);
    });

