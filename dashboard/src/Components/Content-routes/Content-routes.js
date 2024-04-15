import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DivanTherapy from "../Divan-therapy/Divan-therapy";
import Price from "../Price/Price";
import Home from "../Home/Home";
import Therapists from "../Therapists/Therapist";
import Donations from "../Donations/Donations";
import Emergency from "../Emergency/Emergency";
import Contact from "../Contact/Contact";
import FormTherapists from "../Form-therapist/Form-therapists";
import DonationPayment from "../Donations/Donation-payment";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ForgetPassword from "../Forget-password/Forget-password";
import StateOfMind from "../State-of-mind/State-of-mind";
import UsersMessages from "../Users-messages/Users-messages";
import SessionMode from "../Session-mode/Session-mode";
import { regions } from "../../assets/helpers/helper-content-routes";
import OnlineModality from "../Online-modality/Online-modality";
import SessionPayment from "../Session-payment/Session-payment";
import RequestAnAppointment from "../Request-an-appointment/Request-an-appointment";
import Region from "../Region/Region";
import TherapistsSelected from "../Therapists-selected/Therapists-selected";
import Errors from "../Errors/Errors";
import Pending from "../Pending/Pending";
import PaymentMade from "../Payment-made/Payment-made";
import CheckoutDonation from "../Donations/checkout-bricks-donation";
import StatusScreenBrick from "../Donations/Status-screen-bricks";
import Chat from "../Chat/Chat";
import { CheckoutPayment } from "../Checkout-session-payment/Checkout-payment-brick";
import StatusScreenBrickPayment from "../Checkout-session-payment/Status-screen-bricks-payment";
import VideoCall from "../Video-call/Video-call";
import { NewPassword } from "../New-password/New-password";
import { NewPassChange } from "../New-password/New-password-change";
import { Profile } from "../Profile/Profile";
import { ProfileEdit } from "../Profile/Profile-edit";
import { DeleteConfirm } from "../Delete-confirm/Delete-confirm";
import { Admin } from "../Admin/Admin";
import { AllTherapists } from "../All-therapists/All-therapists";
import { AllUsers } from "../All-users/All-users";
import { AllShifts } from "../All-shifts/All-shifts";
import { AllDonations } from "../All-donations/All-donations";
import { AllMoods } from "../All-moods/All-moods";
import { AllPrices } from "../All-prices/All-prices";
import { AllSessionsHours } from "../All-sessions-hours/All-sessions-hours";
import { AllContacts } from "../All-contacts/All-contacts";
import { TherapistShifts } from "../therapist-shifts/therapist-shifts";
import { TherapistsSearch } from "../Therapists-search/Therapists-search";
import { TherapistEdit } from "../Therapist-edit/Therapist-edit";
import { TherapistDestroy } from "../Therapist-destroy/Therapist-destroy";
import { UserSearch } from "../User-search/User-search";
import { UserEdit } from "../User-edit/User-edit";
import { UserDestroy } from "../User-destroy/User-destroy";
import { PriceSearch } from "../Price-search/Price-search";
import { PriceEdit } from "../Price-edit/Price-edit";
import { SessionsHoursSearch } from "../Sessions-hours-search/Sessions-hours-search";
import { SessionsHoursEdit } from "../Sessions-hours-edit/Sessions-hours-edit";
import { TherapistShiftList } from "../Therapist-shift-list/Therapist-shift-list";

function ContentWrapper({ isLogged, userLogged, vc, logout }) {
  const locStorageTherpistSelected = localStorage.getItem("therapist-selected");
  const therapistSelected = JSON.parse(locStorageTherpistSelected);
  const location = useLocation();

  useEffect(() => {
    if (!!userLogged) regions();
  }, [userLogged]);

  return (
    <>
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route
          path="/divan-therapy"
          exact={true}
          element={<DivanTherapy isLogged={userLogged} />}
        />
        <Route
          path="/therapists"
          exact={true}
          element={<Therapists isLogged={userLogged} />}
        />
        <Route
          path="/price"
          exact={true}
          element={<Price isLogged={userLogged} />}
        />
        <Route
          path="/donation"
          exact={true}
          element={<Donations isLogged={userLogged} />}
        />
        <Route path="/emergency" exact={true} element={<Emergency />} />
        <Route
          path="/contact"
          exact={true}
          element={<Contact isLogged={userLogged} />}
        />
        <Route
          path="/form-therapists"
          exact={true}
          element={<FormTherapists isLogged={userLogged} />}
        />
        <Route
          path="/donation-payment"
          exact={true}
          element={<DonationPayment isLogged={userLogged} />}
        />
        <Route
          path="/register"
          exact={true}
          element={<Register isLogged={userLogged} />}
        />
        <Route
          path="/login"
          exact={true}
          element={<Login isLogged={isLogged} />}
        />
        <Route path="/logout" exact={true} element={<Home />} />
        <Route
          path="/forget-password"
          exact={true}
          element={<ForgetPassword />}
        />
        <Route
          path="/new-password/:id"
          exact={true}
          element={<NewPassword />}
        />
        <Route
          path="/new-pass-change"
          exact={true}
          element={<NewPassChange />}
        />
        <Route
          path="/state-of-mind"
          exact={true}
          element={<StateOfMind isLogged={userLogged} vc={vc} />}
        />
        <Route
          path="/users-messages"
          exact={true}
          element={<UsersMessages isLogged={userLogged} />}
        />
        <Route
          path="/session-mode"
          exact={true}
          element={
            <SessionMode therapists={location.state} isLogged={userLogged} />
          }
        />
        <Route
          path="/modality"
          exact={true}
          element={
            <OnlineModality
              therapist={location.state}
              isLogged={userLogged}
              vc={vc}
            />
          }
        />
        <Route
          path="/session-payment"
          exact={true}
          element={
            <SessionPayment therapist={location.state} isLogged={userLogged} />
          }
        />
        <Route
          path="/payment-checkout"
          exact={true}
          element={
            <CheckoutPayment prices={location.state} isLogged={userLogged} />
          }
        />
        <Route
          path="/status-screen-brick-payment"
          exact={true}
          element={
            <StatusScreenBrickPayment
              isLogged={userLogged}
              status={location.state}
            />
          }
        />
        <Route
          path="/request-an-appointment"
          exact={true}
          element={<RequestAnAppointment isLogged={userLogged} vc={vc} />}
        />
        <Route
          path="/region"
          exact={true}
          element={
            <Region isLogged={userLogged} regionState={location.state} />
          }
        />
        <Route
          path="/therapists-selected"
          exact={true}
          element={
            <TherapistsSelected
              isLogged={userLogged}
              therapists={therapistSelected}
              state={location.state}
            />
          }
        />
        <Route
          path="/checkout-donation"
          exact={true}
          element={
            <CheckoutDonation isLogged={userLogged} amount={location.state} />
          }
        />
        <Route
          path="/status-screen-brick"
          exact={true}
          element={
            <StatusScreenBrick isLogged={userLogged} status={location.state} />
          }
        />
        <Route
          path="/chat"
          exact={true}
          element={
            <Chat isLogged={userLogged} vc={vc} stateChat={location.state} />
          }
        />
        <Route
          path="/video-call"
          exact={true}
          element={<VideoCall isLogged={userLogged} vc={vc} />}
        />
        <Route
          path="/profile"
          exact={true}
          element={<Profile isLogged={userLogged} />}
        />
        <Route
          path="/detail-profile/:id"
          exact={true}
          element={<ProfileEdit isLogged={userLogged} />}
        />
        <Route
          path="/delete-confirm/:id"
          exact={true}
          element={<DeleteConfirm isLogged={userLogged} logout={logout} />}
        />
        <Route
          path="/admin"
          exact={true}
          element={<Admin isLogged={userLogged} />}
        />
        <Route
          path="/all-therapists"
          exact={true}
          element={
            <AllTherapists isLogged={userLogged} therapists={location.state} />
          }
        />
        <Route
          path="/all-users"
          exact={true}
          element={<AllUsers isLogged={userLogged} allUsers={location.state} />}
        />
        <Route
          path="/all-shifts"
          exact={true}
          element={
            <AllShifts isLogged={userLogged} allTurns={location.state} />
          }
        />
        <Route
          path="/all-donations"
          exact={true}
          element={
            <AllDonations isLogged={userLogged} allDonations={location.state} />
          }
        />
        <Route
          path="/all-moods"
          exact={true}
          element={<AllMoods isLogged={userLogged} allMoods={location.state} />}
        />
        <Route
          path="/all-prices"
          exact={true}
          element={
            <AllPrices isLogged={userLogged} allPrices={location.state} />
          }
        />
        <Route
          path="/all-sessions-hours"
          exact={true}
          element={
            <AllSessionsHours
              isLogged={userLogged}
              allSessionsHours={location.state}
            />
          }
        />
        <Route
          path="/all-contacts"
          exact={true}
          element={
            <AllContacts isLogged={userLogged} allContacts={location.state} />
          }
        />
        <Route
          path="/therapist-shifts"
          exact={true}
          element={
            <TherapistShifts isLogged={userLogged} state={location.state} />
          }
        />
        <Route
          path="/therapist-shift-list"
          exact={true}
          element={
            <TherapistShiftList isLogged={userLogged} state={location.state} />
          }
        />
        <Route
          path="/therapist-search"
          exact={true}
          element={
            <TherapistsSearch isLogged={userLogged} state={location.state} />
          }
        />
        <Route
          path="/therapist-edit"
          exact={true}
          element={
            <TherapistEdit isLogged={userLogged} status={location.state} />
          }
        />
        <Route
          path="/therapist-confirm-destroy"
          exact={true}
          element={
            <TherapistDestroy isLogged={userLogged} state={location.state} />
          }
        />
        <Route
          path="/user-search"
          exact={true}
          element={<UserSearch isLogged={userLogged} state={location.state} />}
        />
        <Route
          path="/user-edit"
          exact={true}
          element={<UserEdit isLogged={userLogged} state={location.state} />}
        />
        <Route
          path="/user-confirm-destroy"
          exact={true}
          element={<UserDestroy isLogged={userLogged} state={location.state} />}
        />
        <Route
          path="/price-search"
          exact={true}
          element={<PriceSearch isLogged={userLogged} state={location.state} />}
        />
        <Route
          path="/price-edit"
          exact={true}
          element={<PriceEdit isLogged={userLogged} state={location.state} />}
        />
        <Route
          path="/sessions-hours-search"
          exact={true}
          element={
            <SessionsHoursSearch isLogged={userLogged} state={location.state} />
          }
        />
        <Route
          path="/sessions-hours-edit"
          exact={true}
          element={
            <SessionsHoursEdit isLogged={userLogged} state={location.state} />
          }
        />

        <Route
          path="/payment-made"
          exact={true}
          element={<PaymentMade isLogged={userLogged} state={location.state} />}
        />
        <Route
          path="/error"
          exact={true}
          element={<Errors isLogged={userLogged} state={location.state} />}
        />
        <Route
          path="/pending"
          exact={true}
          element={<Pending isLogged={userLogged} state={location.state} />}
        />

        <Route element={<Home />} />
      </Routes>
    </>
  );
}

export default ContentWrapper;
