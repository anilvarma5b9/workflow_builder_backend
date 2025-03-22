export class BR {
  status: boolean;
  id: string;
  message: string;
  error: string;
  data: any;

  constructor(
    status: boolean,
    message: string,
    error: string = '',
    data: any = {},
    id: string = '',
  ) {
    this.status = status;
    this.message = message;
    this.error = error;
    this.data = data;
    this.id = id;
  }
}
