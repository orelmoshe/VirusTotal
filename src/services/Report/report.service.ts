import { ErrorREST, HttpCodes, MessageErrors } from '../../shared'
import * as request from 'request-promise';

export class ReportService {

    constructor() {

    }

    public async report(apiKey: string, resource: string, searchFilter: string): Promise<any> {
        try {
            const options = {
                url: `https://www.virustotal.com/vtapi/v2/${searchFilter}/report?apikey=${apiKey}&resource=${resource}`,
                strictSSL: false,
                headers: {
                    'Content-Type': 'application/json',
                },
                json: true,
                resolveWithFullResponse: true,
                timeout: 1500,
                simple: true,
            }
            const response = await request.get(options);
            if (!response) {
                const err = 'Request rate limit exceeded. You are making more requests than allowed!';
                console.error(err);
                throw new ErrorREST(HttpCodes.RATE_LIMIT, err);
            }
            if (response.body.response_code === 0) {
                const err = 'Resource is not valid, Please check your resource!';
                throw new ErrorREST(HttpCodes.NOT_FOUND, err);
            }
            return response.body;

        } catch (ex) {
            if (ex.message == MessageErrors.TokenInValidMessage) {
                throw new ErrorREST(HttpCodes.FORBIDDEN, 'API key is invalid');
            }
            throw new ErrorREST(HttpCodes.FORBIDDEN, ex);
        }

    }
}