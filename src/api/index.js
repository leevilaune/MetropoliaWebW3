import express from 'express';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js';


const catRoute = express.Router();
catRoute.use("/cat", catRouter);

const userRoute = express.Router();
userRoute.use("/user", userRouter);

export {catRoute, userRoute};