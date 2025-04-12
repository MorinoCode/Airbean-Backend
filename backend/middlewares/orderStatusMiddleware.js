import orderModel from "../model/orderModel.js";

const orderStatusMiddleware = async (req, res, next) => {
  try {
    //orderId
    const { orderId } = req.query;
    if (!orderId) {
      return res.status(400).json([{ message: "orderId är obligatorisk" }]);
    }

    //hitta order i DB
    const order = await orderModel.findOne({ _id: orderId });
    
    if (!order) {
      return res.status(400).json([{ message: "Order hittades inte" }]);
    }

    res.status(200).json([{ message: "här är din order", order }]);

  } catch (err) {
    next(err);
  }
};

export default orderStatusMiddleware;
