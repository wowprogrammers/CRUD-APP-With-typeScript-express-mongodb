import Tour from "../models/tourModel";
import { Request,Response } from "express";

// Create New Tour

const createTour = async(req:Request,res:Response) => {
    try {
        
        const {name,description,price} = req.body;

       const tour = await Tour.create({
        name,
        description,
        price
       })

       if(!tour){
        return res.status(404).json({Error:"Tour Not Found!"})
       }
      
       res.status(201).json({
        status:"Success",
        tour
             })
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ Error: error.message });
          } else {
            res.status(401).json({ Error: 'An unknown error occurred' });
          }
      
    }
}

const getTour = async(req:Request,res:Response) => {
    try {
        
        const tourId = req.params.tourId;

        if(!tourId){
            return res.status(404).json({Error:"You have not pass tour id"})
        }

        const tour = await Tour.find({_id:tourId});

        if(tour){
            return res.status(200).json({
                status:"Success",
                tour
            })
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ Error: error.message });
          } else {
            res.status(401).json({ Error: 'An unknown error occurred' });
          }
    }
}

const updateTour = async(req:Request,res:Response) => {
    try {
        const tourId = req.params.tourId;
        if(!tourId){
            return res.status(404).json({Error:"Tour Id does not provided"});
        }

        const updatedTour = await Tour.findByIdAndUpdate(tourId,req.body , {
            new:true,
            runValidators:true
        })

        if(updatedTour){
            return res.status(200).json({
                status:"Success",
                tour:updatedTour
            })
        }else{
            return res.status(404).json({Error:"Tour You are trying to update does not exist"
            })
        }
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ Error: error.message });
          } else {
            res.status(401).json({ Error: 'An unknown error occurred' });
          }
    }
}

const deleteTour = async(req:Request,res:Response) => {
    try {
        const tourId = req.params.tourId;
        if(!tourId){
            return res.status(404).json({Error:"Tour Id does not provided"});
        }
        const deletedTour = await Tour.findByIdAndDelete(tourId);

        if(!deletedTour){
            return res.status(404).json({Error:"Tour you want to see does not exist"});
        }

        res.status(200).json({
            status:"Successfully Deleted"
        })
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ Error: error.message });
          } else {
            res.status(401).json({ Error: 'An unknown error occurred' });
          }
    }
}

export {createTour,getTour,updateTour,deleteTour};