// Helmet for security headers
// -- Disable contentSecurityPolicy to avoid issues with Swagger UI assets
const helmetConfig = {
  contentSecurityPolicy: false,
};

export default helmetConfig;
