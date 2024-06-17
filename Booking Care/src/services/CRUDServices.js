import bcrypt, { hash } from "bcrypt";
import db from "../models";
import { raw } from "body-parser";
const saltRounds = 10;

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

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve("Inserted completed successfully");
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = () => {
  return new Promise((resolve, reject) => {
    try {
      let users = db.Users.findAll({
        raw: "true", // only return dataValue
      });
      resolve(users);
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

let updateUser = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Users.update(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      resolve("Update completed successfully");
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Users.destroy({
        where: {
          id: userId,
        },
      });
      resolve("Delete done");
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
};
