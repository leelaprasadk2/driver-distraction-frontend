import mongoose from 'mongoose';
export async function connect()
{
    try{
       await mongoose.connect(process.env.MONGODB_URI as string) 
       const connection=mongoose.connection
       connection.on('connected',()=>{
        console.log("Database connected successfully");
       })
       connection.on("error",(error)=>{
       console.log("Database connection failed",error);
       process.exit(1);
       })
        }
    catch(error)
    {
        console.log("Database connection error:", error);
    }
}