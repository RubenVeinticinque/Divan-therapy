const { join, extname } = require("path");
const { Router } = require("express");
const multer = require("multer");
const {
  updateProfile,
} = require("../../Controllers/api/profile-edit-api-controller");
const {
  validateEditProfile,
  validateEditProfileFile,
} = require("../../middleware/validate-edit-profile-middleware");
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
//Filefilter para que no suba el archivo si tiene extensión incorrecta.
const uploadFile = multer({
  storage,
  async fileFilter(req, file, cb) {
    const body = req.body;

    let extencionesAceptadas = [".jpg", ".png", ".gif"];
    let fileExtension = extname(file.originalname);

    if (!extencionesAceptadas.includes(fileExtension)) {
      req.validationFileError = "Las extensiones son .jpg, .png, .gif";

      return cb(null, false);
    }
    return cb(null, true);
  },
});

router.put(
  "/api/profile-edit",
  uploadFile.single("avatar"),
  validateEditProfileFile,
  validateEditProfile,
  updateProfile
);

module.exports = router;
