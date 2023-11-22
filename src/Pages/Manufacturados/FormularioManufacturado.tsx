import { useEffect, useState } from "react";
import { fullDiv } from "../../App";
import DialogTitle, { DialogFooter } from "../General/DialogTitle";
import { IconButton, TextField, Menu, MenuItem, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { customAxiosInstance } from "../../Services/axiosService";
import { useSnackbar } from "notistack";
import { usePostDataManufacturados } from "../../Services/apiServiceManufacturados";
import { RowManuf } from "./AdminManufacturados";

const FormularioManufacturado = ({selected,setOpenDialog,refetch}:{selected:RowManuf|null,setOpenDialog:(value:boolean)=>void,refetch:()=>void}) => {
  const[input,setInput]=useState<RowManuf>({
    denominacion:'',
    precioVenta:'',
    tiempoEstimadoCocina:'',
    costo:'',
    receta:'',
   
  })
 
  useEffect(()=>{
    if(selected!==null){
      setInput(selected)
    }
  },[])
  const changeValue=(e:{target:{value:string}},atributo:string)=>{
    setInput((prev)=>({...prev,[atributo]:e.target.value}))
  }
  const { response: postDataResponse, refetch: refetchPostData } = usePostDataManufacturados(
    input
  );
  
    useEffect(()=>{
      if(postDataResponse!==null){
        setOpenDialog(false);
        refetch()
      }
     },[postDataResponse])
    const handleGuardar=()=>{
      refetchPostData()
      
    }
  return (
    <div style={{ ...fullDiv, flexDirection: "column" }}>
      <DialogTitle title={"Empleados"} />
      <div
        style={{ ...fullDiv,width:'calc(100% - 40px)', display: "grid", gridTemplateRows:'repeat(7,calc(100% / 7))',
        alignItems:'center',paddingLeft:'20px',paddingRight:'20px' }}
      >
        <TextField label={'Denominacion'} value={input.denominacion} onChange={(e)=>changeValue(e,'denominacion')} error={!input.denominacion}/>
        <TextField label={'Precio de Venta'} value={input.precioVenta} onChange={(e)=>changeValue(e,'precioVenta')}  error={!input.precioVenta}/>
        <TextField label={'Tiempo Estimado de Cocina'} value={input.tiempoEstimadoCocina} onChange={(e)=>changeValue(e,'tiempoEstimadoCocina')}  error={!input.tiempoEstimadoCocina}/>
        <TextField label={'Costo'} value={input.costo} onChange={(e)=>changeValue(e,'costo')}  error={!input.costo}/>
        <TextField label={'Receta'} value={input.receta} onChange={(e)=>changeValue(e,'receta')}  error={!input.receta}/>
      </div>
      <Button onClick={()=>handleGuardar()}>Guardar</Button>
    </div>
  );
};
export default FormularioManufacturado;
