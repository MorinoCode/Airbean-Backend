import coffeeModel from "../model/coffeeModel.js";

const menuMiddleware = async (req, res, next) => {
  try {
    const menu = await coffeeModel.find({});
    res.status(200).send(menu);
  } catch (err) {
    next(err);
  }
};

export default menuMiddleware;
