import { useEffect, useState } from "react";
import { fullDiv } from "../../App";
import DialogTitle, { DialogFooter } from "../General/DialogTitle";
import { IconButton, TextField, Menu, MenuItem, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { customAxiosInstance } from "../../axiosService";
import { useSnackbar } from "notistack";

const FormularioCliente = ({selected,setOpenDialog,refetch}:{selected:any,setOpenDialog:any,refetch:any}) => {
  const[input,setInput]=useState({
    nombre:'',
    apellido:'',
  
    telefono:'',
    email:'',
    rol:'CLIENTE'
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
        '/api/v1/clientes',
       data,
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
      <DialogTitle title={"Clientes"} />
      <div
        style={{ ...fullDiv,width:'calc(100% - 40px)', display: "grid", gridTemplateRows:'repeat(5,calc(100% / 5))',
        alignItems:'center',paddingLeft:'20px',paddingRight:'20px' }}
      >
        <TextField label={'Nombre'} value={input.nombre} onChange={(e)=>changeValue(e,'nombre')} error={!input.nombre}/>
        <TextField label={'Apellido'} value={input.apellido} onChange={(e)=>changeValue(e,'apellido')}  error={!input.apellido}/>
        <TextField label={'Telefono'} value={input.telefono} onChange={(e)=>changeValue(e,'telefono')}  error={!input.telefono}/>
        <TextField label={'Email'} value={input.email} onChange={(e)=>changeValue(e,'email')}  error={!input.email}/>
      </div>
      <Button onClick={()=>handleGuardar()}>Guardar</Button>
    </div>
  );
};
export default FormularioCliente;
