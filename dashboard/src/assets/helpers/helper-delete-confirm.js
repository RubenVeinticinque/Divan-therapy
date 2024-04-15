function helperDeleteConfirm(isLogged) {
  try {
    if (isLogged) {
      async function fetchDeleteConfirm() {
        const urlDeleteConfirm = "http://localhost:3001/api/delete-confirm";
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: isLogged.id }),
        };
        const fetchDeleteConfirm = await fetch(urlDeleteConfirm, config);
        const response = await fetchDeleteConfirm.json();

        if (response.data === "Pending turn") {
          localStorage.setItem("pending-turn", JSON.stringify(true));
        } else {
          localStorage.removeItem("pending-turn");
        }
      }
      fetchDeleteConfirm();
    }
  } catch (error) {
    console.log(error);
  }
}

function onSubmit(e, isLogged, setPendingTurn) {
  e.preventDefault();

  try {
    async function fetchUserDelete() {
      const urlUserDelete = "http://localhost:3001/api/user-delete";

      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: isLogged.id }),
      };
      const fetchUserDelete = await fetch(urlUserDelete, config);
      const response = await fetchUserDelete.json();
      setPendingTurn(response.data);
    }
    fetchUserDelete();
  } catch (error) {
    console.log(error);
  }
}
export { helperDeleteConfirm, onSubmit };
