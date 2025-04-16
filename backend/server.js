// import moduls
import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/connectDB.js";
import cors from 'cors'

//import middleware
import userRouter from "./controller/userRouter.js";
import menuRouter from "./controller/menuRouter.js";
import orderRouter from "./controller/orderRouter.js";




//milö variabler i .env
dotenv.config();
const port = process.env.PORT;

//initiala express
const app = express();

//app tillåter komma req från browser till server
app.use(cors())

//app kunna läsa json data
app.use(express.json());

//ansluta till DB
connectDB();

//import swagger
//http://localhost:8000/api-docs/
import { swaggerUi, specs } from "./swagger.js";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//routes
//user routes (login & signup)
app.use("/api/user", userRouter);
// menu
app.use("/api/menu", menuRouter);
//order
app.use("/api/order", orderRouter);

//koppla express till en port
app.listen(port, () => {
  console.log(`✅ connected to the port${port}`);
});
