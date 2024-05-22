export interface IApiResponse extends IApiError {
    success: boolean | undefined
}

// success: false, message: error.message, error: error

export interface IApiError {
    message: string | undefined
    error: Error | undefined
}
