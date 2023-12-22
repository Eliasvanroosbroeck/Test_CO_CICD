import express, {Request, Response} from 'express';
import orderService from '../service/order.service';
import { EventInput } from '../types/types';

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddUserToEvent:
 *           type: object
 *           properties:
 *            userid:
 *                 type: number
 *                 format: int64
 *            eventid:
 *                 type: number
 *                 format: int64
 *          Order:
 *            type: object
 *            properties:
 *              userid:
 *                   type: number
 *                   format: int64
 *              orderid:
 *                   type: number
 *                   format: int64
 *              deliveryDate:
 *                  type: Date
 *                  description: Date time
 */

export const orderRouter = express.Router();

/**
 * @swagger
 * /orders/:
 *  get:
 *      summary: Get all Orders
 *      responses:
 *          200:
 *              description: Returns all orders.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Order'
 */


orderRouter.get('/', async (req: Request, res:Response) => {
    try {
        const orders=await orderService.getAllOrders();
        res.status(200).json(orders);

    }catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }

})