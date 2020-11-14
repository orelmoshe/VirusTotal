import express, { Request, Response } from 'express';
import { urlController } from '../../controllers';
export const router = express.Router({
    strict: true
});

router.post('/',(req: Request, res: Response) => {
    urlController.report(req, res);
    });

