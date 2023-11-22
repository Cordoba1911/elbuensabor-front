import { Dialog, TextField,Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Dispatch, ReactElement, SetStateAction, useState ,useEffect} from "react";
import { customAxiosInstance } from "../../Services/axiosService";
import { usePostDataRegister } from "../../Services/apiServiceRegister";

interface IRegistrarUsuario {
  nombre: string;
    apellido: string;
    username: string;
    password: string;
    rol:string
}
const RegistrarUsuario = ({
  openRegistrarUsuario,
  setOpenRegistrarUsuario,from
}: {
  openRegistrarUsuario: boolean;
  setOpenRegistrarUsuario: Dispatch<SetStateAction<boolean>>;from:string
}): ReactElement => {
  const [input, setInput] = useState<IRegistrarUsuario>({
    nombre: "",
    apellido: "",
    username: "",
    password: "",
    rol:from
    
  
  });
  const stylesDefault = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  };  

  
  const { response: postDataResponse, refetch: refetchPostData } = usePostDataRegister(
    input
  );
  
    useEffect(()=>{
      if(postDataResponse!==null){
        console.log({postDataResponse})
         const token=postDataResponse.data.token
         setOpenRegistrarUsuario(false)
         window.localStorage.setItem('token',token)
               
      }
     },[postDataResponse])
    const handleRegister=()=>{
      refetchPostData()
      
    }

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
          gridTemplateRows: "repeat(6,calc(calc(100% / 6) - 9px))",
          gridTemplateColumns: "100%",
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
            value={input.nombre}
            onChange={(e): void =>
              setInput((prev): IRegistrarUsuario => ({
                ...prev,
                nombre: e.target.value,
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
            value={input.apellido}
            onChange={(e): void =>
              setInput((prev): IRegistrarUsuario => ({
                ...prev,
                apellido: e.target.value,
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
            label={"Username"}
            value={input.username}
            onChange={(e): void =>
              setInput((prev): IRegistrarUsuario => ({
                ...prev,
                username: e.target.value,
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
            label={"Password"}
            value={input.password}
            onChange={(e): void =>
              setInput((prev): IRegistrarUsuario => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </div>
        <Button onClick={()=>handleRegister()}>Registrarse</Button>
      </div>
    </Dialog>
  );
};
export default RegistrarUsuario;
