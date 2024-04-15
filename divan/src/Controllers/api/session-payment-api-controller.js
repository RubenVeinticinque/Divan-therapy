const mercadopago = require("mercadopago");
const db = require("../../database/models");

require("dotenv").config();

module.exports = {
  sessionPayment: async (req, res) => {
    const body = req.body;
    let extReference;

    try {
      const medAppointment = await db.Medical_appointments.findAll().catch(
        (error) => {
          console.log(error);
        }
      );

      if (medAppointment.length > 0) {
        const medAppointmentId = medAppointment.reduce((acc, value) => {
          return acc > value.dataValues.id ? acc : value.dataValues.id;
        });

        extReference = `${medAppointmentId + 1}`;
      }
      mercadopago.configurations.setAccessToken(process.env.TEST_ACCESS_TOKEN);
      const payment_data = {
        token: body.token,
        transaction_amount: body.transaction_amount,
        description: "Session payment",
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
