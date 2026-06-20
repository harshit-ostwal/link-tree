import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { API_VERSION } from "../shared/constants/api.constants.js";
import { APP_NAME } from "../shared/constants/app.constants.js";
import { BACKEND_URL } from "./env.config.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      contact: {
        name: "API Support",
        url: "https://www.example.com/support",
        email: "support@example.com",
      },
      title: `${APP_NAME} API Documentation`,
      version: "1.0.0",
      description: `API documentation for the ${APP_NAME} application`,
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      termsOfService: "https://www.example.com/terms",
    },
    basePath: `/api/${API_VERSION}`,
    consumes: ["application/json"],
    produces: ["application/json"],
    externalDocs: {
      description: "Find out more",
      url: "https://www.example.com/docs",
    },
    host: `${BACKEND_URL.replace(/^https?:\/\//, "")}`,
    schemes: ["http", "https"],
    tags: [
      {
        name: "System",
        description: "System routes",
      },
    ],
    servers: [
      {
        url: `${BACKEND_URL}/api/${API_VERSION}`,
        description: "Development server",
      },
    ],
  },
  apis: [
    "./src/routes/*.js",
    "./src/modules/**/*.route.js",
    "./src/modules/**/*.swagger.js",
  ],
};

const theme = {
  customFavIcon: "/favicon.ico",
  customSiteTitle: `${APP_NAME} API`,
  swaggerOptions: {
    layout: "BaseLayout",
    docExpansion: "none",
    persistAuthorization: false,
  },
  customCss: `
      .topbar { display: none !important; }
      body { background: #ffffff !important; }
      .swagger-ui { background: #ffffff !important; }
    `,
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi, theme };
