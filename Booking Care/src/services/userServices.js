import { where } from "sequelize";
import db from "../models";
import bcrypt, { hash } from "bcrypt";
import { raw } from "body-parser";
const saltRounds = 10;
// OK : errorCode 0
// Email not exist in DB : errorCode 1
// Double check email false : errorCode 2
// Wrong password : errorCode 3
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check email is exist in DB
      let isExist = await checkUserEmail(email);
      // Respone data
      let userData = {};
      if (isExist) {
        // User already exists
        // Compare password
        let user = await db.Users.findOne({
          where: { email: email },
          // Condition to delete password in user (not showing when testing API)
          raw: true,
        });
        if (user) {
          let checkUser = await bcrypt.compareSync(password, user.password);
          // Case password and email matches
          if (checkUser) {
            userData.errCode = 0;
            userData.errorMessage = "OK";
            // Delete password when running test API (Postman)
            delete user.password;
            userData.user = user;
          }
          // Case password not matches
          else {
            userData.errCode = 3;
            userData.errorMessage = "Passwords do not match";
          }
        }
        // Double check user in DB
        else {
          // return error
          userData.errCode = 2;
          userData.errorMessage = "User's not found";
        }
      }
      // Case email not exist in DB
      else {
        // return error
        userData.errCode = 1;
        userData.errorMessage = "Email isn't exist. Please try again.";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

// Check user email in DB
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userid === "ALL") {
        users = await db.Users.findAll({
          // Except respone user's password when call API
          attributes: { exclude: ["password"] },
          // Condition not to get full db from USERS
          raw: true,
        });
      }
      if (userid && userid !== "ALL") {
        users = await db.Users.findOne({
          // Except respone user's password when call API
          attributes: { exclude: ["password"] },
          where: { id: userid },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkUserEmailValid = await checkUserEmail(data.email);
      if (checkUserEmailValid === true) {
        resolve({
          errCode: 1,
          errMessage: "Your email is valid, Try another email.",
        });
      } else {
        let hashPasswordFromBcrypt = await hashPassword(data.password);
        await db.Users.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          gender: data.gender === "1" ? true : false,
          phoneNumber: data.phoneNumber,
          positionId: data.role,
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Users.findOne({
        // Except respone user's password when call API
        where: { id: userId },
      });
      if (user) {
        // Cannot use because config global raw = true
        // await user.destroy();
        await db.Users.destroy({
          where: { id: userId },
        });
        resolve({
          errCode: 0,
          errMessage: "Delete user successfully",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "User not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getUserInfoById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      let users = db.Users.findOne({
        raw: "true", //
        where: { id: id },
      });
      if (users) {
        resolve(users);
      }
    } catch (error) {
      reject(error);
    }
  });
};
let updateUser = (data) => {
  // errCode 2: missing parameter
  // errCode 1: user not found in DB
  // errCode 0: OK
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required: ID parameter",
        });
      }
      let user = await db.Users.findOne({
        where: {
          id: data.id,
        },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
        user.address = data.address;
        await user.save();
        resolve({
          errCode: 0,
          errMessage: "Update User Success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = {};
        let res = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        data.errCode = 0;
        data.data = res;
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getAllCodeService: getAllCodeService,
};
