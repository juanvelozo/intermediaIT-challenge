export interface IRegisterDTO {
  user_name: string
  user_email: string;
  password: string
}
export interface ILoginDTO {
  user_email: string
  password: string
}

export enum RegisterFormFields {
  userName = 'user_name',
  userEmail = 'user_email',
  userPass = 'password',
}
export enum LoginFormFields {
  userEmail = 'user_email',
  userPass = 'password',
}