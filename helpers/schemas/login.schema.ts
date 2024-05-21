import * as yup from 'yup'
import { emailValidation, passwordValidation } from './common.schema'
import { LoginInput } from '../types/user.controller'

export const schemaLogin: yup.Schema<LoginInput> = yup
  .object({
    user_name: emailValidation,
    password: yup.string().required('Éste campo es requerido'),
  })
  .required()

// export const schemaRecoveryPassword = yup
//   .object({
//     email: emailValidation,
//   })
//   .required()

// export const schemaSetNewPassword = yup
//   .object({
//     password: passwordValidation,
//     re_password: yup
//       .string()
//       .required('Éste campo es requerido')
//       .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir'),
//   })
//   .required()
