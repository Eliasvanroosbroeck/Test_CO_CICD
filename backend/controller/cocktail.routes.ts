import express, {Request, Response} from 'express';
import cocktailService from '../service/cocktail.service';
import { CocktailSQLView,UserSQLUnique } from '../types/types';

/**
 * @swagger
 *  components:
 *      schemas:
 *          Cocktail:
 *            type: object
 *            properties:
 *              cocktailid:
 *                   type: number
 *                   format: int64
 *              name:
 *                   type: string
 *                   description: cocktail name
 *              ingredients:
 *                  type: string
 *                  description: ingredients attribute
 *              description:
 *                   type: string
 *                   description: description
 *              price:
 *                   type: number
 *                   description: description
 */ 

export const cocktailRouter = express.Router();

/**
 * @swagger
 * /cocktails/:
 *  get:
 *      summary: Get all cocktails
 *      responses:
 *          200:
 *              description: Returns all Users.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Cocktail'
 */
cocktailRouter.get('/', async (req: Request, res:Response) =>{
    try{
        const cocktails = await cocktailService.getAllCocktails();
        console.log(cocktails)
        res.status(200).json(cocktails)
    } catch (error){
        res.status(500).json({status:'error', errorMessage: error.message});

    }
});

/**
 * @swagger
 * /cocktails/{id}:
 *  get:
 *      summary: Get a cocktail by ID
 *      responses:
 *          200:
 *              description: Returns a cocktail. If the cocktail does not exist, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Cocktail'
 *      parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *      
 */
cocktailRouter.get('/:id', async (req: Request, res:Response) => {
    const idInput= req.body
    try {
        const cocktail = await cocktailService.getCocktailByID(parseInt(req.params.id));
        res.status(200).json(cocktail);
    } catch (error){
        res.status(500).json({status: 'error', errorMessage: error.message});
    }
});

/**
 * @swagger
 * /cocktails:
 *  post:
 *      summary: Add a Cocktail.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Cocktail'
 *      responses:
 *          200:
 *              description: The created user object.
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Cocktail'
 *      
 */
cocktailRouter.post('/', async (req:Request, res: Response) => {
    const UserInput= <CocktailSQLView>req.body;
    try{
        const cocktail= await cocktailService.addCocktail({name: UserInput.name, description:UserInput.description, ingredients:UserInput.ingredients, price:UserInput.price});
        console.log(cocktail)
        res.status(200).json(cocktail);
    } catch(error){
        res.status(500).json({status:'error', errorMessage: error.message});
    }
})

/**
 * @swagger
 * /cocktails/{id}:
 *  delete:
 *      summary: Delete a cocktail by ID
 *      responses:
 *          200:
 *              description: Delete a cocktail. If the ID does not exist, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Cocktail'
 *      parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *      
 */
cocktailRouter.delete('/:id', async (req:Request, res: Response) => {
    const userInput=req.params.id;
    try{
        const cocktail= await cocktailService.deleteCocktail(parseInt(userInput))
        console.log(cocktail)
        res.status(200).json(cocktail);
    } catch(error){
        res.status(500).json({status:'error', errorMessage: error.message});
    }
})

/**
 * @swagger
 * /cocktails:
 *  put:
 *      summary: Update a cocktail.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Cocktail'
 *      responses:
 *          200:
 *              description: The updated cocktail object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Cocktail'
 */
cocktailRouter.put('/', async (req:Request, res: Response) => {
    const UserInput= <CocktailSQLView>req.body;
    try{
        const cocktail= await cocktailService.updateCocktail({cocktailid: UserInput.cocktailid, name: UserInput.name, description:UserInput.description, ingredients:UserInput.ingredients, price:UserInput.price});
        console.log(cocktail)
        res.status(200).json(cocktail);
    } catch(error){
        res.status(500).json({status:'error', errorMessage: error.message});
    }
})






