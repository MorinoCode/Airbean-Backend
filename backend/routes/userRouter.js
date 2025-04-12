import express from 'express'
import signupMiddleware from '../middlewares/signupMiddleware.js'
import loginMiddleware from '../middlewares/loginMiddleware.js'
import forgotPasswordMiddleware from '../middlewares/forgotPasswordMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Registrera en ny användare
 *     description: Skapar ett nytt användarkonto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePassword123"
 *     responses:
 *       200:
 *         description: Användare skapad
 *       400:
 *         description: Felaktig inmatning eller användaren finns redan
 */

router.post('/signup' , signupMiddleware)

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Logga in en användare
 *     description: Autentiserar en användare och returnerar en JWT-token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePassword123"
 *     responses:
 *       200:
 *         description: Inloggning lyckades, token returneras
 *       400:
 *         description: Felaktigt lösenord eller användaren finns inte
 */

router.post('/login' , loginMiddleware)

/**
 * @swagger
 * /api/user/forgotPassword:
 *   post:
 *     summary: Återställ användarens lösenord
 *     description: Genererar ett nytt lösenord och uppdaterar databasen.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Nytt lösenord genererat och uppdaterat
 *       400:
 *         description: Användaren hittades inte
 */
router.post('/forgotPassword' , forgotPasswordMiddleware)



export default router