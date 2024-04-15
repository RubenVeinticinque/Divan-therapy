const db = require("../../database/models");

module.exports = {
  donationCreate: async (req, res) => {
    const body = req.body;

    try {
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString();
      const day = date.getDate().toString();
      const hour = date.getHours().toString();
      const minute = date.getMinutes().toString();
      const second = date.getSeconds().toString();

      const newDay = day.length <= 1 ? "0" + day : day;
      const newMonth = month.length <= 1 ? "0" + month : month;
      const newHour = hour.length <= 1 ? "0" + hour : hour;
      const newMinute = minute.length <= 1 ? "0" + minute : minute;
      const newSecond = second.length <= 1 ? "0" + second : second;

      const newDonation = {
        date: `${year}-${newMonth}-${newDay}`,
        time: `${newHour}:${newMinute}:${newSecond}`,
        donation: body.donation,
        donor_email: body.donor_email,
      };

      const donationCreate = await db.Donations.create({
        ...newDonation,
      }).catch((error) => {
        console.log(error);
      });

      const donationUser = {
        id_user: body.id_user,
        id_donation: donationCreate.dataValues.id,
      };

      const usersDonationCreate = await db.Users_Donations.create({
        ...donationUser,
      }).catch((error) => {
        console.log(error);
      });
      const response = {
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: "Donation created",
      };

      return res.json(response);
    } catch (error) {
      console.log(error);
      const response = {
        meta: {
          status: 200,
          url: req.originalUrl,
        },
        data: "Error creating donation",
      };

      return res.json(response);
    }
  },
};
