import Input from "./Input";
import Button from "./Button";
import Label from "./Label";

function FormSearchAdmin() {
  return (
    <div className="container-search">
      <Label className="color-dark-green" htmlFor="search"></Label>

      <Input
        className="form-control inputs"
        type="text"
        name="search"
        id="search"
        placeholder="Ente your id"
      />
      <Button
        type="submit"
        className="btn-back bg-color-light-green color-white"
        id="btn-back"
        btnText="Buscar"
      />
    </div>
  );
}

export default FormSearchAdmin;
