declare namespace Express {
  export interface User {
    id: number,
    name: string,
    password: string
  }
  export interface TeachShare {
    id: number,
    userId: number,
    title: string,
    content: string
  }
  export interface Request {
      user: User
  }
  export interface Response {
      user: User
  }
}