import { useEffect, useState } from "react";
import { fullDiv } from "../../App";
import DialogTitle, { DialogFooter } from "../General/DialogTitle";
import { IconButton, TextField, Menu, MenuItem, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { customAxiosInstance } from "../../axiosService";
import { useSnackbar } from "notistack";

const FormularioManufacturado = ({selected,setOpenDialog,refetch}:{selected:any,setOpenDialog:any,refetch:any}) => {
  const[input,setInput]=useState({
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
  const changeValue=(e:any,atributo:string)=>{
    setInput((prev)=>({...prev,[atributo]:e.target.value}))
  }
 const {enqueueSnackbar}=useSnackbar()
  const mutationGuardar = useMutation(
    
    (data: any) =>
      customAxiosInstance.post(
       '/api/v1/articuloManufacturados',
       { ...data,
        precioVenta:parseInt(data.precioVenta),
        tiempoEstimadoCocina:parseInt(data.tiempoEstimadoCocina),
        costo:parseInt(data.costo),}
      ),
    {
      onSuccess: (data) => {
        enqueueSnackbar('Correcto', {
          variant: 'success',
        });
        setOpenDialog()
        refetch()
      },
      onError: (error: string) => {
        enqueueSnackbar(error, {
          variant: 'error',
        });
      },
    }
    )
       
  const handleGuardar=()=>{
    mutationGuardar.mutate(
      input//ESTO SE VE
    )
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
