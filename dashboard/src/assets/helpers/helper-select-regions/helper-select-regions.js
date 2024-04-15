async function handleRegions() {
  if (window.navigator.onLine) {
    const elSelectCountries = document.getElementById("select-country");
    const elSelectProvinces = document.getElementById("select-province");
    const elSelectCities = document.getElementById("select-city");

    let isoCodeCountry;
    let states;
    let isoCodeSate;

    const urlContries =
      "https://referential.p.rapidapi.com/v1/country?fields=currency%2Ccurrency_num_code%2Ccurrency_code%2Ccontinent_code%2Ccurrency%2Ciso_a3%2Cdial_code";

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "275c9845a5msh8c54c863c986544p13a7f1jsnf7a9d87e407e",
        "X-RapidAPI-Host": "referential.p.rapidapi.com",
      },
    };

    const resCountries = await fetch(urlContries, options).catch((err) => {
      console.log(err);
    });

    if (resCountries) {
      const countries = await resCountries.json();

      //Recorro los paises y mediante javascript creo elementos option con contenido.
      for (const i of countries) {
        const createdOption = document.createElement("option");
        const newContent = document.createTextNode(i.value);
        createdOption.appendChild(newContent);
        elSelectCountries.appendChild(createdOption);
      }
      elSelectCountries.addEventListener("input", async (e) => {
        //Se limpia los options.
        for (let x = elSelectProvinces.length - 1; x > 0; x--) {
          elSelectProvinces.lastChild.remove();
        }

        if (e.explicitOriginalTarget.value === "Seleccione el país") {
          //Se limpia los options.
          for (let x = elSelectProvinces.length - 1; x > 0; x--) {
            elSelectProvinces.lastChild.remove();
          }
          for (let x = elSelectCities.length - 1; x > 0; x--) {
            elSelectCities.lastChild.remove();
          }
        } else {
          const countrySelected = elSelectCountries.value;

          //Obtengo el código de país.
          for (const n of countries) {
            if (n.value === countrySelected) {
              isoCodeCountry = n.key;
            }
          }
          const urlStates = `https://referential.p.rapidapi.com/v1/state?iso_a2=${isoCodeCountry}`;

          const responseStates = await fetch(urlStates, options).catch(
            (err) => {
              console.log(err);
            }
          );

          if (responseStates) {
            states = await responseStates.json();

            //Creo los option con sus respectivos estados.
            for (const i of states) {
              const createdOption = document.createElement("option");
              const newContent = document.createTextNode(i.value);
              createdOption.appendChild(newContent);
              elSelectProvinces.appendChild(createdOption);
            }
          }
        }
      });
      elSelectProvinces.addEventListener("input", async (e) => {
        //Se limpia los options.
        for (let x = elSelectCities.length - 1; x > 0; x--) {
          elSelectCities.lastChild.remove();
        }

        if (e.explicitOriginalTarget.value === "Seleccione la provincia") {
          //Se limpia los options.
          for (let x = elSelectCities.length - 1; x > 0; x--) {
            elSelectCities.lastChild.remove();
          }
        } else {
          const stateSelected = elSelectProvinces.value;

          for (const n of states) {
            if (n.value === stateSelected) {
              isoCodeSate = n.key;
            }
          }

          const urlCities = `https://referential.p.rapidapi.com/v1/city?iso_a2=${isoCodeCountry}&state_code=${isoCodeSate}`;

          const responseCities = await fetch(urlCities, options).catch(
            (err) => {
              console.log(err);
            }
          );
          if (responseCities) {
            const cities = await responseCities.json();

            //Recorro las ciudades y mediante javascript creo elementos option con contenido.
            for (const i of cities) {
              const createdOption = document.createElement("option");
              const newContent = document.createTextNode(i.value);
              createdOption.appendChild(newContent);
              elSelectCities.appendChild(createdOption);
            }
          }
        }
      });
    }
  }
}

export default handleRegions;
