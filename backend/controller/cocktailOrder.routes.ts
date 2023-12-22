import express, {Request, Response} from 'express';
import cocktailorderService from '../service/cocktailorder.service';

/**
 * @swagger
 *  components:
 *      schemas:
 *          CocktailOrder:
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

export const cocktailOrder = express.Router();

/**
 * @swagger
 * /cocktailOrders/:
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


cocktailOrder.get('/', async (req: Request, res:Response) => {
    try {
        const orders=await cocktailorderService.getAllCocktailOrders();
        console.log(orders)
        res.status(200).json(orders);

    }catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }

})

/**
 * @swagger
 * /cocktailOrders/{id}:
 *  get:
 *      summary: Get all Orders
 *      responses:
 *          200:
 *              description: Returns all orders.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Order'
 * 
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Event ID
 *         required: true
 */


cocktailOrder.get('/:id', async (req: Request, res:Response) => {
    try {
        const orders=await cocktailorderService.getCocktailOrdersByOrderID(parseInt(req.params.id));
        console.log(orders)
        res.status(200).json(orders);

    }catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }

})