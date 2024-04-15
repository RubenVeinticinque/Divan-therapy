const db = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  therapistUpdate: async (req, res) => {
    let countryCreate;
    let provinceCreate;
    let cityCreate;
    let zoneCreate;
    let establishmentCreate;

    const body = req.body;
    const file = req.file;
    const validationsErrors = validationResult(req);

    try {
      const day = (body.birthdate.getDate() + 1).toString();
      const month = (body.birthdate.getMonth() + 1).toString();
      const year = body.birthdate.getFullYear().toString();

      const newDay = day.length <= 1 ? "0" + day : day;
      const newmonth = month.length <= 1 ? "0" + month : month;

      const newBody = {
        ...body,
        birthdate: year + "-" + newmonth + "-" + newDay,
      };

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
        const therapistDb = await db.Therapists.findByPk(body.id).catch(
          (error) => {
            console.log(error);
          }
        );

        const countryDb = await db.Countries.findAll({
          where: { name_country: body.countries },
        }).catch((error) => {
          console.log(error);
        });
        if (countryDb == "") {
          countryCreate = await db.Countries.create({
            name_country: body.countries,
          }).catch((error) => {
            console.log(error);
          });
        }

        const provinceDb = await db.Provinces.findAll({
          where: { name_province: body.provinces },
        }).catch((error) => {
          console.log(error);
        });
        if (provinceDb == "") {
          provinceCreate = await db.Provinces.create({
            name_province: body.provinces,
            id_name_country: countryCreate
              ? countryCreate.dataValues.id
              : countryDb[0].dataValues.id,
          }).catch((error) => {
            console.log(error);
          });
        }
        const cityDb = await db.Cities.findAll({
          where: { name_city: body.cities },
        }).catch((error) => {
          console.log(error);
        });
        if (cityDb == "") {
          cityCreate = await db.Cities.create({
            name_city: body.cities,
            id_name_province: provinceCreate
              ? provinceCreate.dataValues.id
              : provinceDb[0].dataValues.id,
          }).catch((error) => {
            console.log(error);
          });
        }
        const zoneDb = await db.Zones.findAll({
          where: { name_zone: body.zone },
        }).catch((error) => {
          console.log(error);
        });
        if (zoneDb == "") {
          zoneCreate = await db.Zones.create({
            name_zone: body.zone,
            id_name_city: cityCreate
              ? cityCreate.dataValues.id
              : cityDb[0].dataValues.id,
          }).catch((error) => {
            console.log(error);
          });
        }
        const establishmentDb = await db.Establishments.findAll({
          where: { name_establishment: body.establishment },
        }).catch((error) => {
          console.log(error);
        });
        if (establishmentDb == "") {
          establishmentCreate = await db.Establishments.create({
            name_establishment: body.establishment,
          }).catch((error) => {
            console.log(error);
          });
        }
        const genderDb = await db.Genders.findAll({
          where: { name_gender: body.gender },
        }).catch((error) => {
          console.log(error);
        });

        const priceDb = await db.Prices.findByPk(1).catch((error) => {
          console.log(error);
        });
        const sessionHourDb = await db.Session_hours.findByPk(1).catch(
          (error) => {
            console.log(error);
          }
        );

        const day = (body.birthdate.getDate() + 1).toString();
        const month = (body.birthdate.getMonth() + 1).toString();
        const year = body.birthdate.getFullYear().toString();

        const newDay = day.length <= 1 ? "0" + day : day;
        const newmonth = month.length <= 1 ? "0" + month : month;

        body.birthdate = year + "-" + newmonth + "-" + newDay;

        const therapistEmailDb = await db.Therapists.findAll().catch(
          (error) => {
            console.log(error);
          }
        );

        for (const i of therapistEmailDb) {
          if (body.email === i.email && Number(body.id) !== i.id) {
            const response = {
              meta: {
                status: 200,
                total: 1,
                url: req.originalUrl,
              },
              data: {
                email: {
                  msg: "Este mail esta registrado",
                },
              },
            };

            return res.json(response);
          }
          if (
            i.medical_registration === body.medical_registration &&
            i.id !== Number(body.id)
          ) {
            const response = {
              meta: {
                status: 200,
                total: 1,
                url: req.originalUrl,
              },
              data: {
                medical_registration: {
                  msg: "Esta matrícula esta registrada",
                },
              },
            };

            return res.json(response);
          }
        }

        if (Number(body.price) !== priceDb.dataValues.price) {
          const response = {
            meta: {
              status: 200,
              total: 1,
              url: req.originalUrl,
            },
            data: {
              price: {
                msg: "Valor no modificable",
              },
            },
          };

          return res.json(response);
        }
        if (body.session_hours !== sessionHourDb.dataValues.session_hours) {
          const response = {
            meta: {
              status: 200,
              total: 1,
              url: req.originalUrl,
            },
            data: {
              session_hours: {
                msg: "Valor no modificable",
              },
            },
          };

          return res.json(response);
        }

        const newTherapist = {
          name: body.name,
          lastname: body.lastname,
          email: body.email,
          birthdate: body.birthdate,
          avatar: file ? file.filename : therapistDb.dataValues.avatar,
          speciality: body.speciality,
          type_therapist: body.type_therapist,
          total_sessions: Number(body.total_sessions),
          phone: body.phone,
          medical_registration: body.medical_registration,
          id_country: countryCreate
            ? countryCreate.dataValues.id
            : countryDb[0].dataValues.id,
          id_province: provinceCreate
            ? provinceCreate.dataValues.id
            : provinceDb[0].dataValues.id,
          id_city: cityCreate
            ? cityCreate.dataValues.id
            : cityDb[0].dataValues.id,
          id_zone: zoneCreate
            ? zoneCreate.dataValues.id
            : zoneDb[0].dataValues.id,
          id_name_est: establishmentCreate
            ? establishmentCreate.dataValues.id
            : establishmentDb[0].dataValues.id,
          id_name_gender: genderDb[0].dataValues.id,
          id_price: priceDb.dataValues.id,
          id_session_hours: sessionHourDb.dataValues.id,
        };

        const therapistUpdate = await db.Therapists.update(
          { ...newTherapist },
          { where: { id: body.id } }
        ).catch((error) => {
          console.log(error);
        });

        const response = {
          meta: {
            status: 200,
            total: 1,
            url: req.originalUrl,
          },
          data: "Therapist update",
        };

        return res.json(response);
      }
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: 1,
          url: req.originalUrl,
        },
        data: "Error in operation",
      };

      return res.json(response);
    }
  },
};
