import * as yup from 'yup'
const emailRegExp = /^[a-zA-Z0-9_.+-]+@\w+([.-]?\w+)*(\.\w{2,3})+$/

export const emailValidation = yup
  .string()
  .required('Éste campo es requerido')
  .matches(emailRegExp, {
    message: 'Éste correo no es válido.',
    excludeEmptyString: true,
  })

export const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9])/

export const passwordValidation = yup
  .string()
  .required('Éste campo es requerido')
  .min(8, 'Mínimo 8 caracteres')
  .matches(passwordRegex, 'Debe tener una mayuscula y un número')
  .matches(/^\S*$/, 'Los espacios en blanco no están permitidos')