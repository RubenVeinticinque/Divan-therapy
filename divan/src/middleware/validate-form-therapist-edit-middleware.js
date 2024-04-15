const { extname } = require("path");
const { body } = require("express-validator");

const validateTherapistEdit = [
  body("name")
    .notEmpty()
    .trim()
    .withMessage("Debes escribir un nombre")
    .isString()
    .matches("^(?=.*[a-zA-Z'`üäëïöÄËÏÖÜ])")
    .withMessage("Debes ingresar caracteres alfabéticos"),
  body("lastname")
    .notEmpty()
    .trim()
    .withMessage("Debes escribir un apellido")
    .isString()
    .matches("^(?=.*[a-zA-Z'`üäëïöÄËÏÖÜ])")
    .withMessage("Debes ingresar caracteres alfabéticos"),
  body("email")
    .notEmpty()
    .trim()
    .withMessage("Debes escribir un email")
    .bail()
    .isEmail()
    .withMessage("Debes escribir un correo válido"),
  body("birthdate")
    .notEmpty()
    .withMessage("Debes seleccionar una fecha")
    .trim()
    .toDate()
    .withMessage("La fecha no es un valor válido")
    .bail(),
  body("speciality")
    .notEmpty()
    .trim()
    .withMessage("Debes ingresar una especialidad")
    .isString()
    .withMessage("Debes ingresar caracteres alfabéticos")
    .bail()
    .matches("^(?=.*[a-zA-Z'`üäëïöÄËÏÖÜ])")
    .withMessage("Ingresa mayúsculas, minúsculas"),
  body("type_therapist")
    .notEmpty()
    .trim()
    .withMessage("Debes ingresar el tipo de terapeuta")
    .isString()
    .withMessage("Debes ingresar caracteres alfabéticos")
    .bail()
    .matches("^(?=.*[a-zA-Z'`üäëïöÄËÏÖÜ])")
    .withMessage("Ingresa mayúsculas, minúsculas"),
  body("total_sessions")
    .notEmpty()
    .trim()
    .withMessage("Ingresa la cantidad de sesiones")
    .bail()
    .isInt()
    .withMessage("Debes ingresar caracteres numéricos"),
  body("phone")
    .notEmpty()
    .trim()
    .withMessage("Debes escribir un teléfono")
    .isInt()
    .withMessage("Debes ingresar números")
    .bail()
    .isLength({ min: 13 })
    .withMessage("Debe contener 13 caracteres"),
  body("medical_registration")
    .notEmpty()
    .trim()
    .withMessage("Debes ingresar tu matrícula")
    .isInt()
    .withMessage("Debes ingresar sólo números")
    .bail(),
  body("countries")
    .notEmpty()
    .trim()
    .custom(async (value) => {
      if (value === "Seleccione el país") {
        throw new Error("Debes elegir una opción");
      }
    })
    .bail(),
  body("provinces")
    .notEmpty()
    .trim()
    .custom(async (value) => {
      if (value === "Seleccione la provincia") {
        throw new Error("Debes elegir una opción");
      }
    })
    .bail(),
  body("cities")
    .notEmpty()
    .trim()
    .custom(async (value) => {
      if (value === "Seleccione la ciudad") {
        throw new Error("Debes elegir una opción");
      }
    })
    .bail(),
  body("zone")
    .notEmpty()
    .trim()
    .withMessage("Debes ingresar tu barrio")
    .matches("^(?=.*[a-zA-Z0-9°.])")
    .withMessage("Ingresa números, mayúsculas ó minúsculas"),
  body("establishment")
    .notEmpty()
    .trim()
    .withMessage("Ingresa la dirección donde atenderas")
    .matches("^(?=.*[a-zA-Z0-9.°'`üäëïöÄËÏÖÜ])")
    .withMessage("Ingresa números, mayúsculas ó minúsculas")
    .isLength({ min: 3 })
    .withMessage("Debe contener 3 caracteres"),
  body("gender")
    .notEmpty()
    .withMessage("Debes escribir tu genero")
    .trim()
    .bail()
    .exists()
    .isIn(["Femenino", "Masculino"])
    .withMessage("La hora no es un valor válido"),
  body("price")
    .notEmpty()
    .withMessage("Debes ingresar el valor de la sesión")
    .trim()
    .bail()
    .isInt()
    .withMessage("Debe ingresar caracteres numéricos")
    .exists()
    .withMessage("Honorarios no es un valor válido"),
  body("session_hours")
    .notEmpty()
    .withMessage("Ingresa la cantidad de minutos u horas")
    .trim()
    .bail()
    .isInt()
    .withMessage("Debe ingresar caracteres numéricos")
    .exists()
    .withMessage("La hora no es un valor válido"),
];
const validateTherapistFile = [
  body("avatar").custom((value, { req }) => {
    let file = req.file;
    let extencionesAceptadas = [".jpg", ".png", ".gif"];

    //Mensaje de error cuando rechaza la carga de file.
    if (req.validationFileError) {
      throw new Error(req.validationFileError);
    } else {
      if (!file) {
        return true;
      } else {
        let fileExtension = extname(file.originalname);
        if (!extencionesAceptadas.includes(fileExtension)) {
          throw new Error(
            `Las extensiones permitidas son ${extencionesAceptadas.join(", ")}`
          );
        }
      }
    }
    return true;
  }),
];

module.exports = { validateTherapistEdit, validateTherapistFile };
