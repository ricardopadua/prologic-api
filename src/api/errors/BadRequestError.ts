import { HttpError } from 'routing-controllers';

export class BadRequestError extends HttpError {
    constructor() {
        super(400, 'xxxxxxxxxxxxx');
    }
}