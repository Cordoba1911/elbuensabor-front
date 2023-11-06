import { Dialog, TextField } from "@mui/material";
import { Dispatch, ReactElement, SetStateAction, useState } from "react";
interface IRegistrarUsuario {
  Nombre: string;
  Apellido: string;
  Direccion: string;
  Localidad: string;
  Telefono: string;
  Email: string;
  Contraseña: string;
  RepetirContraseña: string;
}
const RegistrarUsuario = ({
  openRegistrarUsuario,
  setOpenRegistrarUsuario,
}: {
  openRegistrarUsuario: boolean;
  setOpenRegistrarUsuario: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  const [input, setInput] = useState<IRegistrarUsuario>({
    Nombre: "",
    Apellido: "",
    Direccion: "",
    Localidad: "",
    Telefono: "",
    Email: "",
    Contraseña: "",
    RepetirContraseña: "",
  });
  const stylesDefault = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={openRegistrarUsuario}
      onClose={(): void => setOpenRegistrarUsuario(false)}
    >
      <div
        style={{
          width: "calc(100% - 50px)",
          height: "90vh",
          display: "grid",
          gridTemplateRows: "repeat(8,calc(12.5% - 9px))",
          gridTemplateColumns: "50% 50%",
          rowGap: "10px",
          columnGap: "10px",
          padding: "20px",
        }}
      >
        <div
          style={{
            ...stylesDefault,
            gridColumn: "1/-1",

            borderBottom: "1px solid gray",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <span style={{ marginLeft: "20px" }}>Registrarse como Cliente</span>
        </div>
        <div
          style={{
            ...stylesDefault,
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            label={"Nombre"}
            value={input.Nombre}
            onChange={(newValue): void =>
              setInput((prev): any => ({
                ...prev,
                Nombre: newValue,
              }))
            }
          />
        </div>
        <div
          style={{
            ...stylesDefault,
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            label={"Apellido"}
            value={input.Apellido}
            onChange={(newValue): void =>
              setInput((prev): any => ({
                ...prev,
                Apellido: newValue,
              }))
            }
          />
        </div>
        <div
          style={{
            ...stylesDefault,
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            label={"Direccion"}
            value={input.Direccion}
            onChange={(newValue): void =>
              setInput((prev): any => ({
                ...prev,
                Direccion: newValue,
              }))
            }
          />
        </div>{" "}
        <div
          style={{
            ...stylesDefault,
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            label={"Localidad"}
            value={input.Localidad}
            onChange={(newValue): void =>
              setInput((prev): any => ({
                ...prev,
                Localidad: newValue,
              }))
            }
          />
        </div>
        <div
          style={{
            ...stylesDefault,
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            label={"Telefono"}
            value={input.Telefono}
            onChange={(newValue): void =>
              setInput((prev): any => ({
                ...prev,
                Telefono: newValue,
              }))
            }
          />
        </div>
        <div
          style={{
            ...stylesDefault,
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            label={"Email"}
            value={input.Email}
            onChange={(newValue): void =>
              setInput((prev): any => ({
                ...prev,
                Email: newValue,
              }))
            }
          />
        </div>
        <div
          style={{
            ...stylesDefault,
            gridColumn: "1/-1",
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            label={"Contraseña"}
            value={input.Contraseña}
            onChange={(newValue): void =>
              setInput((prev): any => ({
                ...prev,
                Contraseña: newValue,
              }))
            }
          />
        </div>{" "}
        <div
          style={{
            ...stylesDefault,
            gridColumn: "1/-1",
          }}
        >
          <TextField
            sx={{ width: "100%" }}
            label={"Repetir Contraseña"}
            value={input.RepetirContraseña}
            onChange={(newValue): void =>
              setInput((prev): any => ({
                ...prev,
                RepetirContraseña: newValue,
              }))
            }
          />
        </div>
        <div
          style={{
            ...stylesDefault,
            gridColumn: "1/-1",
          }}
        >
          googel
        </div>{" "}
        <div
          style={{
            ...stylesDefault,
            gridColumn: "1/-1",
          }}
        >
          botones
        </div>
      </div>
    </Dialog>
  );
};
export default RegistrarUsuario;
