import { useEffect, useState } from "react";
import { fullDiv } from "../../App";
import DialogTitle, { DialogFooter } from "../General/DialogTitle";
import { IconButton, TextField, Menu, MenuItem, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { customAxiosInstance } from "../../Services/axiosService";
import { usePostDataRubros } from "../../Services/apiServiceRubros";
import { RowRubros } from "./AdminRubros";

const FormularioRubros = ({selected,setOpenDialog,refetch}:{selected:RowRubros|null,setOpenDialog:(value:boolean)=>void,refetch:()=>void}) => {
  const[input,setInput]=useState({
    denominacion:'',
  
  })
  useEffect(()=>{
    if(selected!==null){
      setInput(selected)
    }
  },[])
  const changeValue=(e:{target:{value:string}},atributo:string)=>{
    setInput((prev)=>({...prev,[atributo]:e.target.value}))
  }
 
  const { response: postDataResponse, refetch: refetchPostData } = usePostDataRubros(
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
      <DialogTitle title={"Rubros"} />
      <div
        style={{ ...fullDiv,width:'calc(100% - 40px)', display: "grid", gridTemplateRows:'repeat(1,calc(100% / 1))',
        alignItems:'center',paddingLeft:'20px',paddingRight:'20px' }}
      >
      
        <TextField label={'Denominacion'} value={input.denominacion} onChange={(e)=>changeValue(e,'denominacion')}  error={!input.denominacion}/>
        
      </div>
      <Button onClick={()=>handleGuardar()}>Guardar</Button>
    </div>
  );
};
export default FormularioRubros;
