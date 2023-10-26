import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/typeCrudTour',{

}).then(() => {
    console.log("Database connected Successfully");
}).catch(()=>{
    console.log("Not Connected Database")
})