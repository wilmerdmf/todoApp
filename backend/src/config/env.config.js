const validateEnv = () => {
  const required = ["MONGODB_URI", "PORT", "JWT_SECRET", "JWT_REFRESH_SECRET", "FRONTEND_URL"];
  const missing = [];

  required.forEach((varName) => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
        "Please check your .env file and .env.example for reference.",
    );
  }

  console.log("✅ Environment variables validated successfully");
};

const getConfig = () => {
  return {
    mongodb: {
      uri: process.env.MONGODB_URI,
    },
    server: {
      port: process.env.PORT || 5000,
      env: process.env.NODE_ENV || "development",
    },
    cors: {
      origin: process.env.FRONTEND_URL,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    },
  };
};

module.exports = {
  validateEnv,
  getConfig,
};
