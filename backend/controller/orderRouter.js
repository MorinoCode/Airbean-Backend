import express from "express";
import orderMiddleware from "../middlewares/orderMiddleware.js";
import orderStatusMiddleware from "../middlewares/orderStatusMiddleware.js";
import orderHistoryMiddleware from "../middlewares/orderHistoryMiddleware.js";
import isUserLoginMiddleware from "../middlewares/isUserLoginMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/order:
 *   post:
 *     summary: Skapar en ny order
 *     description: Lägger till en ny order i databasen.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Espresso", "Latte"]
 *               date:
 *                 type: string
 *                 example: "2025-04-02T10:00:00.000Z"
 *               totalPrice:
 *                 type: number
 *                 example: 78
 *               user:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Order skapad
 *       400:
 *         description: Felaktig inmatning
 *       401:
 *         description: Ej auktoriserad
 */


router.post("/",isUserLoginMiddleware, orderMiddleware);

/**
 * @swagger
 * /api/order/status:
 *   get:
 *     summary: Hämtar status för en order
 *     description: Hämtar orderstatus baserat på orderId.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order-ID som ska hämtas
 *     responses:
 *       200:
 *         description: Orderstatus hämtad
 *       400:
 *         description: Ogiltig förfrågan eller order hittades inte
 *       401:
 *         description: Ej auktoriserad
 */


router.get("/status",isUserLoginMiddleware, orderStatusMiddleware);

/**
 * @swagger
 * /api/order/orderHistory:
 *   get:
 *     summary: Hämtar orderhistorik för en användare
 *     description: Hämtar alla tidigare beställningar för en användare baserat på e-post.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userEmail
 *         required: true
 *         schema:
 *           type: string
 *         description: Användarens e-post
 *     responses:
 *       200:
 *         description: Orderhistorik hämtad
 *       400:
 *         description: Ingen historik hittades eller felaktig förfrågan
 *       401:
 *         description: Ej auktoriserad
 */

router.get("/orderHistory",isUserLoginMiddleware, orderHistoryMiddleware);

export default router;
