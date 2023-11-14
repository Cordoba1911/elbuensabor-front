import { useEffect, useState } from "react";
import { fullDiv } from "../../App";
import DialogTitle, { DialogFooter } from "../General/DialogTitle";
import { IconButton, TextField, Menu, MenuItem } from "@mui/material";
import { useQuery } from "react-query";

const FormularioRubros = ({selected}:{selected:any}) => {
  const[input,setInput]=useState({
    Nombre:'',
    Apellido:'',
    Direccion:'',
    Departamento:'',
    Telefono:'',
    Email:'',
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
 
 
  return (
    <div style={{ ...fullDiv, flexDirection: "column" }}>
      <DialogTitle title={"Empleados"} />
      <div
        style={{ ...fullDiv,width:'calc(100% - 40px)', display: "grid", gridTemplateRows:'repeat(9,calc(100% / 9))',
        alignItems:'center',paddingLeft:'20px',paddingRight:'20px' }}
      >
        <TextField label={'Nombre'} value={input.Nombre} onChange={(e)=>changeValue(e,'Nombre')} error={!input.Nombre}/>
        <TextField label={'Apellido'} value={input.Apellido} onChange={(e)=>changeValue(e,'Apellido')}  error={!input.Apellido}/>
        <TextField label={'Direccion'} value={input.Direccion} onChange={(e)=>changeValue(e,'Direccion')}  error={!input.Direccion}/>
        <TextField label={'Departamento'} value={input.Departamento} onChange={(e)=>changeValue(e,'Departamento')}  error={!input.Departamento}/>
        <TextField label={'Telefono'} value={input.Telefono} onChange={(e)=>changeValue(e,'Telefono')}  error={!input.Telefono}/>
        <TextField label={'Email'} value={input.Email} onChange={(e)=>changeValue(e,'Email')}  error={!input.Email}/>
        <TextField label={'Contraseña'} value={input.Contraseña} type={"password"} onChange={(e)=>changeValue(e,'Contraseña')}  error={!input.Contraseña}/>
        <TextField label={'Repetir Contraseña'} value={input.RepetirContraseña} type={"password"} onChange={(e)=>changeValue(e,'RepetirContraseña')}  error={!input.RepetirContraseña||input.Contraseña!==input.RepetirContraseña}/>
        <TextField label={'Rol'}/>
      </div>
      <DialogFooter func={() => {}} />
    </div>
  );
};
export default FormularioRubros;
