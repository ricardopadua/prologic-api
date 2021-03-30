
export class HttpResultBase {
    constructor(httpCode: number, name: string, message: string, error: any[]) {
        this.Status = false;
        this.HttpCode = httpCode;
        this.Name = name;
        this.Message = message;
        this.Error = error;
    }

    public Status: boolean;
    public HttpCode: number;
    public Name: string;
    public Message: string;
    public Error: any[];
}