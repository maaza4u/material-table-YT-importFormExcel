import React,{useState} from 'react';
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TableRow from '@mui/material/TableRow'
// import Paper from '@mui/material/Paper'
import MaterialTable from 'material-table'
import * as XLSX from 'xlsx';


const HeaderSelector = (props) => {
  const [colDefs, setColDefs] = useState()
  const [data, setData] = useState()

  const reader = new FileReader()
  reader.onload = (event) => {
   
const bstr = event.target.result
const workBook = XLSX.read(bstr, { type: "binary" })

      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
      // console.log(fileData)
      const headers = fileData[0]
      const heads = headers.map(head => ({ title: head, field: head} ))
      setColDefs(heads)
      fileData.splice(0, 1)
    
      
      setData(convertToJson(headers, fileData))
    } 


const convertToJson = (headers, data) => {
  
  const rows = []
  data.forEach(row => {
    let rowData = {}
    row.forEach((element, index) => {
      rowData[headers[index]] = element
    })
    rows.push(rowData)

  });
  return rows
}





  function onRowClick(data) {
    console.log(`You clicked on the row ${data}`);
    alert('You Selected an Row ');
  }



  
  
    
  
  return (
           <>
           
                   <MaterialTable title="Uploaded Excel or CSV data shown here " 
                   data={data} 
                   columns={colDefs} 
                  onRowClick = {onRowClick}
                  />
              </>
  )
}

export default HeaderSelector;






// import React from 'react';
// import { Button } from "@material-ui/core";
// import MaterialTable from 'material-table';
// import "./fileUpload.css";

// const HeaderSelector = (props) => {
//   return (
//     <>
//        <div className="file-card">
//       <div className="file-inputs">
//             <Button
//   variant="contained"
//   component="label"
// >
//     Upload File
//     <input type="file" 
//     label = {props.filename}
//     onChange={props.importExcel} />
     
//       </Button>
//     </div>
//       <p>File name : {props.filename}</p>
//       <p>No of Columns : {columns.length}</p>
//       <p>No of Rows : {rows.length}</p>
//     </div>
//     <MaterialTable title="Uploaded Excel or CSV data shown here " data={data} columns={colDefs} />
//     </>



//   )
// }

// export default HeaderSelector