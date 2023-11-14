import { useEffect, useState } from "react";
import { fullDiv } from "../../App";
import DialogTitle, { DialogFooter } from "../General/DialogTitle";
import { IconButton, TextField, Menu, MenuItem } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { customAxiosInstance } from "../../axiosService";
import { useSnackbar } from "notistack";

const FormularioEmpleado = ({selected,setOpenDialog,refetch}:{selected:any,setOpenDialog:any,refetch:any}) => {
  const[input,setInput]=useState({
    Nombre:'',
    Apellido:'',
    Telefono:'',
    Documento:'',
    Contraseña:'',
    RepetirContraseña:''
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
    //!ESTA DATA ES EL ID
    (data: any) =>
      customAxiosInstance.post(
       'ACA LA URL ELIIMNAR',
        data
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
        <TextField label={'Nombre'} value={input.Nombre} onChange={(e)=>changeValue(e,'Nombre')} error={!input.Nombre}/>
        <TextField label={'Apellido'} value={input.Apellido} onChange={(e)=>changeValue(e,'Apellido')}  error={!input.Apellido}/>
        <TextField label={'Telefono'} value={input.Telefono} onChange={(e)=>changeValue(e,'Telefono')}  error={!input.Telefono}/>
        <TextField label={'Documento'} value={input.Documento} onChange={(e)=>changeValue(e,'Documento')}  error={!input.Documento}/>
        <TextField label={'Contraseña'} value={input.Contraseña} type={"password"} onChange={(e)=>changeValue(e,'Contraseña')}  error={!input.Contraseña}/>
        <TextField label={'Repetir Contraseña'} value={input.RepetirContraseña} type={"password"} onChange={(e)=>changeValue(e,'RepetirContraseña')}  error={!input.RepetirContraseña||input.Contraseña!==input.RepetirContraseña}/>
        <TextField label={'Rol'}/>
      </div>
      <DialogFooter func={() => {handleGuardar()}} />
    </div>
  );
};
export default FormularioEmpleado;
