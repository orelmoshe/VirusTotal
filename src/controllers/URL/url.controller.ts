import { Request, Response } from 'express';
import { IUrlController } from '../URL/IUrlController';
import { ErrorREST, HttpCodes } from '../../shared'
import { reportService } from '../../services';



export class URLController extends IUrlController {

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
            if (!req.body.url) {
                const err = 'URL is missing!';
                console.log(err)
                throw new ErrorREST(HttpCodes.UNPROCESSABLE_ENTITY, err)
            }
            const apiKey = req.body.apiKey as string;
            const url = req.body.url as string;
            const searchFilter = 'url';

            const response = await reportService.report(apiKey, url, searchFilter);

            return res.status(HttpCodes.OK).json(response);

        } catch (ex) {
            return res.status(ex.status).json({ status: ex.status, message: ex.message })
        }

    }
}