const db = require("../../database/models");
const { validationResult } = require("express-validator");

module.exports = {
  userSearchProccess: async (req, res) => {
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
        const userDb = await db.Users.findByPk(body.search).catch((error) => {
          console.log(error);
        });
        if (userDb) {
          const userCategoryDb = await db.Users_categories.findByPk(
            userDb.dataValues.id_user_category
          ).catch((error) => {
            console.log(error);
          });

          const newUser = {
            id: userDb.dataValues.id,
            name: userDb.dataValues.name,
            lastname: userDb.dataValues.lastname,
            email: userDb.dataValues.email,
            avatar: userDb.dataValues.avatar,
            password: userDb.dataValues.password,
            category: userCategoryDb.dataValues.type,
          };

          delete newUser.password;

          const response = {
            meta: {
              status: 200,
              total: 1,
              url: req.originalUrl,
            },
            data: newUser,
          };

          return res.json(response);
        } else {
          const response = {
            meta: {
              status: 200,
              total: 0,
              url: req.originalUrl,
            },
            data: "User not found",
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
