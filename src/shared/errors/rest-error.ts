
import { CustomError } from 'ts-custom-error'

export class ErrorREST extends CustomError {

    public constructor(public status: number, message: string) {
        super(message)
    }

}

