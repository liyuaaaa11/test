declare namespace Express {
  export interface User {
    id: number,
    username: string,
    password: string,
    email: string,
    role: number,
    grade: String,
    subject: String,
    createdTime: Date,
    updatedTime: Date,
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