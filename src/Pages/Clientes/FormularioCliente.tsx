import { useEffect, useState } from "react";
import { fullDiv } from "../../App";
import DialogTitle, { DialogFooter } from "../General/DialogTitle";
import { IconButton, TextField, Menu, MenuItem } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { customAxiosInstance } from "../../axiosService";
import { useSnackbar } from "notistack";

const FormularioCliente = ({selected,setOpenDialog,refetch}:{selected:any,setOpenDialog:any,refetch:any}) => {
  const[input,setInput]=useState({
    Nombre:'',
    Apellido:'',
    Direccion:'',
    Telefono:'',
    Email:'',
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
      <DialogTitle title={"Clientes"} />
      <div
        style={{ ...fullDiv,width:'calc(100% - 40px)', display: "grid", gridTemplateRows:'repeat(5,calc(100% / 5))',
        alignItems:'center',paddingLeft:'20px',paddingRight:'20px' }}
      >
        <TextField label={'Nombre'} value={input.Nombre} onChange={(e)=>changeValue(e,'Nombre')} error={!input.Nombre}/>
        <TextField label={'Apellido'} value={input.Apellido} onChange={(e)=>changeValue(e,'Apellido')}  error={!input.Apellido}/>
        <TextField label={'Direccion'} value={input.Direccion} onChange={(e)=>changeValue(e,'Direccion')}  error={!input.Direccion}/>
        <TextField label={'Telefono'} value={input.Telefono} onChange={(e)=>changeValue(e,'Telefono')}  error={!input.Telefono}/>
        <TextField label={'Email'} value={input.Email} onChange={(e)=>changeValue(e,'Email')}  error={!input.Email}/>
      </div>
      <DialogFooter func={() => {}} />
    </div>
  );
};
export default FormularioCliente;
