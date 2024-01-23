import express from 'express';
import userController from '../controllers/userController';
const rootRouter = express.Router();
/**
 * @swagger
 * /api/user:
 *    get:
 *     summary: Returns user data.
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: userId of given user
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               message: 'OK!'
 *          
 */
rootRouter.get('/user', userController.user);
/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Add the user information.
 *     requestBody:
 *       description: User data for profile creation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information added successfully
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: User information added successfully
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Bad request - Invalid input data
 *       404:
 *         description: Not Found - Profile not found
 *         content:
 *           application/json:
 *             example:
 *               status: error
 *               message: Not Found - Profile not found
 */

rootRouter.post('/user', userController.insertuser);
export default rootRouter;