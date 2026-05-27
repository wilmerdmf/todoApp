const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo App API",
      version: "1.0.0",
      description: "REST API for ToDoApp — built with Node.js, Express and MongoDB",
      contact: {
        name: "Wilmer Medina",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "64a1f2c3b4d5e6f7a8b9c0d1" },
            name: { type: "string", example: "Wilmer Medina" },
            email: { type: "string", format: "email", example: "wilmer@example.com" },
          },
        },
        Project: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64a1f2c3b4d5e6f7a8b9c0d1" },
            name: { type: "string", example: "My Project" },
            user: { type: "string", example: "64a1f2c3b4d5e6f7a8b9c0d1" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Card: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64a1f2c3b4d5e6f7a8b9c0d1" },
            title: { type: "string", example: "Fix login bug" },
            description: { type: "string", example: "The login form is not validating email" },
            priority: { type: "string", enum: ["low", "medium", "high"], example: "high" },
            dueDate: { type: "string", format: "date-time" },
            project: { type: "string", example: "64a1f2c3b4d5e6f7a8b9c0d1" },
            user: { type: "string", example: "64a1f2c3b4d5e6f7a8b9c0d1" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Something went wrong" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
