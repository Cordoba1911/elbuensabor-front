import { fullDiv } from "../../App";
import Barra from "../Barra";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useState,useMemo,useEffect } from "react";
import Footer from "../Footer";
import { IconButton, Dialog, Button } from "@mui/material";
import Mas from "../../Iconos/add.svg";
import FormularioEmpleado from "./FormularioEmpleado";
import {  useDeleteDataEmpleados, useGetDataEmpleados } from "../../Services/apiServiceEmpleados";
export interface RowEmpleado{
  nombre:string;
  apellido:string;
  dni:string;
  fechaAlta?: null;
  fechaBaja?: null;
  email?:string;
  fechaModificacion?:null;
  id?: number;  
  pedidos?: string[];
  rolEmpleado?: null;
  telefono:string;
  rol:string;
}
const AdminEmpleados = () => {
  //States
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);
  const [selected,setSelected]=useState<RowEmpleado|null>(null)
  //Funcion para abrir dialogo de edicion
  const handleEditar=(row:RowEmpleado)=>{
    setSelected(row);
    setOpenDialog(true)
  }
  
  //Funcion para abrir dialogo de edicion
  const handleEliminar=(row:RowEmpleado)=>{
    setSelected(row);
    setOpenDialogEliminar(true)
  }
  //Columnas de la tabla
  const columnas = [
    {
      field: "actions",
      type: "actions",
      width: 60,
      filterable: false,
      sortable: false,
      getActions: (params: { row: RowEmpleado }) => [
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
      field: "nombre",
      headerName: "Nombre",
      width: 200,
      editable: false,
      sortable: true,
    },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 300,
      editable: false,
      sortable: true,
    },
    {
      field: "telefono",
      headerName: "Telefono",
      width: 200,
      editable: false,
      sortable: true,
    },
    {
      field: "dni",
      headerName: "dni",
      width: 140,
      editable: false,
      sortable: true,
    }, {
      field: "rolEmpleado",
      headerName: "Rol",
      width: 140,
      editable: false,
      sortable: true,
    },
  ];

  //GetData
  const { data: empleadosData, refetch: refetchEmpleados } = useGetDataEmpleados({
    page: 0,
    size: 10,
  })
  useEffect(()=>{refetchEmpleados()},[])
  const rows=useMemo(()=>!empleadosData?.content?[]:empleadosData.content,[empleadosData])
  
  //DeleteData
  const { response: deleteDataResponse, refetch: refetchDeleteData } = useDeleteDataEmpleados(selected?.id);
  useEffect(()=>{
    if(deleteDataResponse!==null){
      setOpenDialogEliminar(false);
      refetchEmpleados()
    }
  },[deleteDataResponse])
  const handleEliminarFila=()=>{
    refetchDeleteData()
  }
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "50px auto 50px",
        backgroundColor: "#ffffff",
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
        <div style={{ ...fullDiv, height: "75vh" }}>
          <FormularioEmpleado selected={selected} setOpenDialog={setOpenDialog} 
           refetch={refetchEmpleados}
          />
        </div>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth={"xs"}
        onClose={() => {setOpenDialogEliminar(false);setSelected(null)}}
        open={openDialogEliminar}
      >
        <div style={{ ...fullDiv,width:'calc(100% - 60px)',flexDirection:'column', height: "15vh",padding:'30px',fontSize:'20px',fontWeight:'bold' }}>
         ¿Desea eliminar el Empleado {selected?.apellido}, {selected?.nombre}?
         <div style={{width:'100%', height:'60px',display:'flex', marginTop:'auto',alignItems:'center',justifyContent:'space-between'}}>
          <Button onClick={handleEliminarFila} sx={{backgroundColor:'darkblue',marginLeft:'auto',color:'white','&:hover':{
            backgroundColor:'darkblue',color:'white'
          }}}>Aceptar</Button>

         </div>
        </div>
      </Dialog>
    </div>
  );
};
export default AdminEmpleados;
