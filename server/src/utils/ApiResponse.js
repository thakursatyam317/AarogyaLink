class ApiResponse{
    constructor(statusCode, message = 'Ok', data){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;