import coffeeModel from "../model/coffeeModel.js";
import orderModel from "../model/orderModel.js";
import validatAndSanitizeOrder from "../validator/orderValidator.js";



const orderMiddleware = async (req, res, next) => {
  try {
    const { order, date, totalPrice , user} = req.body;
    
    //validera order
    const isOrderValid = await validatAndSanitizeOrder(req.body);
    
    // Hämta alla kaffesorter från databasen
    const allCoffees = await coffeeModel.find();
    const allCoffeesTitle = allCoffees.map(coffee => coffee.title);

    //hämta alla kaffetitle från order
    const orderTitle = order.map(coffee => coffee.title);

    
    //kolla om alla kaffetitle finns i databasen  
    const isAllCoffeesExist = orderTitle.every(title => allCoffeesTitle.includes(title));
    //om inte alla kaffetitle finns i databasen så skickar vi felmeddelande 
    if (!isAllCoffeesExist) {
      return res.status(400).json([{ message: "En eller flera kaffesorter finns inte i menyn." }]);
    }

    // om order valideras inte
    if (isOrderValid !== true) {
      return res.status(400).json(isOrderValid);
    }
    // skapa leverans datum
    const timestamp = Date.now()+(15 * 60 * 1000)
    const readableDate = new Date(timestamp);
    const deliveryTime = readableDate.toLocaleString("sv-SE");
    
    
    //om order valideras då skapar vi en ny dokument i DB for nya order
    const newOrder = await orderModel.create({ order, date, totalPrice , deliveryTime, user });
    res.status(200).json([{ message: "Nytt order skapade", newOrder }]);
  } catch (err) {
    next(err);
  }
};

export default orderMiddleware;
