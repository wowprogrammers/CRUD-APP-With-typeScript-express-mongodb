import mongoose from "mongoose";
let DB: string;
if(process.env.environment == 'production'){
    DB = process.env.mongoDB_prod || "";
}else{ 
    DB = process.env.mongodb_Dev || "";
}

 
mongoose.connect(DB,{  
   
}).then(() => {
    console.log("Database connected Successfully");
}).catch(()=>{
    console.log("Not Connected Database")
}) 