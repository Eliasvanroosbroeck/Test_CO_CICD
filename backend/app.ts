import * as dotenv from "dotenv";
import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {userRouter} from '../backend/controller/user.routes'
import {cocktailRouter} from '../backend/controller/cocktail.routes'
import {eventRouter} from '../backend/controller/event.routes'
import { orderRouter } from "./controller/order.routes";
import { cocktailOrder } from "./controller/cocktailOrder.routes";
import { expressjwt } from "express-jwt";
const jwtSecret= process.env.JWT_SECRET;
const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

const swaggerOpts = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Back-end",
      version: "1.0.0",
    },
  },
  apis: ["./controller/*.routes.ts"],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);


app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRouter)
app.use('/cocktails', cocktailRouter)
app.use('/orders', orderRouter)
app.use('/events', eventRouter)
app.use('/cocktailOrders', cocktailOrder)
app.use((error: Error, req:Request, res:Response, next:NextFunction) => {
  if (error.name === 'Unauthorized'){
    res.status(401).json({status: 'unauthorized', message: error.message})
  }else if (error.name === 'WhattError'){
    res.status(400).json({status: 'error', message: error.message});
  }
  else {
      next();
  }
})

app.get("/status", (req, res) => {
  res.json({ message: "Back-end is running..." });
});

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(expressjwt({secret: jwtSecret, algorithms: ['HS256']}).unless({
  path: [/^\/api-docs\/.*/, '/users/login', '/users/signup', "/" , '/status'],
  }));
  

app.listen(port || 3000, () => {
  console.log(`Back-end is running on port ${port}.`);
});
