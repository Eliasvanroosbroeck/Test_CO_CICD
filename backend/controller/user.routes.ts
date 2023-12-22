import express, {Request, Response} from 'express';
import userService from '../service/user.service';
import {LoginInput, UserLogin, UserSQLUnique} from '../types/types';


/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *            type: object
 *            properties:
 *              userid:
 *                   type: number
 *                   format: int64
 *              name:
 *                   type: string
 *                   description: User name
 *              role:
 *                  type: string
 *                  description: Role attribute
 *              telNr:
 *                   type: string
 *                   description: tel nr
 *              mail:
 *                   type: string
 *                   description: user email
 *              password:
 *                  type: string
 *                  description: users password
 * 
 *          UserInput:
 *            type: object
 *            properties:
 *              userid:
 *                     type: number
 *                     format: int64
 *              name:
 *                    type: string
 *                    description: User name
 *                    example: test
 *              role:
 *                    type: string
 *                    description: Role attribute
 *                    example: ADMIN
 *              telNr:
 *                    type: string
 *                    description: Phone number
 *                    example: 1234
 *              mail:
 *                    type: string
 *                    description: user email
 *                    example: test@test.be
 *              password:
 *                    type: string
 *                    description: users password
 *                    example: p
 * 
 *          UserUpdate:
 *            type: object
 *            properties:
 *              userid:
 *                     type: number
 *                     format: int64
 *                     example: 1
 *              name:
 *                    type: string
 *                    description: User name
 *                    example: test
 *              role:
 *                    type: string
 *                    description: Role attribute
 *                    example: ADMIN
 *              telNr:
 *                    type: string
 *                    description: Phone number
 *                    example: 1234
 *              mail:
 *                    type: string
 *                    description: user email
 *                    example: test@test.be
 *              password:
 *                    type: string
 *                    description: users password
 *                    example: p
 */



export const userRouter = express.Router();

/**
 * @swagger
 * /users/:
 *  get:
 *      summary: Get all user
 *      responses:
 *          200:
 *              description: Returns all Users.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */

//& {auth:LoginInput}
userRouter.get('/', async (req: Request, res:Response) => {
    //const loggedInUser= req.auth.name;
   // console.log('logged in user: ', loggedInUser);
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error){
        res.status(500).json({status: 'error', errorMessage: error.message});
    }
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: Get a user by ID
 *      responses:
 *          200:
 *              description: Returns a Users. If the user does not exist, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *      parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *      
 */


userRouter.get('/:id', async (req: Request, res:Response) => {
    try {
        const user = await userService.getUserByID(parseInt(req.params.id));
        //console.log(user) //werkt
        res.status(200).json(user);
    } catch (error){
        res.status(500).json({status: 'error', errorMessage: error.message});
    }
});

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Add a User.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserInput'
 *      responses:
 *          200:
 *              description: The created user object.
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *      
 */
userRouter.post('/signup', async (req:Request, res: Response) => {
    const UserInput= <UserSQLUnique>req.body;
    if(!UserInput.name || !UserInput.password ){throw new Error('Please provide an username and password')}
    try{
        const user= await userService.addUser({name: UserInput.name, telNr:UserInput.telNr, mail:UserInput.mail, password:UserInput.password});
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({status:'error', statusText: error.message});
    }

})


/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      summary: Delete a user by ID
 *      responses:
 *          200:
 *              description: Delete a Users. If the ID does not exist, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *      parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *      
 */
userRouter.post('/:id', async (req:Request, res: Response) => {
    const userInput=req.params.id;
    try{
        const user= await userService.deleteUser(parseInt(userInput))
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({status:'error', errorMessage: error.message});
    }
})

/**
 * @swagger
 * /Users:
 *  put:
 *      summary: Update a User.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserUpdate'
 *      responses:
 *          200:
 *              description: The updated User object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
userRouter.put('/', async (req:Request, res: Response) => {
    const UserInput= <UserSQLUnique>req.body;
    try{
        const user= await userService.updateUser({userid: UserInput.userid, name: UserInput.name, telNr:UserInput.telNr, mail:UserInput.mail, password:UserInput.password, role:UserInput.role});
        console.log(user)
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({status:'error', errorMessage: error.message});
    }
})

userRouter.post('/',async (req:Request, res: Response) => {
    try{
        const userInput= <LoginInput>req.body;
        const token = await userService.authenticate(userInput.name, userInput.password);
        res.status(200).json({message: 'Authentication succesfull' , token});
    }catch(error){
        res.status(401).json({status: 'unauthorized', errorMessage: error.message})
    }

})

