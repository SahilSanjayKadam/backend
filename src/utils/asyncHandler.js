const asyncHandler=(fn)=>{
    return (req,res,next)=>{
        Promise.resolve(fn(req,res,next))
        .catch( (err)=>next(err))
     }
}







/*
const asyncHandlerNew=(fn)=>async (req,res,next)=>{
    try{
      await fn(req,res,next)
    }catch(e){
       res.status(e.code || 500).json({
        success:false,
        message:e.message
       })
    }
}
*/

export default asyncHandler;