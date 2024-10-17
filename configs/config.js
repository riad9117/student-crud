import dotenv from "dotenv";

dotenv.config();

const dev = {
  app: {
    port: process.env.PORT || 5000,
  },
  db: {
    url: process.env.DB_URL || "mongodb://localhost:27017/usersDemoDB",
  },
};

export default dev;
