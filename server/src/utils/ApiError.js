class ApiError extends Error{
    constructor(
        statusCode,
        message = 'Something went wrong',
        sucess = false,
        error = [],
        stack = null

    ){
        super(message);
        this.statusCode =statusCode;
        this.error = error;
        this.stack = null;
        this.success = false;

        if(stack){
        this.stack = stack;
    }
    else{
        Error.captureStackTrace(this, this.constructor);
    }


    }
    
}
export default ApiError;