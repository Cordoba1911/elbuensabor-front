import { fullDiv } from "../../App";
import DialogTitle, { DialogFooter } from "../General/DialogTitle";

const FormularioEmpleado = () => {
  return (
    <div style={{ ...fullDiv, flexDirection: "column" }}>
      <DialogTitle title={"Empleados"} />
      <div
        style={{ ...fullDiv, backgroundColor: "red", display: "grid" }}
      ></div>
      <DialogFooter func={() => {}} />
    </div>
  );
};
export default FormularioEmpleado;
