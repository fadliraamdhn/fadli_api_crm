export class AppError extends Error {
    public status: number;
    public isOperational: boolean;

    constructor(message: string, status: number = 400) {
        super(message);
        this.status = status;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
