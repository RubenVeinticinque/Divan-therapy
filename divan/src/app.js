const { resolve, join } = require("path");
const express = require("express");
const cookies = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const cors = require("cors");

const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

require("./socket")(io);

const therapistsRouter = require("./routers/api/therapist-routers");
const pricesRouter = require("./routers/api/prices-api-routers");
const totalSessionsRouter = require("./routers/api/total-sessions-api-routers");
const medicalAppointmentsRouter = require("./routers/api/medical-appointments-api-router");
const sessionHoursRouter = require("./routers/api/session-hours-api-routers");
const addressTherapistRouter = require("./routers/api/address-therapist-api-routers");
const loginRouter = require("./routers/api/login-api-routers");
const registerRouter = require("./routers/api/register-api-routers");
const stateOfMindRouter = require("./routers/api/state-of-mind-api-routers");
const regionRouter = require("./routers/api/region-api-routers");
const therapistsSelectedRouter = require("./routers/api/therapists-selected-api-routers");
const contactRouter = require("./routers/api/contact-api-routers");
const userMessageRouter = require("./routers/api/users-messages-api-router");
const formTherapistsRouter = require("./routers/api/form-therapists-api-router");
const checkoutDonationRouter = require("./routers/api/donation-checkout-bricks-api-routers");
const donationCreateRouter = require("./routers/api/donation-create-api-routers");
const sessionPaymentRouter = require("./routers/api/session-payment-api-routers");
const createMedicalAppointmentRouter = require("./routers/api/create-medical-appointment-api-routers");
const videoCallRouter = require("./routers/api/video-call-api-routers");
const forgetPasswordRouter = require("./routers/api/forget-password-api-routers");
const newPasswordChangeRouter = require("./routers/api/new-password-change-api-routers");
const profileRouter = require("./routers/api/profile-api-routers");
const profileEditRouter = require("./routers/api/profile-edit-api-routers");
const deleteConfirmRouter = require("./routers/api/delete-confirm-api-routers");
const allTherapistsRouter = require("./routers/api/admin/all-therapists-api-routers");
const allUsersRouter = require("./routers/api/admin/all-users-api-routers");
const allShiftsRouter = require("./routers/api/admin/all-shifts-api-routers");
const allDonationsRouter = require("./routers/api/admin/all-donation-api-routers");
const allMoodsRouter = require("./routers/api/admin/all-moods-api-routers");
const allPricesRouter = require("./routers/api/admin/all-prices-api-routers");
const allSessionsHoursRouter = require("./routers/api/admin/all-sessions-hours-api-routers");
const allContactsRouter = require("./routers/api/admin/all-contacts-api-routers");
const therapistSearchRouter = require("./routers/api/admin/therapist-search-api-routers");
const therapistEditRouter = require("./routers/api/admin/form-therapist-edit-api-routers");
const therapistDestroyRouter = require("./routers/api/admin/therapist-destroy-api-routers");
const userSearchRouter = require("./routers/api/admin/user-search-api-routers");
const userEditRouter = require("./routers/api/admin/form-user-edit-api-routers");
const userDestroyRouter = require("./routers/api/admin/user-destroy-api-routers");
const priceSearchRouter = require("./routers/api/admin/price-search-api-routers");
const priceEditRouter = require("./routers/api/admin/price-edit-api-routers");
const sessionsHoursSearchRouter = require("./routers/api/admin/sessions-hours-search-api-routers");
const sessionsHoursEditRouter = require("./routers/api/admin/sessions-hours-edit-api-routers");
const therapistShiftsRouter = require("./routers/api/therapist-shifts-api-routers");

app.set("view engine", "ejs");
app.set("views", resolve(__dirname, "../src/views"));

const whiteList = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://referential.p.rapidapi.com",
];

app.use(express.static(join(__dirname, "../public")));
app.use(cors({ origin: whiteList, credentials: true }));
app.use(cookies());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(
  session({
    secret: "Shh, it's a secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(therapistsRouter);
app.use(pricesRouter);
app.use(totalSessionsRouter);
app.use(medicalAppointmentsRouter);
app.use(sessionHoursRouter);
app.use(addressTherapistRouter);
app.use(loginRouter);
app.use(registerRouter);
app.use(stateOfMindRouter);
app.use(regionRouter);
app.use(therapistsSelectedRouter);
app.use(contactRouter);
app.use(userMessageRouter);
app.use(formTherapistsRouter);
app.use(checkoutDonationRouter);
app.use(donationCreateRouter);
app.use(sessionPaymentRouter);
app.use(createMedicalAppointmentRouter);
app.use(videoCallRouter);
app.use(forgetPasswordRouter);
app.use(newPasswordChangeRouter);
app.use(profileRouter);
app.use(profileEditRouter);
app.use(deleteConfirmRouter);
app.use(allTherapistsRouter);
app.use(allUsersRouter);
app.use(allShiftsRouter);
app.use(allDonationsRouter);
app.use(allMoodsRouter);
app.use(allPricesRouter);
app.use(allSessionsHoursRouter);
app.use(allContactsRouter);
app.use(therapistSearchRouter);
app.use(therapistEditRouter);
app.use(therapistDestroyRouter);
app.use(userSearchRouter);
app.use(userEditRouter);
app.use(userDestroyRouter);
app.use(priceSearchRouter);
app.use(priceEditRouter);
app.use(sessionsHoursSearchRouter);
app.use(sessionsHoursEditRouter);
app.use(therapistShiftsRouter);

const PORT = 3001;

server.listen(PORT, () => console.log("Corriendo en el puerto", PORT));
