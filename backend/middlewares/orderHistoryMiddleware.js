import orderModel from "../model/orderModel.js";

const orderHistoryMiddleware = async (req, res, next) => {
  try {
    //orderId
    const { userEmail } = req.query;
    
    if (!userEmail) {
      return res.status(400).json([{ message: "userEmail är obligatorisk" }]);
    }

    //hitta orders i DB
    const orders = await orderModel.find({ user: userEmail });
    
    
    if (orders.length === 0) {
      return res.status(400).json([{ message: "Order hittades inte" }]);
    }

    res.status(200).json([{ message: "här är din order", orders }]);

  } catch (err) {
    next(err);
  }
};

export default orderHistoryMiddleware;
