function helperAllUsers(setUsers, pages) {
  async function fetchAllUsers() {
    const urlAllUsers = `http://localhost:3001/api/users?page=${pages}`;

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fetchUsers = await fetch(urlAllUsers, config);
    const response = await fetchUsers.json();

    if (response.data !== "Error in operation")
      setUsers({
        users: response.data,
        prevPage: response.meta.prevPage,
        nextPage: response.meta.nextPage,
      });
  }
  fetchAllUsers();
}

export { helperAllUsers };
