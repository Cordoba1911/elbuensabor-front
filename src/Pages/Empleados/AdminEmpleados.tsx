import { fullDiv } from "../../App";
import Barra from "../Barra";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import Footer from "../Footer";
import { IconButton, Dialog } from "@mui/material";
import Mas from "../../Iconos/add.svg";
import FormularioEmpleado from "./FormularioEmpleado";
const AdminEmpleados = () => {
  const columnas = [
    {
      field: "actions",
      type: "actions",
      width: 60,
      filterable: false,
      sortable: false,
      getActions: (params: { row: any }) => [
        <GridActionsCellItem
          label="Editar"
          // onClick={handleEditar(params.row)}
          showInMenu
          // icon={getIcono(listaIconos.edit)}
        />,
        <GridActionsCellItem
          label="Eliminar"
          // onClick={handleCancelar(params.row)}
          showInMenu
          // icon={getIcono(listaIconos.close)}
        />,
      ],
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 200,
      editable: false,
      sortable: true,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 300,
      editable: false,
      sortable: true,
    },
    {
      field: "Edad",
      headerName: "Edad",
      width: 200,
      editable: false,
      sortable: true,
    },
    {
      field: "Documento",
      headerName: "Documento",
      width: 140,
      editable: false,
      sortable: true,
    },
  ];
  const [rows, setRows] = useState([
    {
      id: 0,
      Nombre: "Juan",
      Email: "mailexample@gmail.com",
      Edad: 25,
      Documento: "43213232",
    },
    {
      id: 1,
      Nombre: "Pepe",
      Email: "mailexample@gmail.com",
      Edad: 32,
      Documento: "23423232",
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "50px auto 50px",
        backgroundColor: "rgb(242 234 225)",
      }}
    >
      <Barra />
      <div style={{ ...fullDiv, flexDirection: "column" }}>
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginLeft: "30px", fontWeight: "bold" }}>
            Administración Empleados
          </span>
          <IconButton
            sx={{
              marginLeft: "auto",
              marginRight: "30px",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setOpenDialog(true)}
          >
            <img src={Mas} style={{ width: "25px", height: "25px" }} />
          </IconButton>
        </div>
        <DataGrid
          // loading={isLoading}
          columns={columnas}
          rows={rows}
          // components={{
          //   LoadingOverlay: LoaderCentrado,
          // }}
          // rowHeight={GetConfig('Personas', 'rowHeight')}
          // getRowId={(row) => row.Id}
          // rows={rows}
          // rowCount={rowCount}
          // sortingMode="server"
          // sortModel={sortModel}
          // onSortModelChange={handleSortModelChange}
          // paginationMode="server"
          // onPageChange={handlePageChange}
          // page={pagina}
          // onPageSizeChange={handlePageSizeChange}
          // pageSize={numeroFilas}
          // pagination
          // onSelectionModelChange={(selection) => {
          //   if (selection.length <= 1) return setSelectedRow(selection);
          //   return setSelectedRow(
          //     selection.filter((row) => row !== selectedRow[0])
          //   );
          // }}
          // selectionModel={selectedRow}
        />
      </div>
      <Footer />
      <Dialog
        fullWidth
        maxWidth={"xs"}
        onClose={() => setOpenDialog(false)}
        open={openDialog}
      >
        <div style={{ ...fullDiv, height: "80vh" }}>
          <FormularioEmpleado />
        </div>
      </Dialog>
    </div>
  );
};
export default AdminEmpleados;
