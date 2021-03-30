import { HttpResultBase } from './HttpResultBase';

export class HttpCreated extends HttpResultBase {
    constructor(data: any[]) {
        super(201, 'Created', 'The request was successful and that a new resource was created.', []);
        this.Status = true;
        this.Data = data;
    }

    public Data: any[];
}