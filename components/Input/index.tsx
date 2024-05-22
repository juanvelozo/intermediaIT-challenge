import { TextInput, TextInputProps } from '@react-native-material/core'
import * as React from 'react'

import {
    Control,
    FieldValues,
    Path,
    PathValue,
    useController,
} from 'react-hook-form'

interface Props<T extends FieldValues> {
    name: Path<T>
    required?: boolean
    defaultValue?: PathValue<T, Path<T>>
    control: Control<T>
    placeholder?: string
    password?: boolean
}

export const Input = <T extends FieldValues>({
    control,
    name: nameInput,
    defaultValue,
    required,
    placeholder,
    keyboardType,
    password,
    ...props
}: Props<T> & TextInputProps) => {
    // hooks
    const {
        field: { onBlur, onChange, value },
    } = useController<T, Path<T>>({
        name: nameInput,
        defaultValue,
        rules: { required },
        control,
    })

    // render
    return (
        <TextInput
            value={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={password}
            onBlur={onBlur}
            onChangeText={onChange}
            {...props}
        />
    )
}
