import { Aggregate } from "mongoose";
import Tour from "../models/tourModel";
import { Request,Response } from "express";

// Create New Tour

const createTour = async(req:Request,res:Response) => {
    try {
        
        const {name,description,price,location} = req.body;

       const tour = await Tour.create({
        name,
        description,
        price,
        location
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
        // Intentionally I have used find method because according to my requirnment
        // I want result in array  
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

// Aggregation Practice 1 
// Finding all the tours which exist inside 30m of radius from specified location

const allToursinside30Radius = async(req:Request,res:Response) => {
    try {
        
        const longitude = req.query.longitude as string; 
        const latitude = req.query.latitude as string;
  
            if(!longitude || !latitude){
                return res.status(400).json({Error:"Longitude or Latitude is missing!!"})
            }

            const tours = await Tour.aggregate([
                {
                    $geoNear:{
                        near:{
                            type:"Point",
                            coordinates:[parseFloat(longitude),parseFloat(latitude)]
                        },
                        distanceField:"distance",
                        maxDistance:30,
                        spherical:true
                    }
                }
            ])

            if(tours){
                return res.status(200).json({
                    status:"Success",
                    length:tours.length,
                    tours
                })
            }

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ Error: error.message });
          } else {
            res.status(500).json({ Error: 'An unknown error occurred' });
          }
    }
}
// Get tour stats
const tourStats = async(req:Request,res:Response) => {
    try {
        
        const stats = await Tour.aggregate([
            {
                $group:{
                    _id:null,
                    MinimumTourPrice:{$min:'$price'},
                    MaximumTourPrice:{$max:"$price"},
                    AverageTourPrice:{$avg:"$price"}
                }
            },
            {
                $project:{
                    _id:0
                }
            }
        ])
        if(stats){
            return res.status(200).json({
                status:"Success",
                stats
            })
        }

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ Error: error.message });
          } else {
            res.status(500).json({ Error: 'An unknown error occurred' });
          }
    }
}

// // Storage stats of our collection
// count: The number of documents in the collection.
// size: The total size of the collection in the specified scale (KB in this case).
// avgObjSize: The average size of documents in the collection in the specified scale.
// storageSize: The total size of the data in the collection, including all indexes and padding, in the specified scale.
// capped: Whether the collection is capped (fixed size) or not.
// max: The maximum document size allowed in the collection.
// nindexes: The number of indexes on the collection.
// indexDetails: Detailed information about each index in the collection.
const storageStats = async(req:Request,res:Response) => {
    try {
        
        const storStats = await Tour.aggregate([
            {
                $collStats:{storageStats:{scale:1024}} 
            }
        ])

        if(storStats){
            return res.status(200).json({
                status:"success",
                storageStats:storStats
            })
        }
        
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ Error: error.message });
          } else {
            res.status(500).json({ Error: 'An unknown error occurred' });
          }
    }
} 
export {createTour,getTour,updateTour,deleteTour,allToursinside30Radius,tourStats,storageStats};

