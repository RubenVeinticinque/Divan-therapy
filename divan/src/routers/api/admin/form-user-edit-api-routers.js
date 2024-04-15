const { extname, join } = require("path");
const { Router } = require("express");
const multer = require("multer");
const {
  userUpdate,
} = require("../../../Controllers/api/form-user-edit-api-controller");
const {
  validateUserEdit,
  validateUserEditFile,
} = require("../../../middleware/validate-user-edit-middleware");
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../../../../public/img/users"));
  },
  filename: (req, file, cb) => {
    const newFilename = "user-" + Date.now() + extname(file.originalname);
    cb(null, newFilename);
  },
});
//Filefilter para que no suba el archivo si tiene extención incorrecta.
const uploadFile = multer({
  storage,
  async fileFilter(req, file, cb) {
    const body = req.body;
    let extencionesAceptadas = [".jpg", ".png", ".gif"];
    let fileExtension = extname(file.originalname);

    if (!extencionesAceptadas.includes(fileExtension)) {
      req.validationFileRegisterError = "Las extensiones son .jpg, .png, .gif";
      return cb(null, false);
    }
    return cb(null, true);
  },
});

router.put(
  "/api/form-user-edit",
  uploadFile.single("avatar"),
  validateUserEditFile,
  validateUserEdit,
  userUpdate
);

module.exports = router;
