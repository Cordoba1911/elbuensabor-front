import { useState } from "react";
import { fullDiv } from "../App";
import Carousel from 'react-material-ui-carousel'

import Barra from "./Barra";
import { Paper } from "@mui/material";
import { Button } from "@mui/base";
import Hamburguesa from '../Componentes/Imagenes/hamburguesa.jpg'
import Fideos from '../Componentes/Imagenes/fideos.jpg'
import Tacos from '../Componentes/Imagenes/taco.jpg'
import Footer from "./Footer";

const MainPage = () => {
  const items = [
    {
       
        path: Hamburguesa
    },
    {
       path:Fideos
    }, {
      path:Tacos
   }
]
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "50px auto 50px",
      }}
    >
      <Barra />
      <div style={{ width:'100%', height:'100%', display:'grid', gridTemplateColumns:'50% 50%', alignItems:'center', justifyContent:'center',justifyItems:'center' }}>
        <div style={{width:'70%', height:'70%',display:'flex', }}>
        <Carousel  sx={{width:'100%', height:'100%'}}>
            {items.map( (item, i) => 
            <Paper sx={{width:'100%', height:'54vh',display:'flex',borderRadius:'10px'}}>
              <img src={item.path} style={{ width: "100%", height: "100%",borderRadius:'10px',boxShadow:'0px 5px 5px #00000050' }} />

            </Paper>)
            }
        </Carousel>
        </div>
        <div  style={{width:'60%', height:'50%',display:'flex',marginRight:'auto',fontSize:'40px',color:'#ff6347',fontWeight:'bold'}}>
          Veni a disfrutar de los mejores sabores de la provincia, o te lo llevamos directo a tu casa
        </div>

      </div>
   <Footer/>
    </div>
  );
};
export default MainPage;
