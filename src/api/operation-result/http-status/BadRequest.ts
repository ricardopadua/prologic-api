import { HttpResultBase } from './HttpResultBase';

export class BadRequest extends HttpResultBase {
    constructor(error: any[]) {
        super(400, 'BadRequestError', 'The server cannot or will not process the your request.', error);
    }
}