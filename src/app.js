import express from "express";
import {catRoute,userRoute,authRoute}from "./api/index.js";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/api/v1', catRoute);
app.use('/api/v1', userRoute);
app.use("/api/v1", authRoute);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error('Error handler caught:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

export default app;