import { fullDiv } from "../../App";
import Barra from "../Barra";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useState,useMemo,useEffect } from "react";
import Footer from "../Footer";
import { IconButton, Dialog, Button } from "@mui/material";
import Mas from "../../Iconos/add.svg";
import FormularioCliente from "./FormularioCliente";
import { useDeleteDataClientes, useGetDataClientes } from "../../Services/apiServiceClientes";
import { useSnackbar } from "notistack";
export interface RowCliente{
  nombre:string;
  apellido:string;
  dni?:number;
  fechaAlta?: null;
  fechaBaja?: null;
  email:string;
  fechaModificacion?:null;
  id?: number;
  pedidos?: string[];
  rolEmpleado?: null;
  telefono:string;
  rol:string;
}
const AdminClientes = () => {
  //States
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);
  const [selected,setSelected]=useState<RowCliente|null>(null)
  //Funcion para abrir dialogo de edicion
   const handleEditar=(row:RowCliente)=>{
     setSelected(row);
     setOpenDialog(true)
   }
  //Funcion para abrir dialogo de eliminar
   const handleEliminar=(row:RowCliente)=>{
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
       getActions: (params: { row: RowCliente }) => [
         <GridActionsCellItem
           label="Editar"
            onClick={()=>handleEditar(params.row)}
           showInMenu
         />,
         <GridActionsCellItem
           label="Eliminar"
           onClick={()=>handleEliminar(params.row)}
           showInMenu
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
       field: "email",
       headerName: "Email",
       width: 140,
       editable: false,
       sortable: true,
     }, 
     
   ];
 
  //GetData
  const { data: clientesData, refetch: refetchClientes } = useGetDataClientes({
    page: 0,
    size: 10,
  })  
  useEffect(()=>{refetchClientes()},[])
  const rows=useMemo(()=>!clientesData?.content?[]:clientesData.content,[clientesData])
     
  //DeleteData
  const { response: deleteDataResponse, refetch: refetchDeleteData } = useDeleteDataClientes(selected?.id);
  useEffect(()=>{
     if(deleteDataResponse!==null){
       setOpenDialogEliminar(false);
       refetchClientes()
     }
  },[deleteDataResponse])
  const handleEliminarFila=()=>{
    refetchDeleteData()
  }

  return (
    <div   style={{
      width: "100vw",
      height: "100vh",
      display: "grid",
      gridTemplateRows: "50px auto 50px",
      backgroundColor: "#ffffff",
    }}>
      <Barra />
       <div style={{ ...fullDiv, flexDirection: "column", justifyContent:'center' }}>
        <div  style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
           
          }}>
          <span style={{ marginLeft: "30px", fontWeight: "bold" }}>
            Administración Clientes
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
}}            onClick={() => setOpenDialog(true)}
          >
            <img src={Mas}  style={{ width: "25px", height: "25px" }} />
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
        <div style={{ ...fullDiv, height: "60vh" }}>
         <FormularioCliente selected={selected} setOpenDialog={setOpenDialog} refetch={refetchClientes}/> 
        </div>
      </Dialog>
       <Dialog
        fullWidth
        maxWidth={"xs"}
        onClose={() => {setOpenDialogEliminar(false);setSelected(null)}}
        open={openDialogEliminar}
      >
        <div style={{ ...fullDiv,width:'calc(100% - 60px)',flexDirection:'column', height: "15vh",padding:'30px',fontSize:'20px',fontWeight:'bold' }}>
         ¿Desea eliminar el Cliente {selected?.apellido}, {selected?.nombre}?
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
export default AdminClientes;
