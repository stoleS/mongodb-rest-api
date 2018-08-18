const express = require("express");
//const router = express.Router();
const router = require("express-promise-router")();

const UsersController = require("../controlers/users");

const {
  validateParam,
  validateBody,
  schemas
} = require("../helpers/routeHelpers");

router
  .route("/")
  .get(UsersController.index)
  .post(validateBody(schemas.userSchema), UsersController.newUser);

router
  .route("/:userId")
  .get(validateParam(schemas.idSchema, "userId"), UsersController.getUser)
  .put(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userSchema)
    ],
    UsersController.replaceUser
  )
  .patch(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userSchemaPatch)
    ],
    UsersController.updateUser
  );

router
  .route("/:userId/cars")
  .get(validateParam(schemas.idSchema, "userId"), UsersController.getUserCars)
  .post(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userCarSchema)
    ],
    UsersController.addUserCars
  );

module.exports = router;
