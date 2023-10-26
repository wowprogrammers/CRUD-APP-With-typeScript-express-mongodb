import mongoose, {Document,Schema} from "mongoose";

export interface tourInterface extends Document {
        name:String;
        description:String;
        price:Number;
}

const tourSchema = new Schema({
    name:String,
    description:String,
    price:Number

})

const Tour =  mongoose.model<tourInterface>('Tour',tourSchema);
export default Tour;