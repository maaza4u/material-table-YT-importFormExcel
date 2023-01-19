import * as React from 'react'
import { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'




const MapColumns = (props) => {


  useEffect(() => {
    mappedData()
  },[] )

 
  
    const mappedData = () => {
      let mappedArray = [...props.databaseCols]
      // console.log(mappedData);
      for (let i = 0; i < props.databaseCols.length; i++) {
        for (let j = 0; j < props.rows[0].length; j++) {
          if (props.databaseCols[i].title === props.rows[0][j]) {
            mappedArray[i].field = props.rows[0][j]
            // console.log('x', databaseCols[i].field)
          }
        }
        props.setDatabaseCols(mappedArray)
      }
      
    }
  
    const dataMapper = (event,index) => {
      console.log()
      let mappedArray = [...props.databaseCols]
      mappedArray[index].field = event?.target?.value
      props.setDatabaseCols(mappedArray)
  
  
    }
  
  
    return (
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead></TableHead>
            <TableBody> 
              {props.databaseCols.map((updatedcols, index) => (
                <TableRow
                  key={updatedcols.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {updatedcols.title}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    
  
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label"></InputLabel>
                     
                      <Select
                        value={updatedcols.field}
                        label= ''
                       
                     
                        onChange={(e) => (dataMapper(e,index))}
                      >
                        {props.rows[0].map((col) => (
                          <MenuItem 
                          value={col}
                          key={col}
                          >
                            {col}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
             </TableBody>
          </Table>
        </TableContainer> 
      </div>
    )
  }
  
  export default MapColumns;






// import React from "react"
// import { GlueStick } from "gluestick-elements";
// import "gluestick-elements/dist/index.css";

// import Swal from "sweetalert2/dist/sweetalert2.js";
// import "sweetalert2/src/sweetalert2.scss";

// export default function MapColumns() {
//   return (
//     <div>
//       <div style={{ padding: 10 }}>
//         <p>
//           This demo shows how you can use gluestick to offer intuitive
//           spreadsheet uploads and mapping.
//         </p>
//         <a
//           href="https://cdn.statically.io/gh/hotgluexyz/recipes/master/src/sync-output/Lead-20210128T125258.csv"
//           download
//         >
//           Download a sample file here.
//         </a>
//       </div>
//       <GlueStick
//         user={"default"}
//         onImport={(user, filename) => {
//           Swal.fire(
//             `Data imported`,
//             `Your data has been imported successfully. Thanks for completing the gluestick demo!`,
//             "success"
//           );
//         }}
//         endpoint={"https://gluestick-api.herokuapp.com"}
//         schema={{
//           fields: [
//             {
//               col: "Name",
//               key: "name"
//             },
//             {
//               col: "Phone Number",
//               key: "phoneNumber",
//               validator: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
//                 .source
//             }
//           ]
//         }}
//       />
//     </div>
//   );
// }



// const columns = ['Title', 'Author', 'Rating'];
// export const BookshelfListRow = (props) => {
//     return (
//       <tr className="table-row">
//       {
//         columns.map((column, i) => (
//           <td>
//             <input onChange={ e => props.Update(column, e.target.value) } placeholder={ props.updatedcols[column] } />
//           </td>
//         ))
//       }
//       </tr>
//     )
//   }