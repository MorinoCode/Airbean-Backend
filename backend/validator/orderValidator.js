import Validator from "fastest-validator";

const v = new Validator();
const schema = {
  date: {
    type: "string",
    required: true,
    messages: {
      required: "datum är obligatorisk",
      dateEmpty: "datum fältet är tomt",
      date: "datum är inte giltigt",
    },
  },
  order: {
    type: "array",
    required: true,
    messages: {
      required: "order är obligatorisk",
    },
  },
  totalPrice: {
    type: "number",
    required: true,
    messages: {
      required: "TotalPris är obligatorisk",
    },
  },
  user: {
    type: "string",
    required: true,
    messages: {
      required: "User är obligatorisk",
    },
},
};

const validate = v.compile(schema);

// skickar bara dem error meddelande som behövs
const validatAndSanitizeOrder = (data) => {
  const result = validate(data);
  if (result !== true) {
    const sanitizedErrors = result.map((error) => {
      const { expected, actual, type, field, ...rest } = error;
      return rest;
    });
    return sanitizedErrors;
  } else {
    return true;
  }
};
export default validatAndSanitizeOrder;
