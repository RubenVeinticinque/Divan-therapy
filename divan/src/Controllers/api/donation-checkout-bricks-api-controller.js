const mercadopago = require("mercadopago");
const db = require("../../database/models");

require("dotenv").config();

module.exports = {
  donationProcess: async (req, res) => {
    const body = req.body;
    let extReference;

    try {
      const donation = await db.Donations.findAll().catch((error) => {
        console.log(error);
      });

      if (donation.length > 0) {
        const donationId = donation.reduce((acc, value) => {
          return acc > value.dataValues.id ? acc : value.dataValues.id;
        });

        extReference = `${donationId + 1}`;
      }

      mercadopago.configurations.setAccessToken(
        process.env.TEST_ACCESS_TOKEN_DON
      );

      const payment_data = {
        token: body.token,
        transaction_amount: body.transaction_amount,
        description: "Donation payment",
        payment_method_id: body.payment_method_id,
        installments: body.installments,
        external_reference: extReference ? extReference : "1",
        payer: {
          email: body.payer.email,
          first_name: "Test",
          last_name: "User",
          identification: {
            type: body.payer.identification.type,
            number: body.payer.identification.number,
          },
        },
      };

      const response = await mercadopago.payment
        .save(payment_data)
        .catch(function (error) {
          console.error(error);
        });

      const { status, status_detail, id } = response.body;

      res.status(response.status).json({ status, status_detail, id });
    } catch (error) {
      console.log(error);
    }
  },
};
