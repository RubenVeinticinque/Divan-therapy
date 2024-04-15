async function helperRegions() {
  //Obtengo elementos.
  const elementSelectCountries = document.getElementById("select-country");
  const elementSelectProvinces = document.getElementById("select-province");
  const elementSelectCities = document.getElementById("select-city");
  const elementSelectZones = document.getElementById("select-zone");

  //Si es seleccionado este item entonces remuevo los options siguientes.
  if (elementSelectCountries.value === "Seleccione el país") {
    elementSelectProvinces.classList.remove("display-block");
    elementSelectCities.classList.remove("display-block");
    elementSelectZones.classList.remove("display-block");
    elementSelectProvinces.classList.add("display-none");
    elementSelectCities.classList.add("display-none");
    elementSelectZones.classList.add("display-none");
  }
}

function handleOnChange(e, setRegion, listRegions) {
  setRegion(e.target.value);

  //Obtengo elementos.
  const elementSelectProvinces = document.getElementById("select-province");
  const elementSelectCities = document.getElementById("select-city");
  const elementSelectZones = document.getElementById("select-zone");

  if (e.target.name === "countries") {
    if (e.target.value !== "Seleccione el país") {
      elementSelectProvinces.classList.remove("display-none");
      elementSelectProvinces.classList.add("display-block");

      const country = listRegions.countriesDb.find(
        (country) => e.target.value === country.name_country
      );
      const provinces = listRegions.provincesDb.filter(
        (province) => province.id_name_country === country.id
      );
      //Se limpia los options.
      for (let x = elementSelectProvinces.length - 1; x > 0; x--) {
        elementSelectProvinces.lastChild.remove();
      }
      for (const i of provinces) {
        const createdOption = document.createElement("option");
        const newContentCountry = document.createTextNode(i.name_province);
        createdOption.appendChild(newContentCountry);
        elementSelectProvinces.appendChild(createdOption);
      }
    } else {
      elementSelectProvinces.classList.remove("display-block");
      elementSelectProvinces.classList.add("display-none");
      elementSelectCities.classList.remove("display-block");
      elementSelectZones.classList.remove("display-block");
      elementSelectCities.classList.add("display-none");
      elementSelectZones.classList.add("display-none");
    }
  }
  if (e.target.name === "provinces") {
    if (e.target.value !== "Seleccione la provincia") {
      elementSelectCities.classList.remove("display-none");
      elementSelectCities.classList.add("display-block");

      const provinces = listRegions.provincesDb.find(
        (province) => e.target.value === province.name_province
      );

      const cities = listRegions.citiesDb.filter(
        (city) => city.id_name_province === provinces.id
      );

      //Se limpia los options.
      for (let x = elementSelectCities.length - 1; x > 0; x--) {
        elementSelectCities.lastChild.remove();
      }
      for (const i of cities) {
        const createdOption = document.createElement("option");
        const newContentCountry = document.createTextNode(i.name_city);
        createdOption.appendChild(newContentCountry);
        elementSelectCities.appendChild(createdOption);
      }
    } else {
      elementSelectCities.classList.remove("display-block");
      elementSelectZones.classList.remove("display-block");
      elementSelectCities.classList.add("display-none");
      elementSelectZones.classList.add("display-none");
    }
  }
  if (e.target.name === "cities") {
    if (e.target.value !== "Seleccione la ciudad") {
      elementSelectZones.classList.remove("display-none");
      elementSelectZones.classList.add("display-block");

      const cities = listRegions.citiesDb.find(
        (city) => e.target.value === city.name_city
      );

      const zones = listRegions.zonesDb.filter(
        (zone) => zone.id_name_city === cities.id
      );

      //Se limpia los options.
      for (let x = elementSelectZones.length - 1; x > 0; x--) {
        elementSelectZones.lastChild.remove();
      }
      for (const i of zones) {
        const createdOption = document.createElement("option");
        const newContentCountry = document.createTextNode(i.name_zone);
        createdOption.appendChild(newContentCountry);
        elementSelectZones.appendChild(createdOption);
      }
    } else {
      elementSelectZones.classList.remove("display-block");
      elementSelectZones.classList.add("display-none");
    }
  }
}

function onSubmit(
  e,
  listRegions,
  setTherapistSelected,
  setErrors,
  setNavTherapistSelected
) {
  e.preventDefault();
  let region = {};
  let textSelect = {};

  for (const i of e.target) {
    switch (i.name) {
      case "countries":
        region = {
          country: listRegions.countriesDb.find(
            (country) => country.name_country === i.value
          ),
        };
        textSelect = {
          country: i.value,
        };
        break;
      case "provinces":
        region = {
          ...region,
          province: listRegions.provincesDb.find(
            (province) => province.name_province === i.value
          ),
        };
        textSelect = {
          ...textSelect,
          province: i.value,
        };
        break;
      case "cities":
        region = {
          ...region,
          city: listRegions.citiesDb.find((city) => city.name_city === i.value),
        };
        textSelect = {
          ...textSelect,
          city: i.value,
        };
        break;
      case "zones":
        region = {
          ...region,
          zone: listRegions.zonesDb.find((zone) => zone.name_zone === i.value),
        };
        textSelect = {
          ...textSelect,
          zone: i.value,
        };
        break;
      default:
        break;
    }
  }
  async function therapistSelected() {
    const urlTherapistsSelected =
      "http://localhost:3001/api/therapists-selected";

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(region),
    };

    const fetchTherapistSelected = await fetch(
      urlTherapistsSelected,
      config
    ).catch((error) => console.log(error));

    const response = await fetchTherapistSelected.json();
    setTherapistSelected(response.data);
    setNavTherapistSelected(true);
  }
  if (region.country && region.province && region.city && region.zone) {
    therapistSelected();
  }

  async function handleErrors() {
    const urlErrors = "http://localhost:3001/api/therapists-selected-errors";

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textSelect),
    };

    const fetchErrors = await fetch(urlErrors, config).catch((error) =>
      console.log(error)
    );

    const response = await fetchErrors.json();
    setErrors(response.data);
  }

  handleErrors();
}

export { helperRegions, handleOnChange, onSubmit };
