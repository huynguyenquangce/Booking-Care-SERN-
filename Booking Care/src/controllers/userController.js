import userService from "../services/userServices";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  // Validate
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Invalid email or password!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errorMessage,
    user: userData.user ? userData.user : {},
  });
};

// Call API in userService
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; // ALL // Single
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
      // return one or all users
      user: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    // return one or all users
    user: users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  // missing ID: errCode = 1
  // OK: errCode = 0
  // User not found: errCode = 2
  let data = req.body;
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await userService.updateUser(data);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};
module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
};
