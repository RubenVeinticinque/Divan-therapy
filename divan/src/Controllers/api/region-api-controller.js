const db = require("../../database/models");

module.exports = {
  regions: async (req, res) => {
    try {
      // Adquiero de la DB las regiones.
      const countriesDb = await db.Countries.findAll().catch((error) => {
        console.log(error);
      });
      const provincesDb = await db.Provinces.findAll().catch((error) => {
        console.log(error);
      });
      const citiesDb = await db.Cities.findAll().catch((error) => {
        console.log(error);
      });
      const zonesDb = await db.Zones.findAll().catch((error) => {
        console.log(error);
      });
      const countContries = countriesDb.reduce((acc, value) =>
        acc > value.dataValues.id ? acc : value.dataValues.id
      );
      const countProvinces = provincesDb.reduce((acc, value) =>
        acc > value.dataValues.id ? acc : value.dataValues.id
      );
      const countCities = citiesDb.reduce((acc, value) =>
        acc > value.dataValues.id ? acc : value.dataValues.id
      );
      const countZones = zonesDb.reduce((acc, value) =>
        acc > value.dataValues.id ? acc : value.dataValues.id
      );

      const regions = {
        countriesDb,
        provincesDb,
        citiesDb,
        zonesDb,
      };

      const response = {
        meta: {
          status: 200,
          totalCountries: countContries,
          totalProvinces: countProvinces,
          totalCities: countCities,
          totalZones: countZones,
          url: req.originalUrl,
        },
        data: regions,
      };

      res.json(response);
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          totalCountries: 0,
          totalProvinces: 0,
          totalCities: 0,
          totalZones: 0,
          url: req.originalUrl,
        },
        data: "Error region",
      };

      res.json(response);
    }
  },
};
