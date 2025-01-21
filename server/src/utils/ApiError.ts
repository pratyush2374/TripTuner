class ApiError extends Error {
    statusCode: number;
    data: any;
    success: boolean;
    errors?: any[]; // Optional
    stack?: string; // Optional

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors?: any[], // Optional
        stack?: string // Optional
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = message;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
