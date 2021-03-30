import { HttpResultBase } from './HttpResultBase';

export class TokenError extends HttpResultBase {
    constructor(name: string, message: string, error: any[]) {
        super(401, name, 'There was a problem with your authorization.', error);
    }
}