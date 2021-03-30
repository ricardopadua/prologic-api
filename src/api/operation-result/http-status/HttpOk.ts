import { HttpResultBase } from './HttpResultBase';

export class HttpOk extends HttpResultBase {
    constructor(data: any[]) {
        super(200, 'Created', 'The request was successful.', []);
        this.Status = true;
        this.Data = data;
    }

    public Data: any[];
}