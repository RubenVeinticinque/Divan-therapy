const db = require("../../database/models");

module.exports = {
  profile: async (req, res) => {
    let isAdmin = false;
    let isTherapist = false;
    const admin = "@divantherapy.com";
    const body = req.body;

    try {
      const userDb = await db.Users.findAll({
        where: { email: body.userEmail },
      });
      const therapistDb = await db.Therapists.findAll({
        where: { email: body.userEmail },
      });

      if (userDb[0]) {
        const user = {
          id: userDb[0].id,
          name: userDb[0].name,
          lastname: userDb[0].lastname,
          userEmail: userDb[0].email,
          avatar: `http://localhost:3001/img/users/${userDb[0].avatar}`,
          admin: isAdmin,
        };
        if (userDb[0].email.endsWith(admin)) {
          isAdmin = true;

          const response = {
            meta: {
              status: 200,
              url: req.originalUrl,
            },
            data: { ...user, admin: isAdmin },
          };
          return res.json(response);
        }
        if (therapistDb[0]) {
          if (userDb[0].email === therapistDb[0].email) {
            isTherapist = true;

            const response = {
              meta: {
                status: 200,
                url: req.originalUrl,
              },
              data: { ...user, admin: isAdmin, isTherapist },
            };
            return res.json(response);
          }
        } else {
          const response = {
            meta: {
              status: 200,
              url: req.originalUrl,
            },
            data: { ...user, admin: isAdmin },
          };
          return res.json(response);
        }
      } else {
        const response = {
          meta: {
            status: 200,
            url: req.originalUrl,
          },
          data: "User not found",
        };
        return res.json(response);
      }
    } catch (error) {
      console.log(error);

      const response = {
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: "Error user not found",
      };
      return res.json(response);
    }
  },
};
