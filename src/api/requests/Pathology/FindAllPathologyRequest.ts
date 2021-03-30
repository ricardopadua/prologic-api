
export default class FindAllPathologyRequest {

  constructor(page: number, limit: number) {
    this.Page = page ? page : 1;
    this.Limit = limit ? limit : 10;
  }

  Page?: number;
  Limit?: number;

  public pagination() {
    return {
      skip: this.Page == 1 ? 0 : (this.Page * this.Limit) - this.Limit,
      take: this.Limit

    }
  }

}