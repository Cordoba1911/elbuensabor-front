import { useEffect, useState } from "react";
import { fullDiv } from "../../App";
import DialogTitle, { DialogFooter } from "../General/DialogTitle";
import { IconButton, TextField, Menu, MenuItem, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { customAxiosInstance } from "../../Services/axiosService";
import { useSnackbar } from "notistack";
import { usePostData } from "../../Services/apiService";
import { usePostDataEmpleados } from "../../Services/apiServiceEmpleados";
import { RowEmpleado } from "./AdminEmpleados";

const FormularioEmpleado = ({selected,setOpenDialog,refetch}:{selected:RowEmpleado|null,setOpenDialog:(value:boolean)=>void,refetch:()=>void}) => {
  //States
  const[input,setInput]=useState<RowEmpleado>({
    nombre:'',
    apellido:'',
    telefono:'',
    dni:'',
    rol:'EMPLEADO',
   
  })
  //Si se quiere editar data llena los campos
  useEffect(()=>{
    if(selected!==null){
      setInput(selected)
    }
  },[])
  //Cambiar el valor de los inputs
  const changeValue=(e:{target:{value:string}},atributo:string)=>{
    setInput((prev)=>({...prev,[atributo]:e.target.value}))
  }
  //PostData
 const { response: postDataResponse, refetch: refetchPostData } = usePostDataEmpleados(
  { ...input,dni:parseInt(input?.dni)}
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
