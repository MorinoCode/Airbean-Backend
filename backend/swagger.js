import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AIRBEAN API",
      version: "1.0.0",
      description: "En enkel API-dokumentation med Swagger",
    },
  },
  apis: ["./routes/*.js"], 
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
