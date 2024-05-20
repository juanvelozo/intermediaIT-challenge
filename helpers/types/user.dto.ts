export interface ILoginDTO {
  user_name: string
  password: string
}

export enum LoginFormFields {
  userName = 'user_name',
  userPass = 'password',
}