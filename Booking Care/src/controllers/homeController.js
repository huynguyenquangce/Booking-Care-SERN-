import db from "../models";
import CRUDServices from "../services/CRUDServices";
let getHomePage = async (req, res) => {
  try {
    let data = await db.Users.findAll();
    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

// K render ra view, chức năng là truyền data sang Services bằng phương thức post được sử dụng trong Route
let postCRUD = async (req, res) => {
  let message = await CRUDServices.createNewUser(req.body);
  return res.send("Create User");
};

let displayCRUD = async (req, res) => {
  let data = await CRUDServices.getAllUser();
  return res.render("display-crud.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id; // get id from URL
  if (userId) {
    let userEditData = await CRUDServices.getUserInfoById(userId);
    return res.render("edit-crud.ejs", {
      userEditData: userEditData,
    });
  } else {
    return res.send("User not found");
  }
  // return res.send("Hello");
};

let getPutCRUD = async (req, res) => {
  let data = req.body;
  let updateUserData = await CRUDServices.updateUser(data);
  res.send("Update done!");
};

let deleteCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userDelete = await CRUDServices.deleteUserById(userId);
    return res.send(userDelete);
  } else {
    return res.send("User not found");
  }
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayCRUD: displayCRUD,
  getEditCRUD: getEditCRUD,
  getPutCRUD: getPutCRUD,
  deleteCRUD: deleteCRUD,
};
