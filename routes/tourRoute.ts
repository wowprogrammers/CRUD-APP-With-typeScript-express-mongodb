import express from 'express';
const tourRoute = express.Router();
import * as tourController from '../controllers/tourController';

tourRoute.post('/',tourController.createTour);
tourRoute.get('/:tourId',tourController.getTour);
tourRoute.put('/:tourId',tourController.updateTour);
tourRoute.delete('/:tourId',tourController.deleteTour)



export {tourRoute}