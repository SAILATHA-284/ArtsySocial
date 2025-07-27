import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
import{placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus, verifyRazorpay} from '../controllers/orderController.js';

const orderRouter = express.Router()

orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);


orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay);

orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter;