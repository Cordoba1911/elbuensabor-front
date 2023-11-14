import { fullDiv } from "../../App";
import { Button } from "@mui/material";

export const DialogFooter = ({ func,disabled=false }: { func: any,disabled?:any }) => {
  return (
    <div
      style={{
        ...fullDiv,
        height: "65px",
        alignItems: "center",
      }}
    >
      <Button
      disabled={disabled}
        sx={{
          "&:hover": { color: "white", backgroundColor: "darkblue" },
          color: "white",
          backgroundColor: "darkblue",
          width: "100px",
          height: "35px",
          marginLeft: "auto",
          marginRight: "15px",
        }}
      >
        Guardar
      </Button>
    </div>
  );
};
const DialogTitle = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        ...fullDiv,
        height: "50px",
        alignItems: "center",
        borderBottom: "1px solid black",
      }}
    >
      <span
        style={{ marginLeft: "30px", fontSize: "18px", fontWeight: "bold" }}
      >
        {title}
      </span>
    </div>
  );
};
export default DialogTitle;
