import express from 'express';
const tourRoute = express.Router();
import * as tourController from '../controllers/tourController';

tourRoute.post('/',tourController.createTour);
tourRoute.get('/:tourId',tourController.getTour);
tourRoute.put('/:tourId',tourController.updateTour);
tourRoute.delete('/:tourId',tourController.deleteTour);
tourRoute.get('/tours-inside/specifc-radius/',tourController.allToursinside30Radius);
tourRoute.get('/tour/stats',tourController.tourStats);
tourRoute.get('/storage/stats',tourController.storageStats)



export {tourRoute}