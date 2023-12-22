import express, {Request, Response} from 'express';
import eventService from '../service/event.service';
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
 *          Event:
 *            type: object
 *            properties:
 *              eventid:
 *                   type: number
 *                   format: int64
 *              name:
 *                   type: string
 *                   description: event name
 *              address:
 *                  type: string
 *                  description: address attribute
 *              date:
 *                   type: DateTime
 *                   description: date
 *              duration:
 *                   type: Datetime
 *                   description: # of hours
 *              description:
 *                  type: string
 *                  description: description
 *              maxUsers:
 *                  type: number
 *                  format: int64
 *              
 */

export const eventRouter = express.Router();




/**
 * @swagger
 * /events/{id}:
 *  get:
 *      summary: Get an event by ID
 *      responses:
 *          200:
 *              description: Returns an event. If the Event does not exist, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Event ID
 *         required: true
 */
eventRouter.get('/:id', async (req: Request, res:Response) => {
    try {
        const events = await eventService.getEventByID(parseInt(req.params.id));
        console.log(events)
        res.status(200).json(events);
    }catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }
})
/**
 * @swagger
 * /Events:
 *  post:
 *      summary: Add an Event.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 *      responses:
 *          200:
 *              description: The created event object.
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 *      
 */
eventRouter.post('/', async (req:Request, res: Response) => {
    const userInput= <EventInput>req.body;
    try{
        const user= await eventService.addEvent(userInput)
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({status:'error', errorMessage: error.message});
    }
})



/**
 * @swagger
 * /events/:
 *  get:
 *      summary: Get all events
 *      responses:
 *          200:
 *              description: Returns all events.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 */


eventRouter.get('/', async (req: Request, res:Response) => {
    try {
        const events=await eventService.getAllEvents();
        res.status(200).json(events);

    }catch(error) {
        res.status(500).json({status: 'error', errorMessage: error.message})
    }

})

/**
 * @swagger
 * /events/{id}:
 *  delete:
 *      summary: Delete an event by ID
 *      responses:
 *          200:
 *              description: Delete an event. If the ID does not exist, an error is returned.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Event ID
 *         required: true
 *      
 */
eventRouter.delete('/:id', async (req:Request, res: Response) => {
    const eventInput=req.params.id;
    try{
        const event= await eventService.deleteEvent(parseInt(eventInput))
        res.status(200).json(event);
    } catch(error){
        res.status(500).json({status:'error', errorMessage: error.message});
    }
})
/**
 * @swagger
 * /events:
 *  put:
 *      summary: Update an event.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 *      responses:
 *          200:
 *              description: The updated Event object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
eventRouter.put('/', async (req:Request, res: Response) => {
    const eventInput= <EventInput>req.body;
    try{
        const user= await eventService.UpdateEvent({eventid:eventInput.eventid,name:eventInput.name,address: eventInput.address,date:eventInput.date,duration: eventInput.duration,description: eventInput.description,maxUsers:eventInput.maxUsers, users: eventInput.users});
        console.log(user)
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({status:'error', errorMessage: error.message});
    }
})
