import Logo from "../Iconos/Logo.svg";
import { IconButton, TextField, Menu, MenuItem } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MenuH from "../Iconos/menu.svg";
import { MouseEvent, useState } from "react";
import { fullDiv } from "../App";
import { useNavigate } from "react-router-dom";
const Barra = () => {
  const [buscador, setBuscador] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <div
      style={{ ...fullDiv, backgroundColor: "#F2EAE1", alignItems: "center" }}
    >
      <div onClick={()=>navigate('/MainPage')} style={{cursor:'pointer', width: "50px", height: "50px", marginLeft: "30px" }}>
        <img src={Logo} style={{ width: "50px", height: "50px" }} />
      </div>
      <TextField
        sx={{
          width: "400px",
          backgroundColor: "#E5E5E5",
          marginLeft: "50px",
          borderRadius: "30px",

          "& .MuiOutlinedInput-input": {
            padding: "5px 5px 5px 10px !important",
          },
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
        }}
        placeholder="Buscar..."
        value={buscador}
        onChange={(e) => setBuscador(e.target.value)}
      />
      <div
        style={{
          width: "50px",
          height: "50px",
          display: "flex",
          marginLeft: "auto",
          marginRight: "30px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton onClick={handleMenu}>
          {" "}
          <img src={MenuH} style={{ width: "30px", height: "30px" }} />
        </IconButton>
      </div>{" "}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {" "}
        <MenuItem onClick={() => handleNavigate("/MainPage")}>
          Menu Principal
        </MenuItem>
        <MenuItem onClick={() => handleNavigate("/AdminEmpleados")}>
          Administracion Empleados
        </MenuItem> 
        <MenuItem onClick={() => handleNavigate("/AdminClientes")}>
          Administracion Clientes
        </MenuItem> 
        <MenuItem onClick={() => handleNavigate("/AdminRubros")}>
          Administracion Rubros
        </MenuItem>
      </Menu>
    </div>
  );
};
export default Barra;
