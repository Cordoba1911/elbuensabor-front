import { fullDiv } from "../../App";
import Barra from "../Barra";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import Footer from "../Footer";
import { IconButton, Dialog, Button } from "@mui/material";
import Mas from "../../Iconos/add.svg";
import FormularioCliente from "./FormularioCliente";
import { useMutation, useQuery } from "@tanstack/react-query";
import { customAxiosInstance } from "../../axiosService";
import { useSnackbar } from "notistack";
import './styles.css';

const AdminClientes = () => {
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
   const [rows, setRows] = useState([
     
   ]);
  const [openDialog, setOpenDialog] = useState(false);
   const [openDialogEliminar, setOpenDialogEliminar] = useState(false);
   const { enqueueSnackbar } = useSnackbar();

   const [selected,setSelected]=useState<any>(null)
   const {refetch}=useQuery(
    ['getAdminClientes'],
    () =>
      customAxiosInstance.get('api/v1/clientes/paged', {
        params: {
          page:0,
          size:5,
          sort:'id,asc'

        },
      
      }),
    {
     
      onSuccess: (res:any) => {
        setRows(res.data.content)
      },
      onError: (error: string) => {
        enqueueSnackbar(error, {
          variant: 'error',
        });
      },
    }
  );


  const mutationEliminarFila = useMutation(
    //!ESTA DATA ES EL ID
    (data: any) =>
      customAxiosInstance.delete(
        `/api/v1/clientes/${selected.id}`
      ),
    {
      onSuccess: () => {
        enqueueSnackbar('Correcto', {
          variant: 'success',
        });
        setOpenDialogEliminar(false)
        refetch()
      },
      onError: (error: string) => {
        enqueueSnackbar(error, {
          variant: 'error',
        });
      },
    }
    )
       
  const handleEliminarFila=()=>{
    mutationEliminarFila.mutate(
      selected.id
    )
  }


  return (
    <div className="container">
      <Barra />
       <div className="fullDiv">
        <div className="header">
          <span className="boldText">
            Administración Clientes
          </span>
          <IconButton
            className="iconButton"
            onClick={() => setOpenDialog(true)}
          >
            <img src={Mas} className="imgStyle" />
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
         <FormularioCliente selected={selected} setOpenDialog={setOpenDialog} refetch={refetch}/> 
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
