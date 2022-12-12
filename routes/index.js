import productRouter from "./product.route.js";
import express from "express";

const appRouter = express.Router();

appRouter.use('/product', productRouter)

export default appRouter