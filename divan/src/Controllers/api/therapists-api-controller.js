const db = require("../../database/models");

module.exports = {
  therapists: async (req, res) => {
    const allTherapists = [];
    let countTherapist = 0;

    try {
      const therapistsOfDb = await db.Therapists.findAll().catch((error) => {
        console.log(error);
      });
      if (therapistsOfDb.length > 0) {
        for (const i of therapistsOfDb) {
          countTherapist++;
        }

        for (const i of therapistsOfDb) {
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
            total: countTherapist,
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
  allMessages: async (req, res) => {
    let monthEs;
    let monthStr;
    let dayStr;
    let dayN;
    const allMessages = [];

    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const monthsEn = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Octuber",
      "November",
      "December",
    ];
    const weekDays = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];
    try {
      const messagesOfDb = await db.Messages.findAll({
        include: [{ association: "Users" }],
      }).catch((error) => {
        console.log(error);
      });
      if (messagesOfDb.length > 0) {
        const countMessages = messagesOfDb.reduce((acc, value) =>
          acc > value.id ? acc : value.id
        );

        messagesOfDb.forEach((message) => {
          const year = message.dataValues.date_message.slice(0, 4);
          const month = message.dataValues.date_message.slice(5, 7);
          const day = message.dataValues.date_message.slice(8);

          if (month[0] === "0") {
            monthStr = month.slice(1);
          } else {
            monthStr = month;
          }

          for (let z = 0; z < months.length; z++) {
            if (z == month) {
              monthEs = months[z - 1];
            }
          }

          if (day[0] === "0") {
            dayStr = day.slice(1);
          } else {
            dayStr = day;
          }

          for (let n = 0; n < monthsEn.length; n++) {
            if (n === Number(monthStr)) {
              monthStr = monthsEn[n - 1];
            }
          }

          //Obtengo la fecha del registro de Db.
          const date = new Date(`${monthStr} ${dayStr}, ${year}`);
          const dayNumber = date.getDay();

          //Obtengo el día de la semana según fecha de registro
          for (let m = 0; m < weekDays.length; m++) {
            if (dayNumber === m) {
              dayN = weekDays[m];
            }
          }

          const newMessage = {
            name: message.dataValues.Users.dataValues.name,
            lastname: message.dataValues.Users.dataValues.lastname,
            city: message.dataValues.city_message,
            country: message.dataValues.country_message,
            date: `${dayN}, ${day} de ${monthEs} ${year}`,
            description: message.dataValues.message,
          };
          allMessages.push(newMessage);
        });

        const response = {
          meta: {
            status: 200,
            total: countMessages,
            url: req.originalUrl,
          },
          data: allMessages,
        };

        res.json(response);
      } else {
        const response = {
          meta: {
            status: 200,
            total: 0,
            url: req.originalUrl,
          },
          data: allMessages,
        };

        res.json(response);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
