function helperProfile(isLogged, setAdmin, setIsTherapist, setUserLogged) {
  if (isLogged) {
    async function fetchProfile() {
      const urlProfile = "http://localhost:3001/api/profile";
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(isLogged),
      };
      const fetchProfile = await fetch(urlProfile, config).catch((error) =>
        console.log(error)
      );
      const response = await fetchProfile.json();

      if (response.data.admin) setAdmin(response.data.admin);

      if (response.data.isTherapist) setIsTherapist(response.data.isTherapist);

      if (
        response.data !== "User not found" ||
        response.data !== "Error user not found"
      ) {
        setUserLogged(response.data);
      }
    }
    fetchProfile();
  }
}
export { helperProfile };
