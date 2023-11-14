import { fullDiv } from "../../App";
import Barra from "../Barra";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import Footer from "../Footer";
import { IconButton, Dialog, Button } from "@mui/material";
import Mas from "../../Iconos/add.svg";
import FormularioRubros from "./FormularioRubros";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "@tanstack/react-query";
import { customAxiosInstance } from "../../axiosService";
const AdminRubro = () => {
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
      field: "Denominacion",
      headerName: "Denominacion",
      width: 200,
      editable: false,
      sortable: true,
    },
    
  ];
  const [rows, setRows] = useState([
    {
      id: 0,
      Denominacion: "Panificados",
   
    },
    {
      id: 1,
      Denominacion: "Carnes",
    
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [selected,setSelected]=useState<any>(null)
  //! ESTO HACE EL GET DE LAS FILAS Y LO SETEA EN EL ESTADO GETROWS PARA MOSTRARLO EN LA TABLA
  const {refetch}=useQuery(
    ['getAdminRubros'],
    () =>
      customAxiosInstance.get('ACA VA LA URL', {
        params: {
          // ACA VAN LOS PARAMETROS,
          returnType: 'json',
        },
      
      }),
    {
     
      onSuccess: (res:any) => {
       setRows(res)
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
      customAxiosInstance.post(
       'ACA LA URL ELIIMNAR',
        data
      ),
    {
      onSuccess: () => {
        enqueueSnackbar('Correcto', {
          variant: 'success',
        });
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
            Administración Rubros
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
        <div style={{ ...fullDiv, height: "30vh" }}>
          <FormularioRubros selected={selected} setOpenDialog={setOpenDialog} refetch={refetch}/>
        </div>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth={"xs"}
        onClose={() => {setOpenDialogEliminar(false);setSelected(null)}}
        open={openDialogEliminar}
      >
        <div style={{ ...fullDiv,width:'calc(100% - 60px)',flexDirection:'column', height: "15vh",padding:'30px',fontSize:'20px',fontWeight:'bold' }}>
         ¿Desea eliminar el Rubro {selected?.Denominacion}?
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
export default AdminRubro;
