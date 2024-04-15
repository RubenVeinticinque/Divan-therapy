import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Partials/Body-title";
import TextDanger from "../Partials/Text-danger";
import {
  helperRegions,
  handleOnChange,
  onSubmit,
} from "../../assets/helpers/helper-region";
import Button from "../Partials/Button";
import Label from "../Partials/Label";
import Select from "../Partials/Select";
import Option from "../Partials/Option";
import "../../assets/css/region.css";

function Region({ isLogged, regionState }) {
  const localStorageRegions = localStorage.getItem("regions");
  const rg = JSON.parse(localStorageRegions);
  const [regSate, setRegSate] = useState(regionState ? regionState : false);
  const [listRegions] = useState(rg);
  const [region, setRegion] = useState("");
  const [therapistSelected, setTherapistSelected] = useState([]);
  const [navTherapistSelected, setNavTherapistSelected] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) return navigate("/login");
    helperRegions();
  }, [isLogged, navigate]);

  useEffect(() => {
    if (!regSate) return navigate("/");
  }, [regSate, navigate]);

  useEffect(() => {
    if (navTherapistSelected) {
      localStorage.setItem(
        "therapist-selected",
        JSON.stringify(therapistSelected)
      );
      return navigate("/therapists-selected", { state: { state: true } });
    }
  }, [navTherapistSelected, therapistSelected, navigate]);

  return (
    <>
      <Title text={"Terapeutas por región"} />
      <form
        className="form-region"
        onSubmit={(e) =>
          onSubmit(
            e,
            listRegions,
            setTherapistSelected,
            setErrors,
            setNavTherapistSelected
          )
        }
      >
        <Label className="display-none" htmlFor="select-country" />
        {errors && errors.countries ? (
          <TextDanger text={errors.countries.msg} />
        ) : (
          ""
        )}
        <Select
          className="form-select color-dark-green"
          name="countries"
          id="select-country"
          ariaLabel="Default select example"
          defaultValue={region}
          onChange={(e) => handleOnChange(e, setRegion, listRegions)}
          textSelect={
            <>
              <Option id="option-country" textOption="Seleccione el país" />
              {listRegions &&
                listRegions.countriesDb.map((country) => {
                  return (
                    <option id="option-country" key={country.id}>
                      {country.name_country}
                    </option>
                  );
                })}
            </>
          }
        />

        <Label className="display-none" htmlFor="select-province" />
        {errors && errors.provinces ? (
          <TextDanger text={errors.provinces.msg} />
        ) : (
          ""
        )}
        <Select
          className="form-select color-dark-green"
          name="provinces"
          id="select-province"
          ariaLabel="Default select example"
          defaultValue={region}
          onChange={(e) => handleOnChange(e, setRegion, listRegions)}
          textSelect={
            <>
              <Option
                id="option-provinces"
                textOption="Seleccione la provincia"
              />
            </>
          }
        />

        <Label className="display-none" htmlFor="select-city" />

        {errors && errors.cities ? <TextDanger text={errors.cities.msg} /> : ""}
        <Select
          className="form-select color-dark-green"
          name="cities"
          id="select-city"
          ariaLabel="Default select example"
          defaultValue={region}
          onChange={(e) => handleOnChange(e, setRegion, listRegions)}
          textSelect={
            <>
              <Option id="option-cities" textOption="Seleccione la ciudad" />
            </>
          }
        />

        <Label className="select-location display-none" htmlFor="select-zone" />

        {errors && errors.zones ? <TextDanger text={errors.zones.msg} /> : ""}
        <Select
          className="form-select loc-select color-dark-green"
          name="zones"
          id="select-zone"
          ariaLabel="Default select example"
          defaultValue={region}
          onChange={(e) => handleOnChange(e, setRegion, listRegions)}
          textSelect={
            <>
              <Option id="option-zones" textOption="Seleccione la zona" />
            </>
          }
        />

        <Button type="submit" className="btn-register" btnText="Filtrar" />
      </form>
    </>
  );
}

export default Region;
