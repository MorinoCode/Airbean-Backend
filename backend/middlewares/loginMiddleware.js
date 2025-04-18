import userModel from "../model/userModel.js";
import validatAndSanitize from "../validator/userValidator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validera användaren
    const isUserValid = await validatAndSanitize(req.body);

    // Om valideringen misslyckas, returnera fel
    if (isUserValid !== true) {
      return res.status(400).json(isUserValid);
    }

    // Kontrollera om användaren finns i databasen
    const foundedUser = await userModel.findOne({ email }, { __v: 0 });

    if (!foundedUser) {
      return res.status(400).json([{ message: "Email address är inte registrerad" }]);
    }

    // Jämför hashat lösenord med inskickat lösenord
    const comparePassword = await bcrypt.compare(password, foundedUser.password);

    if (!comparePassword) {
      return res.status(400).json([{ message: "Lösenord stämmer inte!" }]);
    }

    // Skapa en JWT-token för användaren
    const token = jwt.sign(
      { email: foundedUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "70m" }
    );

    res.status(200).json([{ message: `${foundedUser.email} loggade in`, user: foundedUser , token}]);
  } catch (err) {
    next(err);
  }
};

export default loginMiddleware;
