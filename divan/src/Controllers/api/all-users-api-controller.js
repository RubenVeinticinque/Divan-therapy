const db = require("../../database/models");

module.exports = {
  allUsers: async (req, res) => {
    const users = [];
    const page = Number(req.query.page) || 0;
    const pageSize = req.query.pageSize ?? 10;

    try {
      const usersDb = await db.Users.findAndCountAll({
        limit: pageSize,
        offset: page * pageSize,
      });

      for (const i of usersDb.rows) {
        const categoryTemp = await db.Users_categories.findByPk(
          i.dataValues.id_user_category
        ).catch((error) => {
          console.log(error);
        });

        const newUser = {
          id: i.dataValues.id,
          name: i.dataValues.name,
          lastname: i.dataValues.lastname,
          email: i.dataValues.email,
          avatar: `http://localhost:3001/img/users/${i.dataValues.avatar}`,
          id_user_category: categoryTemp.dataValues.type,
        };
        users.push(newUser);
      }

      const response = {
        meta: {
          status: 200,
          total: usersDb.count,
          url: req.originalUrl,
          prevPage: page > 0,
          nextPage: (page + 1) * pageSize < usersDb.count,
        },
        data: users,
      };
      res.json(response);
    } catch (error) {
      console.log(error);
      const response = {
        meta: {
          status: 200,
          total: user.length,
          url: req.originalUrl,
        },
        data: "Error in operation",
      };
      return res.json(response);
    }
  },
};
