import { HttpResultBase } from './HttpResultBase';

export class Unauthorized extends HttpResultBase {
    constructor(error: any[]) {
        super(401, 'UnauthorizedError', 'User don´t have credentials valid for access resource or don´t be authenticated.', error);
    }
}