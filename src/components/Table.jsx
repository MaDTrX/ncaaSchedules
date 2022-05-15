import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'schoolName', headerName: 'schoolName', width: 200 },
  { field: 'compEventName', headerName: 'compEventName', width: 200 },
  { field: 'compEventDate', headerName: 'compEventDate', width: 200 },
  { field: 'compEventTime', headerName: 'compEventTime', width: 200 },
];


export default function DataTable({data, checked,}) {

  function handleStyle() {
    if (checked) {
      return 'black'
    }
    else {
      return 'white'
    }
  }
  function handleTextColor() {
    if (checked) {
      return 'white'
    } else {
      return 'black'
    }
  }

return  (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={data}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        sx={{background: handleStyle, color: handleTextColor}}
        
      />
    </div>
  );
}