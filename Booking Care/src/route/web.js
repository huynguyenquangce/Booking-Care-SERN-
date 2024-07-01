import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
let router = express.Router();

let initWebRoutes = (app) => {
  // Test
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/display-crud", homeController.displayCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.getPutCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  // Booking Care
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-user", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/allcode", userController.getAllCode);
  router.get("/api/get-top-doctor", doctorController.handleGetTopDoctor);
  router.get(
    "/api/get-doctor-home-select",
    doctorController.handleGetDoctorSelect
  );
  return app.use("/", router);
};

module.exports = initWebRoutes;
