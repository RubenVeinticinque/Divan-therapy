const db = require("../../database/models");

module.exports = {
  therapistsSelected: async (req, res) => {
    const body = req.body;
    const allTherapists = [];
    let countTherapists = 0;

    try {
      const therapistSelectedDb = await db.Therapists.findAll({
        where: {
          id_country: body.country.id,
          id_province: body.province.id,
          id_city: body.city.id,
          id_zone: body.zone.id,
        },
      });
      if (therapistSelectedDb.length > 0) {
        for (const i of therapistSelectedDb) {
          countTherapists++;
        }

        for (const i of therapistSelectedDb) {
          const newTherapist = {
            id: i.dataValues.id,
            name: i.dataValues.name,
            lastname: i.dataValues.lastname,
            email: i.dataValues.email,
            avatar: `http://localhost:3001/img/therapists/${i.dataValues.avatar}`,
            speciality: i.dataValues.speciality,
            type_therapist: i.dataValues.type_therapist,
            total_sessions: i.dataValues.total_sessions,
          };
          allTherapists.push(newTherapist);
        }

        const response = {
          meta: {
            status: 200,
            total: countTherapists,
            url: req.originalUrl,
          },
          data: allTherapists,
        };

        res.json(response);
      } else {
        const response = {
          meta: {
            status: 200,
            total: 0,
            url: req.originalUrl,
          },
          data: allTherapists,
        };

        res.json(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
  therapistsSelectedErrors: (req, res) => {
    const body = req.body;
    let errors;

    if (body.country === "Seleccione el país") {
      errors = {
        countries: {
          msg: "Elige una opción del campo",
        },
      };
    } else if (body.province === "Seleccione la provincia") {
      errors = {
        provinces: {
          msg: "Elige una opción del campo",
        },
      };
    } else if (body.city === "Seleccione la ciudad") {
      errors = {
        cities: {
          msg: "Elige una opción del campo",
        },
      };
    } else if (body.zone === "Seleccione la zona") {
      errors = {
        zones: {
          msg: "Elige una opción del campo",
        },
      };
    }

    const response = {
      meta: {
        status: 200,
        total: 1,
        url: req.originalUrl,
      },
      data: errors,
    };

    res.json(response);
  },
};
