import { HttpResultBase } from './HttpResultBase';

export class Forbidden<T> extends HttpResultBase<T> {
    constructor(error: T[]) {
        super(403, 'ForbiddenError', 'User don´t have privilege level for access resource.', error);
    }
}