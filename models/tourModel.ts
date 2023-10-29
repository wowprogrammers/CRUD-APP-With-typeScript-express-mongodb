import mongoose, {Document,Schema} from "mongoose";

export interface tourInterface extends Document {
        name:String;
        description:String;
        price:Number;
        location:{
            type:"Point";
            coordinates:number[];
            address:string;
            description:string
        }
}

const tourSchema = new Schema({
    name:String,
    description:String,
    price:Number,
    location:{
        //GeoJSON
        type:{
            type:String,
            default:"Point",
            enum:["Point"]
        },
        coordinates:[Number],
        address:String,
        description:String
    },

})

const Tour =  mongoose.model<tourInterface>('Tour',tourSchema);
export default Tour;