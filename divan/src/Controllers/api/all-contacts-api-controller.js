const db = require("../../database/models");

module.exports = {
  allContacts: async (req, res) => {
    const contacts = [];
    const page = Number(req.query.page) || 0;
    const pageSize = req.query.pageSize ?? 10;

    try {
      const constactsDb = await db.Contacts.findAndCountAll({
        limit: pageSize,
        offset: page * pageSize,
      });

      for (const i of constactsDb.rows) {
        const newContact = {
          id: i.dataValues.id,
          name: i.dataValues.name,
          lastname: i.dataValues.lastname,
          email: i.dataValues.email,
          description: i.dataValues.description,
        };
        contacts.push(newContact);
      }

      const response = {
        meta: {
          status: 200,
          total: constactsDb.count,
          url: req.originalUrl,
          prevPage: page > 0,
          nextPage: (page + 1) * pageSize < constactsDb.count,
        },
        data: contacts,
      };
      res.json(response);
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          total: contacts.length,
          url: req.originalUrl,
        },
        data: "Error in operation",
      };
      return res.json(response);
    }
  },
};
