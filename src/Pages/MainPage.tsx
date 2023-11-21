import { useEffect, useState } from "react";
import { fullDiv } from "../App";
import Carousel from 'react-material-ui-carousel'

import Barra from "./Barra";
import { Paper,Button } from "@mui/material";
import Hamburguesa from '../Componentes/Imagenes/hamburguesa.jpg'
import Fideos from '../Componentes/Imagenes/fideos.jpg'
import Tacos from '../Componentes/Imagenes/taco.jpg'
import Empanadas from '../Componentes/Imagenes/empanada.jpg'
import Lomo from '../Componentes/Imagenes/lomo.jpg'
import Milanesa from '../Componentes/Imagenes/milanesa.jpg'
import Piza from '../Componentes/Imagenes/piza.jpg'
import Sanguche from '../Componentes/Imagenes/sanguche.jpg'
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
 
 

  const items = [
    {
       
        path: Hamburguesa,
        descripcion:'Hamburguesa con queso',
        precio:1500
    },
    {
       path:Fideos,
       descripcion:'Fideos',
       precio:1000
    }, 
    {
      path:Tacos,
      descripcion:'Tacos de carne',precio:1500
   },
   {
       
    path: Lomo,
    descripcion:'Lomo',precio:1500
  },
  {
   path:Empanadas,
   descripcion:'Empanadas',precio:1500

  }, {
  path:Sanguche,
  descripcion:'Sanguches de miga',precio:1500
},
{
   path:Piza,
   descripcion:'Piza',precio:1500
}, {
 path:Milanesa,
  descripcion:'Milanesa con papas',precio:1500
}
]
const navigate = useNavigate();
const token=window.localStorage.getItem('token')
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        overflow:'hidden',
        gridTemplateRows: "50px calc(100vh - 100px) 50px",
      }}
    >
      <Barra />
      <div style={{  width:'100%', height:'100%',display:'grid',gridTemplateColumns:'30% 30% 40%',gridTemplateRows:'repeat(4,25%)', alignItems:'center', justifyContent:'center',justifyItems:'center' }}>
     {items.map((item,i)=>
     <div  style={{gridColumn:i%2===0?'1':'2',width:'calc(100% - 100px)', height:'calc(100% - 100px)', display:'flex',padding:'50px'}}>
        <img src={item.path} style={{ width: "200px", height: "100%",borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px',boxShadow:'0px 5px 5px #00000050' }} />
<div style={{alignItems:'center',borderTopRightRadius:'10px',borderBottomRightRadius:'10px',boxShadow:'0px 5px 5px #00000050',width:'calc(100% - 40px)', height:'calc(100% - 40px)',display:'grid',gridTemplateRows:'33% 33% 33%', backgroundColor:'lightgray',padding:'20px'}} >
  <span>{item.descripcion}</span>
  <span>{`Precio: $${item.precio}`}</span>
  <Button onClick={()=>{
    if(token===null||token===""){
      
      window.localStorage.setItem('from',"Login")

        navigate("/Login");
     
    }
  }} sx={{marginLeft:'auto'}}>Comprar</Button>
</div>
     </div>)}
         <div style={{width:'100%', height:'100%',display:'flex',gridColumn:'3',gridRow:'1/5',alignItems:'center', justifyContent:'center' }}>
       <Carousel  sx={{width:'80%', height:'80%'}}>
            {items.map( (item, i) => 
            <Paper sx={{width:'100%', height:'54vh',display:'flex',borderRadius:'10px'}}>
              <img src={item.path} style={{ width: "100%", height: "100%",borderRadius:'10px',boxShadow:'0px 5px 5px #00000050' }} />

            </Paper>)
            }
        </Carousel> 
        </div>
      
      </div>
   <Footer/>
    </div>
  );
};
export default MainPage;
