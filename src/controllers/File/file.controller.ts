import { Request, Response } from 'express';
import { IFileController } from '../File/IFileController';
import { ErrorREST, HttpCodes } from '../../shared'
import { reportService } from '../../services';



export class FileController extends IFileController {

    constructor() {
        super();
    }

    public async report(req: Request, res: Response): Promise<Response> {
        try {

            if (!req.body.apiKey) {
                const err = 'API key is missing!';
                console.error(err);
                throw new ErrorREST(HttpCodes.UNPROCESSABLE_ENTITY, err);
            }
            if (!req.body.md5) {
                const err = 'MD5 is missing!';
                console.log(err)
                throw new ErrorREST(HttpCodes.UNPROCESSABLE_ENTITY, err)
            }
            const apiKey = req.body.apiKey as string;
            const md5 = req.body.md5 as string;
            const searchFilter = 'file'

            const response = await reportService.report(apiKey, md5, searchFilter);

            return res.status(HttpCodes.OK).json(response);

        } catch (ex) {
            return res.status(ex.status).json({ status: ex.status, message: ex.message })
        }

    }
}