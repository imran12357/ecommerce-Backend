const ErrorHandler = require("../Utils/ErrorHandler")

const errorMiddleware =(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message =err.message || "internal server error"


    if(err.name === 'CastError'){
        const message = `Resource not found invalid:${err.path}`
        err =new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        path:err.stack
    })
}

module.exports =errorMiddleware