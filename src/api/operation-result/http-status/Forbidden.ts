import { HttpResultBase } from './HttpResultBase';

export class Forbidden extends HttpResultBase {
    constructor(error: any[]) {
        super(403, 'ForbiddenError', 'User don´t have privilege level for access resource.', error);
    }
}