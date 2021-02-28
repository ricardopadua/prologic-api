import { HttpError } from 'routing-controllers';

export class ForbiddenError extends HttpError {
    constructor() {
        super(403, 'xxxxxxxxxxxxxxxxxxxx');
    }
}