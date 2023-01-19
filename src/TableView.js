import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const TableView = (props) => {
  console.log(props.databaseCols)
  return (
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>leaseId</TableCell>
            <TableCell>tenant</TableCell>
            <TableCell>tenantTypeName</TableCell>
            <TableCell>LeaseExecutionDate</TableCell>
            <TableCell>LeaseCommencementDate</TableCell>
            <TableCell>LeaseSourceTypeName</TableCell>
          </TableRow>
        </TableHead>
        {props.databaseCols.map((updatedcols) => (
            <TableCell
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope="col" align='left' >{updatedcols.field}</TableCell>
            </TableCell>
          ))}
        
      </Table>
    </TableContainer>
  );
}

export {TableView}

















// import * as React from 'react';
// import { useState } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableColumn from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import './index.css';
// import { TableRow } from '@material-ui/core';

// const TableView = (props) => {
  

//   return (
//     <div>
//        <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="simple table">
//             <TableHead></TableHead>
//             <TableBody> 
//               {props.databaseCols.map((updatedcols, index) => (
//                 <TableColumn
//                   key={updatedcols.id}
//                   sx={{ '&:last-child th, &:last-child td': { border: 0 } }}
//                 >
//                   <TableCell component="td" scope="col">
//                     {updatedcols.field}
//                   </TableCell>
//                   <TableCell component="td" scope="col">
//                   <TableRow
                       
                        
                       
                     
// >
//                         {props.rows[0].map((databaseCols) => (
//                           <Table
                         
//                           >
//                             {databaseCols}
//                           </Table>
//                         ))}
//                       </TableRow>
  
                    
//                   </TableCell>
//                 </TableColumn>
//               ))}
//              </TableBody>
//           </Table>
//         </TableContainer> 
//         </div>
//   )

//           }
// export {TableView}


{/* <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
    
    <TableBody>
      {props.rows.map((databaseCols, Index) => (      
          <TableRow
            key={.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {props.databaseCols.map((row, rowindex) => (
               row.field === props.rows[rowindex] ? (
                <TableCell component="th" scope="row"
                key={rowindex}
                >
                 {databaseCols.field}
                </TableCell>
              ):<> 
               <TableCell component="th" scope="row"
                >
                  {updatedcols}
                </TableCell>
              </>
            ))}

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
        */}

        // <TableHead>
        // {props.databaseCols.map((column, index) => (
        //         <TableRow>
                  
        //             <TableCell
        //               key={index}
        //               style={{ minWidth: column.width }}
        //             >
        //               {column}
        //             </TableCell>
                  
        //         </TableRow>
        //         ))}
        //       </TableHead>
        //       <TableBody>
        //         {props.updatedcols.map((row, rowindex) => {
        //           return (
        //             <React.Fragment key={rowindex}>
                      
        //                 {props.databaseCols.map((column, columnIndex) => {
        //                   return (
        //                     <React.Fragment key={columnIndex}>
        //                       <TableCell
        //                         id={`cell-${rowindex}-${column.field}`}
        //                         key={`cell-${rowindex}-${column.field}`} >
        //                        <>
        //                        <span id={`span-${rowindex}-${column.field}`}>
        //                             {row[column.field].value}
        //                           </span>
                                
        //                         </>
                               
                                
                                
        //                       </TableCell>
        //                     </React.Fragment>
        //                   );
        //                 })}
                    
        //             </React.Fragment>
        //           );
        //         })}
        //       </TableBody>
              