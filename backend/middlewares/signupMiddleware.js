import userModel from "../model/userModel.js";
import validatAndSanitize from "../validator/userValidator.js";
import bcrypt from "bcrypt";

const signupMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //validera user
    const isUserValid = await validatAndSanitize(req.body);

    // om user valideras inte
    if (isUserValid !== true) {
      res.status(400).json(isUserValid);
    }

    //kontrollera om user redan finns i Db
    const isUserExist = await userModel.findOne({ email });

    // om user hittas
    if (isUserExist) {
      res.status(400).json([{ message: "User är redan registered" }]);
    }

    //innan vi skapa konto för user då hasha vi passwordet
    const hashedPassword = await bcrypt.hash(password, 10);

    //om user valideras och finnas inte i DB då skapar vi en ny dokument i DB for nya user
    const newUser = await userModel.create({ email, password: hashedPassword });
    res.status(200).json([{ message: "ny användaren skapade", newUser }]);
  } catch (err) {
    next(err);
  }
};

export default signupMiddleware;
