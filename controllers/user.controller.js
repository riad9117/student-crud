import User from "../models/user.model.js";
import fs from "fs";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, roll, email, phoneNo, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      roll,
      email,
      phoneNo,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found with this mail",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const tokenData = {
      userID: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Log in successful",
        user,
        success: true,
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const userID = req.id;
    let user = await User.findByIdAndUpdate(
      { _id: userID },
      {
        $set: {
          name: req.body.name,
          roll: req.body.roll,
          email: req.body.email,
          phoneNo: req.body.phoneNo,
        },
      },
      { new: true }
    );
    res.status(200).send(user);

    return res.status(200).json({
      message: "User updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const profile = async (req, res) => {
  try {
    const userID = req.id;
    let user = await User.findById(userID);

    return res.status(200).json({
      message: "User Found",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send("Error on file upload");
  }
  res.status(201).send("File uploaded successfully!");
};

export const readFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(404).send("File not found");
    }

    res.status(200).send(data); 
  });
};

export const deleteFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(404).send("File not found");
    }

    res.status(200).send("File deleted successfully!");
  });
}