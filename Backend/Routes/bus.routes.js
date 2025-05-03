import express from "express";
import { 
  addBusHandler, 
  getBusHandler, 
  getBusByIdHandler, 
  searchBusHandler, 
  bookSeatHandler, 
  cancelBookingHandler 
} from "../controllers/bus.controller.js";
import isAuthenticated from "../utils/isAuthenticated.js";
import { isAdmin } from "../utils/isAdmin.js";

export const busRouter = express.Router();

// Bus routes
busRouter.post('/addbus', isAuthenticated, isAdmin, addBusHandler);
busRouter.get('/getbus', getBusHandler);
busRouter.get('/getbus/:busId', getBusByIdHandler);
busRouter.get('/search', searchBusHandler);
busRouter.post('/bookseat', isAuthenticated, bookSeatHandler);
busRouter.post("/cancelbooking", isAuthenticated, cancelBookingHandler);