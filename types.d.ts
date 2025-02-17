declare namespace Express {
  export interface User {
    id: number,
    name: string,
    password: string
  }
  export interface Request {
      user: User
  }
  export interface Response {
      user: User
  }
}