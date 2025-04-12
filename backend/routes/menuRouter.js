import express from "express";
import menuMiddleware from "../middlewares/menuMiddleware.js";

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Hämtar hela kaffemenyn
 *     description: Returnerar en lista med alla kaffedrycker från databasen.
 *     responses:
 *       200:
 *         description: Lyckad hämtning av menyn
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: object
 *                     properties:
 *                       $oid:
 *                         type: string
 *                         example: "67ebf10693f330d547a5faca"
 *                   title:
 *                     type: string
 *                     example: "Bryggkaffe"
 *                   desc:
 *                     type: string
 *                     example: "Bryggd på månadens bönor."
 *                   price:
 *                     type: number
 *                     example: 39
 *       500:
 *         description: Serverfel
 */

const router = express.Router();

router.get("/", menuMiddleware);

export default router;
