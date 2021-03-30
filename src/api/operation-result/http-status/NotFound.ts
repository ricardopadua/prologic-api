import { HttpResultBase } from './HttpResultBase';

export class NotFound extends HttpResultBase {
    constructor(error: any[]) {
        super(404, 'NotFoundError', 'The resource requested couldn´t found in server.', error);
    }
}