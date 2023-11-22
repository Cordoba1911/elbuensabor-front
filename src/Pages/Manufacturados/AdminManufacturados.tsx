import { fullDiv } from "../../App";
import Barra from "../Barra";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useState,useMemo,useEffect } from "react";
import Footer from "../Footer";
import { IconButton, Dialog, Button } from "@mui/material";
import Mas from "../../Iconos/add.svg";
import FormularioManufacturado from "./FormularioManufacturado";
import { customAxiosInstance } from "../../Services/axiosService";
import { useSnackbar } from "notistack";
import { useDeleteDataManufacturados, useGetDataManufacturados } from "../../Services/apiServiceManufacturados";
export interface RowManuf{
  id?:number;
  precioVenta:string;
    tiempoEstimadoCocina:string;
    costo:string;
    receta:string;
  denominacion:string
}
const AdminManufacturado = () => {
  const handleEditar=(row:RowManuf)=>{
    setSelected(row);
    setOpenDialog(true)
  }
  const handleEliminar=(row:RowManuf)=>{
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
      getActions: (params: { row: RowManuf }) => [
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
      field: "denominacion",
      headerName: "Denominacion",
      width: 200,
      editable: false,
      sortable: true,
    },
    {
      field: "precioVenta",
      headerName: "Precio de Venta",
      width: 300,
      editable: false,
      sortable: true,
    },
    {
      field: "tiempoEstimadoCocina",
      headerName: "Tiempo Estimado de Cocina",
      width: 200,
      editable: false,
      sortable: true,
    },
    {
      field: "costo",
      headerName: "costo",
      width: 140,
      editable: false,
      sortable: true,
    }, {
      field: "receta",
      headerName: "Receta",
      width: 140,
      editable: false,
      sortable: true,
    },
  ];
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEliminar, setOpenDialogEliminar] = useState(false);
  const [selected,setSelected]=useState<RowManuf|null>(null)
  //! ESTO HACE EL GET DE LAS FILAS Y LO SETEA EN EL ESTADO GETROWS PARA MOSTRARLO EN LA TABLA
  const { data: manufacturadosData, refetch: refetchManufacturados } = useGetDataManufacturados({
    page: 0,
    size: 10,})
 
  useEffect(()=>{refetchManufacturados()},[])
  const rows=useMemo(()=>!manufacturadosData?.content?[]:manufacturadosData.content,[manufacturadosData])
   

  const { response: deleteDataResponse, refetch: refetchDeleteData } = useDeleteDataManufacturados(selected?.id);

       useEffect(()=>{
        if(deleteDataResponse!==null){
          setOpenDialogEliminar(false);
          refetchManufacturados()
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
            Administración Articulo Manufacturado
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
          <FormularioManufacturado selected={selected} setOpenDialog={setOpenDialog} refetch={refetchManufacturados}/>
        </div>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth={"xs"}
        onClose={() => {setOpenDialogEliminar(false);setSelected(null)}}
        open={openDialogEliminar}
      >
        <div style={{ ...fullDiv,width:'calc(100% - 60px)',flexDirection:'column', height: "15vh",padding:'30px',fontSize:'20px',fontWeight:'bold' }}>
         ¿Desea eliminar el Articulo Manufacturado {selected?.denominacion}?
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
export default AdminManufacturado;
