import React,{useState} from 'react';
import "./fileUpload.css";
import MaterialTable from 'material-table'
import * as XLSX from 'xlsx';
import { Button } from "@material-ui/core";






// const EXTENSIONS = ['xlsx', 'xls', 'csv']
// function FileUpload(props) {
//   const [colDefs, setColDefs] = useState()
//   const [items, setItems] = useState([]);
//   const [data, setData] = useState()
//   const [filename, setFilename] = useState('')
//   const [rows, setRows] = useState([]);
//     const [columns,setColumns] = useState([]);
//     const [click, setClick] = useState('')

//   const getExention = (file) => {
//     const parts = file.name.split('.')
//     const extension = parts[parts.length - 1]
//     return EXTENSIONS.includes(extension) // return boolean
//   }

//   const convertToJson = (headers, data) => {
//     const rows = []
//     data.forEach(row => {
//       let rowData = {}
//       row.forEach((element, index) => {
//         rowData[headers[index]] = element
//       })
//       rows.push(rowData)

//     });
//     return rows
//   }

//   const importExcel = (e) => {
    
//     //  const onClick = alert('Row is selected')
//     const file = e.target.files[0]
//     setFilename(e.target.files[0].name);
//     const promise = new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onload = (event) => {
//       //parse data

//       const bstr = event.target.result
//       const workBook = XLSX.read(bstr, { type: "binary" })

//       //get first sheet
//       const workSheetName = workBook.SheetNames[0]
//       const workSheet = workBook.Sheets[workSheetName]
//       //convert to array
//       const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
//       // console.log(fileData)
//       const headers = fileData[0]
//       const heads = headers.map(head => ({ title: head, field: head} ))
     
//       setColDefs(heads)

//       //removing header
//       fileData.splice(0, 1)
//       resolve(fileData);
      
//       setData(convertToJson(headers, fileData))
//     } 

//     if (file) {
//       if (getExention(file)) {
//         reader.readAsBinaryString(file)
       
//       }
//       else {
//         alert("Invalid file input, Select Excel, CSV file")
//         setFilename(null);
//         setColumns(null);
//         setRows(null);
//       }
//     } else {
//       setData([])
//       setColDefs([])
//     }

//     FileReader.onerror = (error) => {
//       reject(error);
//     };
//   });

//   promise.then((d) => {
//     const updatedcols = Object.keys(d[0]);
//     setRows(d.length);
//     setColumns(updatedcols.length);
//     console.log(d);
//     console.log(updatedcols);
    
//   });
 

//   }

//   function onRowClick(data) {
//     console.log(`You clicked on the row ${data}`);
//     alert('You Selected an Row ');
//   }

   const FileUpload =(props)=> {
     return (
    <div>
    <div className="file-card">
      <div className="file-inputs">
            <Button
  variant="contained"
  component="label"
>
    Upload File
    <input type="file" 
    label = {props.filename} 
    onChange={props.importExcel}
  
    />
     
      </Button>
    </div>
      <p>File name : {props.filename}</p>
      <p>No of Columns : {props.columns.length}</p>
      <p>No of Rows : {props.rows.length}</p>
    </div>
    {/* <MaterialTable title="Uploaded Excel or CSV data shown here " 
    data={data} 
    columns={colDefs} 
    checkbox
    onRowClick = {onRowClick} /> */}

{/* <table class="table container">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Gender</th>
            <th scope="col">Country</th>

          </tr>
        </thead>
      <tbody>
          {items.map((d) => (
            <tr key={d.Item}>
              <th>{d.Item}</th>
              <th>{d.Firstname}</th>
              <th>{d.Lastname}</th>
              <th>{d.Gender}</th>
              <th>{d.Country}</th>
            </tr>
          ))}
        </tbody>
        </table> */}
    </div>
  );
}

export default FileUpload;
