const { extname, join } = require("path");
const { Router } = require("express");
const multer = require("multer");
const {
  processRegister,
} = require("../../Controllers/api/register-api-controller");
const {
  validateUserRegister,
  validateRegisterFile,
} = require("../../middleware/validate-register-middleware");
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../../../public/img/users"));
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
    let extencionesAceptadas = [".jpg", ".png", ".gif"];
    let fileExtension = extname(file.originalname);

    if (!extencionesAceptadas.includes(fileExtension)) {
      req.validationFileRegisterError = "Las extensiones son .jpg, .png, .gif";
      return cb(null, false);
    }
    return cb(null, true);
  },
});

router.post(
  "/api/register",
  uploadFile.single("avatar"),
  validateRegisterFile,
  validateUserRegister,
  processRegister
);

module.exports = router;
