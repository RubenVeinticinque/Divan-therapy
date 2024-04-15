const db = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  therapistsSearchProccess: async (req, res) => {
    const body = req.body;
    const validationsErrors = validationResult(req);

    try {
      if (!validationsErrors.isEmpty()) {
        const response = {
          meta: {
            status: 200,
            total: validationsErrors.errors.length,
            url: req.originalUrl,
          },
          data: validationsErrors.mapped(),
        };

        return res.json(response);
      } else {
        const therapistDb = await db.Therapists.findByPk(body.search).catch(
          (error) => {
            console.log(error);
          }
        );
        if (therapistDb) {
          const countryDB = await db.Countries.findByPk(
            therapistDb.dataValues.id_country
          ).catch((error) => {
            console.log(error);
          });
          const provinceDB = await db.Provinces.findByPk(
            therapistDb.dataValues.id_province
          ).catch((error) => {
            console.log(error);
          });
          const cityDB = await db.Cities.findByPk(
            therapistDb.dataValues.id_city
          ).catch((error) => {
            console.log(error);
          });
          const zoneDB = await db.Zones.findByPk(
            therapistDb.dataValues.id_zone
          ).catch((error) => {
            console.log(error);
          });
          const establishmentDB = await db.Establishments.findByPk(
            therapistDb.dataValues.id_name_est
          ).catch((error) => {
            console.log(error);
          });
          const genderDB = await db.Genders.findByPk(
            therapistDb.dataValues.id_name_gender
          ).catch((error) => {
            console.log(error);
          });
          const priceDB = await db.Prices.findByPk(
            therapistDb.dataValues.id_price
          ).catch((error) => {
            console.log(error);
          });
          const sessionHourDB = await db.Session_hours.findByPk(
            therapistDb.dataValues.id_session_hours
          ).catch((error) => {
            console.log(error);
          });

          const newTherapist = {
            id: therapistDb.dataValues.id,
            name: therapistDb.dataValues.name,
            lastname: therapistDb.dataValues.lastname,
            email: therapistDb.dataValues.email,
            birthdate: therapistDb.dataValues.birthdate,
            avatar: therapistDb.dataValues.avatar,
            speciality: therapistDb.dataValues.speciality,
            type_therapist: therapistDb.dataValues.type_therapist,
            total_sessions: therapistDb.dataValues.total_sessions,
            phone: therapistDb.dataValues.phone,
            medical_registration: therapistDb.dataValues.medical_registration,
            countries: countryDB.dataValues.name_country,
            provinces: provinceDB.dataValues.name_province,
            cities: cityDB.dataValues.name_city,
            zone: zoneDB.dataValues.name_zone,
            establishment: establishmentDB.dataValues.name_establishment,
            gender: genderDB.dataValues.name_gender,
            price: priceDB.dataValues.price,
            session_hours: sessionHourDB.dataValues.session_hours,
          };
          const response = {
            meta: {
              status: 200,
              total: 1,
              url: req.originalUrl,
            },
            data: newTherapist,
          };

          return res.json(response);
        } else {
          const response = {
            meta: {
              status: 200,
              total: 0,
              url: req.originalUrl,
            },
            data: "Therapist not found",
          };

          return res.json(response);
        }
      }
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: validationsErrors.errors.length,
          url: req.originalUrl,
        },
        data: "Error in operation",
      };

      return res.json(response);
    }
  },
};
