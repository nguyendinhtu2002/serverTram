const User = require("../models/UserModel");
const Joi = require("joi");
const { generateToken, refreshToken } = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const e = require("express");

const register = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Email không hợp lệ",
        "any.required": "Email is required",
      }),
    password: Joi.string()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password phải chứa chữ cái,số và 1 kí tự đặc biệt",
        "any.required": "Password is required",
      }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  try {
    const { email, password } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await User.create({
      email,
      password,
    });

    if (user) {
      return res.status(201).json({
        message: "Success!",
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userCheck = await User.findOne({ email });
    if (userCheck && (await userCheck.matchPassword(password))) {
      const access_token = await generateToken({
        id: userCheck._id,
      });

      const refresh_token = await refreshToken({
        id: userCheck._id,
      });
      return res.json({
        status: "OK",
        message: "SUCESS",
        access_token,
        refresh_token,
      });
    } else {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    next(error);
  }
};
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      if (!user.isAdmin) {
        return res.status(401).json({ error: "User not Admin" });
      }
      const access_token = await generateToken({
        id: user._id,
      });

      const refresh_token = await refreshToken({
        id: user._id,
      });
      return res.json({
        status: "OK",
        message: "SUCESS",
        access_token,
        refresh_token,
      });
    } else {
      return res.status(401).json({ error: "Invalid Usermame or Password" });
    }
  } catch (error) {
    next(error);
  }
};
const refreshTokenService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
          console.log("err", err);
          resolve({
            status: "ERR",
            message: "The authemtication",
          });
        }
        const access_token = await generateToken({
          id: user.id,
        });
        resolve({
          status: "OK",
          message: "SUCESS",
          access_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

const RefreshTokenController = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await refreshTokenService(token);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      message: e,
    });
  }
};

const updateAccount = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const userSchema = Joi.object({
    firstName: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    lastName: Joi.string().required(),
    passwordOld: Joi.string().allow(""),
    password: Joi.string().allow(""),
    isAdmin:Joi.boolean(),
  });

  const { error, value } = userSchema.validate(updateData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      if (updateData.password && updateData.passwordOld) {
        // Password change requested
        if (await user.matchPassword(updateData.passwordOld)) {
          user.firstName = updateData.firstName;
          user.lastName = updateData.lastName;
          user.password = updateData.password;
          user.isAdmin = updateData.isAdmin;
        } else {
          return res.status(400).json({
            status: "OK",
            message: "Mật khẩu cũ sai!",
          });
        }
      } else {
        // Only name update requested
        user.firstName = updateData.firstName;
        user.lastName = updateData.lastName;
        user.isAdmin = updateData.isAdmin
      }

      const updatedUser = await user.save();
      res.json({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } else {
      res.status(400).json({
        status: "ERROR",
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const updateAddress = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const addressSchema = Joi.object({
    phoneNumber: Joi.string()
      .pattern(/^[0-9]{10,12}$/)
      .required(),
    ward:Joi.string().required(),
    address: Joi.string().required(),
    district: Joi.string().required(),
    city: Joi.string().required(),
    code:Joi.array().items(Joi.string()).required(),
  });
  const { error } = addressSchema.validate(updateData);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const user = await User.findById(id);
    if (user) {
      user.address = [updateData];

      const updatedUser = await user.save();

      return res.status(200).json({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } else {
      return res.status(400).json({
        status: "ERROR",
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id);
    if (user) {
      res.json({
        status: "OK",
        message: "SUCESS",
        data: {
          _id: user._id,
          firstName: user.firstName,
          email: user.email,
          lastName: user.lastName,
          sex: user.sex,
          address: user.address,
          wishList: user.wishList,
          isAdmin: user.isAdmin,
        },
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  RefreshTokenController,
  updateAccount,
  updateAddress,
  getUserById,
  loginAdmin
};
