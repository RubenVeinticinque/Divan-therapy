const db = require("../../database/models");

module.exports = {
  userDestroyConfirm: async (req, res) => {
    const body = req.body;
    let yearNum;
    let monthNum;
    let dayNum;
    let hourNum;
    let turnPending = false;

    try {
      const date = new Date();

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hour = date.getHours();

      const medAppointmentDb = await db.Medical_appointments.findAll().catch(
        (error) => {
          console.log(error);
        }
      );

      for (let i = 0; i < medAppointmentDb.length; i++) {
        const date = medAppointmentDb[i].dataValues.date;
        const time = medAppointmentDb[i].dataValues.time;
        const dateNum = date.split("-");
        const timeNum = time.split(":");

        for (let x = 0; x < dateNum.length; x++) {
          if (x === 0) {
            yearNum = Number(dateNum[x]);
          } else if (x === 1) {
            monthNum = Number(dateNum[x]);
          } else {
            dayNum = Number(dateNum[x]);
          }
        }
        for (let n = 0; n < timeNum.length; n++) {
          if (n === 0) {
            hourNum = Number(timeNum[n]);
          }
        }
        if (
          yearNum >= year &&
          monthNum >= month &&
          dayNum >= day &&
          hourNum >= hour
        ) {
          turnPending = true;
        }
      }

      if (turnPending) {
        const response = {
          meta: {
            status: 200,
            url: req.originalUrl,
          },
          data: "Pending turn",
        };
        return res.json(response);
      } else {
        const response = {
          meta: {
            status: 200,
            url: req.originalUrl,
          },
          data: "User can be removed",
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
        data: "Error in operation",
      };
      return res.json(response);
    }
  },
  userDestroy: async (req, res) => {
    const body = req.body;

    try {
      const userDestroy = await db.Users.destroy({
        where: { id: body.id },
        force: true,
      }).catch((error) => {
        console.log(error);
      });

      const response = {
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: "Delete user",
      };
      return res.json(response);
    } catch (error) {
      console.log(error);
      const response = {
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: "Error in operation",
      };
      return res.json(response);
    }
  },
};
