import * as yup from 'yup'
import { emailValidation } from './common.schema'
import { RegisterInput } from '../types/user.controller'

export const schemaRegister: yup.Schema<RegisterInput> = yup
    .object({
        user_name: yup.string().required(),
        user_email: emailValidation,
        password: yup.string().required(),
    })
    .required()
