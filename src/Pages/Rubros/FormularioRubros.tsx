import { useEffect, useState } from "react";
import { fullDiv } from "../../App";
import DialogTitle, { DialogFooter } from "../General/DialogTitle";
import { IconButton, TextField, Menu, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { customAxiosInstance } from "../../axiosService";

const FormularioRubros = ({selected,setOpenDialog,refetch}:{selected:any,setOpenDialog:any,refetch:any}) => {
  const[input,setInput]=useState({
    Denominacion:'',
  
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
      <DialogTitle title={"Rubros"} />
      <div
        style={{ ...fullDiv,width:'calc(100% - 40px)', display: "grid", gridTemplateRows:'repeat(1,calc(100% / 1))',
        alignItems:'center',paddingLeft:'20px',paddingRight:'20px' }}
      >
      
        <TextField label={'Denominacion'} value={input.Denominacion} onChange={(e)=>changeValue(e,'Denominacion')}  error={!input.Denominacion}/>
        
      </div>
      <DialogFooter func={() => {}} />
    </div>
  );
};
export default FormularioRubros;
