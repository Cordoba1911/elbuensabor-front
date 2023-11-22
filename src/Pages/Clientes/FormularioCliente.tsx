import { useEffect, useState } from "react";
import { fullDiv } from "../../App";
import DialogTitle, { DialogFooter } from "../General/DialogTitle";
import { IconButton, TextField, Menu, MenuItem, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { customAxiosInstance } from "../../Services/axiosService";
import { useSnackbar } from "notistack";
import { usePostDataClientes } from "../../Services/apiServiceClientes";
import { RowCliente } from "./AdminClientes";
import {Dispatch,SetStateAction} from 'react'

const FormularioCliente = (
  {
    selected,
    setOpenDialog,
    refetch
  }:{
    selected:RowCliente|null,
    setOpenDialog:(value:boolean)=>void,
    refetch:()=>void
  }) => {
  //States
  const[input,setInput]=useState<RowCliente>({
    nombre:'',
    apellido:'',
    telefono:'',
    email:'',
    rol:'CLIENTE'
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
  const { response: postDataResponse, refetch: refetchPostData } = usePostDataClientes(
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
