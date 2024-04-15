const db = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  formTherapist: async (req, res) => {
    let dateUpdate = "";
    const body = req.body;
    const file = req.file;
    const validationsErrors = validationResult(req);

    try {
      const errors = Object.keys(validationsErrors.mapped());

      if (!validationsErrors.isEmpty()) {
        const response = {
          meta: {
            status: 200,
            total: errors.length,
            url: req.originalUrl,
          },
          data: validationsErrors.mapped(),
        };

        return res.json(response);
      } else {
        //Busco si el terapista esta en la DB.
        const therapistDb = await db.Therapists.findAll({
          where: { email: body.email },
        });
        //Proceso de tranformación a string de la fecha de nacimiento.
        const birthdate = JSON.stringify(body.birthdate);
        let newBirthdate = birthdate.split("T");
        //Recorro el string y guardo solo la fecha (YYYY-MM-DD).
        for (let i = 0; i < newBirthdate.length; i++) {
          for (let e = 0; e < newBirthdate[i].length; e++) {
            if (i < 1 && e > 0 && e <= 10) {
              dateUpdate += newBirthdate[i][e];
            }
          }
        }
        const bodyUpdate = { ...body, birthdate: dateUpdate };

        const therapistMedicalRegistrationDb = await db.Therapists.findAll({
          where: { medical_registration: body.medical_registration },
        }).catch((error) => {
          console.log(error);
        });

        if (therapistDb[0] !== undefined) {
          const response = {
            meta: {
              status: 200,
              total: 1,
              url: req.originalUrl,
            },
            data: {
              email: {
                msg: "Este email está registrado",
              },
            },
          };
          return res.json(response);
        } else if (therapistMedicalRegistrationDb[0] !== undefined) {
          const response = {
            meta: {
              status: 200,
              total: 1,
              url: req.originalUrl,
            },
            data: {
              medical_registration: {
                msg: "Esta matrícula está registrada",
              },
            },
          };
          return res.json(response);
        } else {
          let newCountry;
          let newProvince;
          let newCity;
          let newZone;
          let newEstablishment;

          //Busco el país en la DB su existencia.
          const countryDb = await db.Countries.findAll({
            where: { name_country: body.countries },
          }).catch((err) => {
            console.log(err);
          });
          //Busco la provincia en la DB su existencia.
          const provinceDb = await db.Provinces.findAll({
            where: { name_province: body.provinces },
          }).catch((err) => {
            console.log(err);
          });
          //Busco la ciudad en la DB su existencia.
          const cityDb = await db.Cities.findAll({
            where: { name_city: body.cities },
          }).catch((err) => {
            console.log(err);
          });
          //Busco la zona en la DB su existencia.
          const zoneDb = await db.Zones.findAll({
            where: { name_zone: body.zone },
          }).catch((err) => {
            console.log(err);
          });
          //Busco el establesimiento en la DB su existencia.
          const establishmentDb = await db.Establishments.findAll({
            where: { name_establishment: body.establishment },
          }).catch((err) => {
            console.log(err);
          });
          //Si el país no está en DB, lo creo.
          if (countryDb == "") {
            newCountry = await db.Countries.create({
              name_country: body.countries,
            }).catch((err) => {
              console.log(err);
            });
          }
          //Si la provincia no está en DB, la creo.
          if (provinceDb == "") {
            newProvince = await db.Provinces.create({
              name_province: body.provinces,
              id_name_country: newCountry
                ? newCountry.dataValues.id
                : countryDb[0].dataValues.id,
            }).catch((err) => {
              console.log(err);
            });
          }
          //Si la ciudad no está en DB, la creo.
          if (cityDb == "") {
            newCity = await db.Cities.create({
              name_city: body.cities,
              id_name_province: newProvince
                ? newProvince.dataValues.id
                : provinceDb[0].dataValues.id,
            }).catch((err) => {
              console.log(err);
            });
          }
          //Si el barrio no está en DB, la creo.
          if (zoneDb == "") {
            newZone = await db.Zones.create({
              name_zone: body.zone,
              id_name_city: newCity
                ? newCity.dataValues.id
                : cityDb[0].dataValues.id,
            }).catch((err) => {
              console.log(err);
            });
          }
          //Si la dirección de atención no esta en DB, la creo.
          if (establishmentDb == "") {
            newEstablishment = await db.Establishments.create({
              name_establishment: body.establishment,
            }).catch((err) => {
              console.log(err);
            });
          }
          //Obtengo los id de las regiones creado de DB.
          const idCountry =
            countryDb == ""
              ? newCountry.dataValues.id
              : countryDb[0].dataValues.id;
          const idProvince =
            provinceDb == ""
              ? newProvince.dataValues.id
              : provinceDb[0].dataValues.id;
          const idCity =
            cityDb == "" ? newCity.dataValues.id : cityDb[0].dataValues.id;
          const idZone =
            zoneDb == "" ? newZone.dataValues.id : zoneDb[0].dataValues.id;
          const idEstablishment =
            establishmentDb == ""
              ? newEstablishment.dataValues.id
              : establishmentDb[0].dataValues.id;
          const priceDb = await db.Prices.findAll().catch((error) => {
            console.log(error);
          });
          const sessioHoursDb = await db.Session_hours.findAll().catch(
            (error) => {
              console.log(error);
            }
          );
          const newTherapist = {
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            birthdate: dateUpdate,
            avatar: file.filename,
            speciality: body.speciality,
            type_therapist: body.type_therapist,
            total_sessions: 0,
            phone: body.phone,
            medical_registration: body.medical_registration,
            id_country: idCountry,
            id_province: idProvince,
            id_city: idCity,
            id_zone: idZone,
            id_name_est: idEstablishment,
            id_name_gender: body.gender === "Femenino" ? 1 : 2,
            id_price: priceDb[0].dataValues.id,
            id_session_hours: sessioHoursDb[0].dataValues.id,
          };
          //Ingreso el terapista a DB.
          const TherapistCreate = await db.Therapists.create({
            ...newTherapist,
          });
          const response = {
            meta: {
              status: 200,
              total: errors.length,
              url: req.originalUrl,
            },
            data: validationsErrors.mapped(),
          };

          return res.json(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
