import { fullDiv } from "../../App";
import Barra from "../Barra";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import Footer from "../Footer";
import { IconButton, Dialog, Button } from "@mui/material";
import Mas from "../../Iconos/add.svg";
import FormularioEmpleado from "./FormularioEmpleado";
const AdminEmpleados = () => {
  const handleEditar=(row:any)=>{
    setSelected(row);
    setOpenDialog(true)
  }
  const handleEliminar=(row:any)=>{
    setSelected(row);
    setOpenDialogEliminar(true)
  }
  const columnas = [
    {
      field: "actions",
      type: "actions",
      width: 60,
      filterable: false,
      sortable: false,
      getActions: (params: { row: any }) => [
        <GridActionsCellItem
          label="Editar"
           onClick={()=>handleEditar(params.row)}
          showInMenu
          // icon={getIcono(listaIconos.edit)}
        />,
        <GridActionsCellItem
          label="Eliminar"
          onClick={()=>handleEliminar(params.row)}
          showInMenu
          // icon={getIcono(listaIconos.close)}
        />,
      ],
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 200,
      editable: false,
      sortable: true,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 300,
      editable: false,
      sortable: true,
    },
    {
      field: "Edad",
      headerName: "Edad",
      width: 200,
      editable: false,
      sortable: true,
    },
    {
      field: "Documento",
      headerName: "Documento",
      width: 140,
      editable: false,
      sortable: true,
    },
  ];
  const [rows, setRows] = useState([
    {
      id: 0,
      Nombre: "Juan",
      Apellido:'Perez',
      Email: "mailexample@gmail.com",
      Telefono: "43213232",
      Direccion:'aaaaaaaa',
      Departamento:'ddddddddd', 
    },
    {
      id: 1,
      Nombre: "Pepe",
      Apellido:'Rodriguez',
      Email: "mailexample@gmail.com",
      Telefono: "43213232",
      Direccion:'aaaaaaaa',
      Departamento:'ddddddddd',
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);

  const [selected,setSelected]=useState<any>(null)
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "50px auto 50px",
        backgroundColor: "rgb(242 234 225)",
      }}
    >
      <Barra />
      <div style={{ ...fullDiv, flexDirection: "column", justifyContent:'center' }}>
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
           
          }}
        >
          <span style={{ marginLeft: "30px", fontWeight: "bold" }}>
            Administración Empleados
          </span>
          <IconButton
            sx={{
              marginLeft: "auto",
              marginRight: "30px",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setOpenDialog(true)}
          >
            <img src={Mas} style={{ width: "25px", height: "25px" }} />
          </IconButton>
        </div>
        <DataGrid
        sx={{width:'95%',marginLeft:'2.5%'}}
          columns={columnas}
          rows={rows}
      
        />
      </div>
      <Footer />
      <Dialog
        fullWidth
        maxWidth={"xs"}
        onClose={() => {setOpenDialog(false);setSelected(null)}}
        open={openDialog}
      >
        <div style={{ ...fullDiv, height: "85vh" }}>
          <FormularioEmpleado selected={selected}/>
        </div>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth={"xs"}
        onClose={() => {setOpenDialogEliminar(false);setSelected(null)}}
        open={openDialogEliminar}
      >
        <div style={{ ...fullDiv,width:'calc(100% - 60px)',flexDirection:'column', height: "15vh",padding:'30px',fontSize:'20px',fontWeight:'bold' }}>
         ¿Desea eliminar el Empleado {selected?.Apellido}, {selected?.Nombre}?
         <div style={{width:'100%', height:'60px',display:'flex', marginTop:'auto',alignItems:'center',justifyContent:'space-between'}}>
          <Button sx={{backgroundColor:'darkblue',marginLeft:'auto',color:'white','&:hover':{
            backgroundColor:'darkblue',color:'white'
          }}}>Aceptar</Button>

         </div>
        </div>
      </Dialog>
    </div>
  );
};
export default AdminEmpleados;
