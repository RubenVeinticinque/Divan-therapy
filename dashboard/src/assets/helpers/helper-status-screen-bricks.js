function handleStatus(
  statusOpertion,
  setStatusApproved,
  setStatusPending,
  setErrorStatus
) {
  if (statusOpertion === "approved") {
    return setStatusApproved(true);
  } else if (statusOpertion === "in_process") {
    return setStatusPending(true);
  } else {
    return setErrorStatus(true);
  }
}

async function enterDonation(isLogged, statusPayment) {
  const userAndDonation = {
    id_user: isLogged.id,
    donation: statusPayment.amount,
    donor_email: isLogged.userEmail,
  };

  const url = "http://localhost:3001/api/donation-create";
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...userAndDonation }),
  };

  const fetchDonation = await fetch(url, config);
  const response = await fetchDonation.json();
  console.log(response);
}

export { handleStatus, enterDonation };
