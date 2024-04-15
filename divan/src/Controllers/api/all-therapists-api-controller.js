const db = require("../../database/models");

module.exports = {
  allTherapists: async (req, res) => {
    const newTherapists = [];
    const page = Number(req.query.page) || 0;
    const pageSize = req.query.pageSize ?? 10;

    try {
      const therapistsDb = await db.Therapists.findAndCountAll({
        limit: pageSize,
        offset: page * pageSize,
      });
      if (therapistsDb !== "") {
        for (const i of therapistsDb.rows) {
          const countryTemp = await db.Countries.findByPk(
            i.dataValues.id_country
          ).catch((error) => {
            console.log(error);
          });
          const provinceTemp = await db.Provinces.findByPk(
            i.dataValues.id_province
          ).catch((error) => {
            console.log(error);
          });
          const cityTemp = await db.Cities.findByPk(i.dataValues.id_city).catch(
            (error) => {
              console.log(error);
            }
          );
          const zoneTemp = await db.Zones.findByPk(i.dataValues.id_zone).catch(
            (error) => {
              console.log(error);
            }
          );
          const addressTemp = await db.Establishments.findByPk(
            i.dataValues.id_name_est
          ).catch((error) => {
            console.log(error);
          });
          const genderTemp = await db.Genders.findByPk(
            i.dataValues.id_name_gender
          ).catch((error) => {
            console.log(error);
          });
          const priceTemp = await db.Prices.findByPk(
            i.dataValues.id_price
          ).catch((error) => {
            console.log(error);
          });
          const SessionHourTemp = await db.Session_hours.findByPk(
            i.dataValues.id_session_hours
          ).catch((error) => {
            console.log(error);
          });
          const therapist = {
            id: i.dataValues.id,
            name: i.dataValues.name,
            lastname: i.dataValues.lastname,
            email: i.dataValues.email,
            birthdate: i.dataValues.birthdate,
            avatar: `http://localhost:3001/img/therapists/${i.dataValues.avatar}`,
            speciality: i.dataValues.speciality,
            type_therapist: i.dataValues.type_therapist,
            total_sessions: i.dataValues.total_sessions,
            phone: i.dataValues.phone,
            medical_registration: i.dataValues.medical_registration,
            id_country: countryTemp.dataValues.name_country,
            id_province: provinceTemp.dataValues.name_province,
            id_city: cityTemp.dataValues.name_city,
            id_zone: zoneTemp.dataValues.name_zone,
            id_name_est: addressTemp.dataValues.name_establishment,
            id_name_gender: genderTemp.dataValues.name_gender,
            id_price: priceTemp.dataValues.price,
            id_session_hours: SessionHourTemp.dataValues.session_hours + " min",
          };
          newTherapists.push(therapist);
        }
      }

      const response = {
        meta: {
          status: 200,
          total: therapistsDb.count,
          url: req.originalUrl,
          prevPage: page > 0,
          nextPage: (page + 1) * pageSize < therapistsDb.count,
        },
        data: newTherapists,
      };
      res.json(response);
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: newTherapists.length,
          url: req.originalUrl,
        },
        data: "Error in operation",
      };

      return res.json(response);
    }
  },
};
