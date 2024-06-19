import { where } from "sequelize";
import db from "../models";
import bcrypt, { hash } from "bcrypt";
import { raw } from "body-parser";

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

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
};
