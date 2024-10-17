import express from "express";

import {
  deleteFile,
  login,
  profile,
  readFile,
  register,
  update,
  uploadFile,
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").post(isAuthenticated, update);
router.route("/profile").get(isAuthenticated, profile);
router
  .route("/upload")
  .post(isAuthenticated, upload.single("file"), uploadFile);
router.route("/read/:filename").get(isAuthenticated, readFile);
router.route("/delete/:filename").delete(isAuthenticated, deleteFile);

export default router;
