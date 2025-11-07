import express from 'express';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js';
import authRouter from './routes/auth-router.js';


const catRoute = express.Router();
catRoute.use("/cats", catRouter);

const userRoute = express.Router();
userRoute.use("/users", userRouter);

const authRoute = express.Router();
authRoute.use("/auth", authRouter);

export {catRoute, userRoute, authRoute};