export class ApiResponse<T> {
  status: number;
  type: string;
  data: T;

  constructor(data: T) {
    this.status = 200;
    this.type = "success";
    this.data = data;
  }
}
