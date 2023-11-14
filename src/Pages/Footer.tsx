import { InputAdornment, TextField,Button, IconButton } from "@mui/material";
import { fullDiv } from "../App";
import Logo from '../Iconos/Logo.svg'
import { useState } from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer = () => {
  const [email,setEmail]=useState('')
  return <div style={{ ...fullDiv, backgroundColor: "rgb(51 51 51)",display:'grid', gridTemplateColumns:'100px auto 300px',alignItems:'center' }}>
     <img src={Logo} style={{ width: "50px", height: "50px",marginLeft:'30px' }} />
    <div style={{height:'33px'}}> 
    <TextField
        sx={{
         
          width: "400px",
          backgroundColor: "#E5E5E5",
          marginLeft: "50px",
          borderTopLeftRadius: "6px",
          borderBottomLeftRadius: "6px",

          "& .MuiOutlinedInput-input": {
            padding: "5px 5px 5px 10px !important",
          },
        }}
       
        placeholder="Ingrese su Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button sx={{'&: hover':{color:'white',backgroundColor:'#ff6347'},color:'white',backgroundColor:'#ff6347', 
      height:'100%', width:'200px'}}>Submit
      </Button>
     
  </div>
  <div style={{...fullDiv,alignItems:'center', justifyContent:'space-between',}}>
    <IconButton onClick={()=>window.open("https://twitter.com/?lang=es")}><TwitterIcon sx={{fill:'#ff6347'}}/></IconButton>
    <IconButton onClick={()=>window.open("https://www.facebook.com/?locale=es_LA")}><FacebookIcon  sx={{fill:'#ff6347'}}/></IconButton>
    <IconButton onClick={()=>window.open("https://www.instagram.com/")} sx={{marginRight:'100px'}}><InstagramIcon  sx={{fill:'#ff6347'}}/></IconButton>
  </div></div>
};
export default Footer;
