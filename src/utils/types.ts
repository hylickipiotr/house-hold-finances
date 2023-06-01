export interface User {
  sub: string;
}

export interface ResponseWithData<T> {
  data: T;
}
