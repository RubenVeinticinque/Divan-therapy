const { extname, join } = require("path");
const { Router } = require("express");
const multer = require("multer");
const {
  therapistUpdate,
} = require("../../../Controllers/api/form-therapist-edit-api-controller");
const {
  validateTherapistEdit,
  validateTherapistFile,
} = require("../../../middleware/validate-form-therapist-edit-middleware");

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../../../public/img/therapists"));
  },
  filename: (req, file, cb) => {
    const newFilename = "therapist-" + Date.now() + extname(file.originalname);
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
  "/api/form-therapist-edit",
  uploadFile.single("avatar"),
  validateTherapistFile,
  validateTherapistEdit,
  therapistUpdate
);

module.exports = router;
