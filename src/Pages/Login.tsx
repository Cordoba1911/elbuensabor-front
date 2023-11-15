import React, { ReactElement, useState } from "react";
import fondo from "../Componentes/Imagenes/fondo.jpg";
import logo from "../Componentes/Imagenes/logotipo.png";
import {
  IconButton,
  InputAdornment,
  TextField,
  Box,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import RegistrarUsuario from "./Registrar/RegistrarUsuario";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { customAxiosInstance } from "../axiosService";
import { useSnackbar } from "notistack";
interface IUser {
  username: string;
  password: string;
  // nombre:string,
  // apellido:string,
}
const Login = (): ReactElement => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    username: "",
    password: "",
    // nombre:"",
    // apellido:"",
  });
  const {enqueueSnackbar}=useSnackbar()

  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [openRegistrarUsuario, setOpenRegistrarUsuario] =
    useState<boolean>(false);
    const mutationAuth = useMutation(
    
      (data: any) =>
        customAxiosInstance.post(
         '/auth/login',
         data
        ),
      {
        onSuccess: (data) => {
          const token=data.data.token
          window.localStorage.setItem('token',token)
          customAxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
          handleNavigate()
        },
        onError: (error: string) => {
          enqueueSnackbar(error, {
            variant: 'error',
          });
        },
      }
      )
         
    const handleAuth=()=>{
      mutationAuth.mutate(
        user//ESTO SE VE
      )
    }
  const handleNavigate = () => {
    navigate("/MainPage");
  };
  const[from,setFrom]=useState("")
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundImage: `url(${fondo})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "30%",
          height: "60%",
          display: "grid",
          gridTemplateColumns: "100%",
          gridTemplateRows: "30% 22% 22% 26%",
          backgroundColor: "#fff",
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logo} style={{ width: "50%", height: "50%" }} />
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <TextField
            sx={{ width: "80%" }}
            label="Usuario" 
            error={!user.username}
            value={user.username}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <TextField
            sx={{ width: "80%" }}
            label="Contraseña"
            type={seePassword ? "text" : "password"}
            value={user.password}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }  
            error={!user.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={(): void => setSeePassword((prev) => !prev)}
                  >
                    {seePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "50% 50%",
            gridTemplateRows: "50% 50%",
          }}
        >
          <Box
            onClick={(): void => {setOpenRegistrarUsuario(true);setFrom("USUARIO")}}
            sx={{
              "&: hover": {
                color: "#329ED0",
              },
              width: "100%",
              height: "100%",
              display: "flex",
              color: "#b1b1b1",

              fontSize: "12px",
              cursor: "pointer",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            Registrarse como cliente
          </Box>
          <Box
            onClick={(): void => {setOpenRegistrarUsuario(true);setFrom("ADMIN")}}
            sx={{
              "&: hover": {
                color: "#329ED0",
              },
              color: "#b1b1b1",
              width: "100%",
              cursor: "pointer",
              height: "100%",
              display: "flex",
              fontSize: "12px",
              marginLeft: "20px",
            }}
          >
            Registrarse como empleado
          </Box>
          <Box
            sx={{
              gridColumn: "2",
              gridRow: "1/-1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              disabled={!user.password||!user.username}
              onClick={handleAuth}
              sx={{
                height: "40%",
                width: "60%",
                "&: hover": {
                  backgroundColor: "#329ED0",
                  color: "white",
                },
                backgroundColor: "#329ED0",
                color: "white",
              }}
            >
              Ingresar
            </Button>
          </Box>
        </div>
      </div>
      <RegistrarUsuario
      from={from}
        openRegistrarUsuario={openRegistrarUsuario}
        setOpenRegistrarUsuario={setOpenRegistrarUsuario}
      />
    </div>
  );
};
export default Login;
