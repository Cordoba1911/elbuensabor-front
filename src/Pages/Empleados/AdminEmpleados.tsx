import { fullDiv } from "../../App";
import Barra from "../Barra";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
const AdminEmpleados = () => {
  const columnas = [
    {
      field: "Nombre",
      headerName: "Nombre",
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
    { id: 0, Nombre: "Juan", Edad: 25, Documento: "43213232" },
    { id: 0, Nombre: "Pepe", Edad: 32, Documento: "23423232" },
  ]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "50px auto 100px",
      }}
    >
      <Barra />
      <div style={{ ...fullDiv, backgroundColor: "red" }}>
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
    </div>
  );
};
export default AdminEmpleados;
