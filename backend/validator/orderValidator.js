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
      required: "totalPris är obligatorisk",
    },
  },
  user: {
    type: "string",
    required: true,
    messages: {
      required: "user är obligatorisk",
    },
},
};

const validate = v.compile(schema);
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
