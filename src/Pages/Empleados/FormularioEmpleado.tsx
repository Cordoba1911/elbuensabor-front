import { useEffect, useState } from "react";
import { fullDiv } from "../../App";
import DialogTitle, { DialogFooter } from "../General/DialogTitle";
import { IconButton, TextField, Menu, MenuItem, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { customAxiosInstance } from "../../axiosService";
import { useSnackbar } from "notistack";

const FormularioEmpleado = ({selected,setOpenDialog,refetch}:{selected:any,setOpenDialog:any,refetch:any}) => {
  const[input,setInput]=useState({
    nombre:'',
    apellido:'',
    telefono:'',
    dni:'',
    rol:'EMPLEADO',
   
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
       '/api/v1/empleados',
       { ...data,dni:parseInt(data.dni)}
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
        <TextField label={'Nombre'} value={input.nombre} onChange={(e)=>changeValue(e,'nombre')} error={!input.nombre}/>
        <TextField label={'Apellido'} value={input.apellido} onChange={(e)=>changeValue(e,'apellido')}  error={!input.apellido}/>
        <TextField label={'Telefono'} value={input.telefono} onChange={(e)=>changeValue(e,'telefono')}  error={!input.telefono}/>
        <TextField label={'Dni'} value={input.dni} onChange={(e)=>changeValue(e,'dni')}  error={!input.dni}/>
        <TextField label={'Rol'} value={input.rol} disabled/>
      </div>
      <Button onClick={()=>handleGuardar()}>Guardar</Button>
    </div>
  );
};
export default FormularioEmpleado;
