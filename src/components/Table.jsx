import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const dateComparator = (v1, v2) => new Date(v1) - new Date(v2)
export default function DataTable({data, checked,}) {

  const columns = React.useMemo(() => 
  [
   { field: 'compEventName', headerName: 'SCHOOL', width: 200 },
   { field: 'isNeutral', headerName: '', width: 50},
   { field: 'schoolName', headerName: 'EVENT', width: 200 },
   { field: 'compEventDate', headerName: 'DATE', type: 'date', sortComparator: dateComparator,  width: 200 },
   { field: 'compEventTime', headerName: 'TIME', width: 200 },
   { field: 'mfb', headerName: 'SUBDIVISION', width: 200 },
  ],
  [])

  function handleStyle() {
    if (checked) {
      return 'rgb(247, 247, 247)'
    }
    else {
      return 'rgb(232, 240, 242)'
    }
  }
  function handleTextColor() {
    if (checked) {
      return 'rgb(57, 62, 70)'
    } else {
      return 'rgb(57, 62, 70)'
    }
  }

return  (
    <div style={{ width: '80%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={data}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [
              {
                field: 'compEventDate',
                sort: 'asc',
              },
            ],
          },
        }}
        pageSize={12}
        rowsPerPageOptions={[12]}
        sx={{background: handleStyle, color: handleTextColor, width:'100%', height: '80vh'}}
      />
    </div>
  );
}