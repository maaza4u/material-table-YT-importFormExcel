

import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FileUpload from './FileUpload/fileUpload';
import * as XLSX from 'xlsx';
import MapColumns from './MapColumns';
import MaterialTable from 'material-table';
import { TableView } from './TableView'




function getStepContent(step) {
  switch (step) {
    case 0:
      return (
      <div>
     
      </div>
      )
    case 1:
      return (
        <div>
        </div>
        
      );
    case 2:
      return (
        <div>
          
        </div>
      );
    case 3:
      return (
        <div>
      
        </div>
      );
      case 4:
      return (
        <div>
    
        </div>
      );
    default:
      return "unknown step";
  }
}






const steps = ['UploadFile', 'Select Header', 'Column Mapper','TableView'];

const getExention = (file) => {
  const parts = file.name.split('.')
  const extension = parts[parts.length - 1]
  return EXTENSIONS.includes(extension) // return boolean
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

const EXTENSIONS = ['xlsx', 'xls', 'csv']
const BulkUpload =(props) => {
  const [colDefs, setColDefs] = useState()
  const [items, setItems] = useState([]);
  const [data, setData] = useState()
  const [filename, setFilename] = useState('')
  const [rows, setRows] = useState([]);
    const [columns,setColumns] = useState([]);
    const [click, setClick] = useState('')
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const [databaseCols, setDatabaseCols] = useState([
    { id: 0, title: 'leaseId', field: '' },
    { id: 1, title: 'tenant', field: '' },
    { id: 2, title: 'tenantTypeName', field: '' },
    { id: 3, title: 'leaseExecutionDate', field: '' },
    { id: 4, title: 'leaseCommencementDate', field: '' },
    { id: 5, title: 'leaseSourceTypeName', field: '' },
  ])

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? 
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

 

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  // const fileInput = useRef(null)
  // const onReset = () => {
  //   fileInput.current.value = null
  // }


  const importExcel = (e) => {
    
    const file = e.target.files[0]
    setFilename(e.target.files[0].name);
    const promise = new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: "binary" })

      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
      const rows = XLSX.utils.sheet_to_row_object_array(workSheet, { header: 1 })
      console.table(rows[0])
      // console.log(fileData)
      const headers = fileData[0]
      const heads = headers.map(head => ({ title: head, field: head} ))
     
      setColDefs(heads)

      //removing header
      fileData.splice(0, 1)
      resolve(fileData);
      
      setData(convertToJson(headers, fileData))

      const updatedcols = Object.keys(rows[0]);
    setRows(rows);
    setColumns(updatedcols);
    console.log(fileData);
    const file = e.target.files[0]
    setFilename(file);




    } 

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
       
      }
      else {
        alert("Invalid file input, Select Excel, CSV file")
        setFilename(null);
        setColumns(null);
        setRows(null);
      
      }
    } else {
      setData([])
      setColDefs([])
      
    }

    FileReader.onerror = (error) => {
      reject(error);
    };
  });

  // promise.then((d) => {
  //   const updatedcols = Object.keys(d[0]);
  //   setRows(d);
  //   setColumns(updatedcols);
  //   console.log(d);
  //   console.log(updatedcols);
  //   const file = e.target.files[0]
  //   setFilename(file);
    
  // });
 

  }

    function onRowClick(data) {
    console.log(`You clicked on the row ${data}`);
    alert('You Selected an Row ');
  }


  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
            <form>{getStepContent(activeStep)}</form>
            </Typography>
            {activeStep === 0 ? (
                <Typography sx={{ mb: 1 }}>
                  <FileUpload
                    rows={rows}
                     columns={columns}
                     filename ={filename}
                     importExcel = {importExcel}
                  />
                </Typography>
              ) : (
                <></>
              )}
              {activeStep === 1 ? (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {' '}
                  <MaterialTable title="Uploaded Excel or CSV data shown here " 
                  // convertToJson ={convertToJson}
                  onRowClick={onRowClick}
                  data={data} 
                   columns={colDefs}
                  />
                </Typography>
              ) : (
                <></>
              )}
              {activeStep === 2 ? (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  MapColumns
                  <MapColumns
                    updatedcols = {props.updatedcols}
                    databaseCols ={databaseCols}
                    setDatabaseCols = {setDatabaseCols}
                    rows = {rows}
                    columns = {columns}
                  />
                </Typography>
              ) : (
                <></>
              )}
              {activeStep === 3 ? (
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <TableView 
                  databaseCols = {databaseCols}
                   updatedcols={props.updatedcols}
                  
                
                  
                  />
                </Typography>
              ) : (
                <></>
              )}







            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}

export default BulkUpload;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepButton from '@mui/material/StepButton';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import FileUpload from './FileUpload/fileUpload';

// const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

// function getStepContent(step) {
//     switch (step) {
//       case 0:
//         return (
//           <>
//           <FileUpload/>
//           </>
//         );
  
//       case 1:
//         return (
//           <>
          
//           </>
//         );
//       case 2:
//         return (
//           <>
//           </>
//         );
//       case 3:
//         return (
//           <>
          
//           </>
//         );
//         case 4:
//         return (
//           <>
//             Review Changes
//           </>
//         );
//       default:
//         return "unknown step";
//     }
//   }

// export default function HorizontalNonLinearStepper() {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [completed, setCompleted] = React.useState();

//   const totalSteps = () => {
//     return steps.length;
//   };

//   const completedSteps = () => {
//     return Object.keys(completed).length;
//   };

//   const isLastStep = () => {
//     return activeStep === totalSteps() - 1;
//   };

//   const allStepsCompleted = () => {
//     return completedSteps() === totalSteps();
//   };

//   const handleNext = () => {
//     const newActiveStep =
//       isLastStep() && !allStepsCompleted()
//         ? // It's the last step, but not all steps have been completed,
//           // find the first step that has been completed
//           steps.findIndex((step, i) => !(i in completed))
//         : activeStep + 1;
//     setActiveStep(newActiveStep);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleStep = (step) => () => {
//     setActiveStep(step);
//   };

//   const handleComplete = () => {
//     const newCompleted = completed;
//     newCompleted[activeStep] = true;
//     setCompleted(newCompleted);
//     handleNext();
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//     setCompleted({});
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Stepper nonLinear activeStep={activeStep}>
//         {steps.map((label, index) => (
//           <Step key={label} completed={completed[index]}>
//             <StepButton color="inherit" onClick={handleStep(index)}>
//               {label}
//             </StepButton>
//           </Step>
//         ))}
//       </Stepper>
//       <div>
//         {allStepsCompleted() ? (
//           <React.Fragment>
//             <Typography sx={{ mt: 2, mb: 1 }}>
//               All steps completed - you&apos;re finished
//             </Typography>
//             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//               <Box sx={{ flex: '1 1 auto' }} />
//               <Button onClick={handleReset}>Reset</Button>
//             </Box>
//           </React.Fragment>
//         ) : (
//           <React.Fragment>
//             <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
//             {getStepContent(activeStep)}
//             </Typography>
//             <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//               <Button
//                 color="inherit"
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 sx={{ mr: 1 }}
//               >
//                 Back
//               </Button>
//               <Box sx={{ flex: '1 1 auto' }} />
//               <Button onClick={handleNext} sx={{ mr: 1 }}>
//                 Next
//               </Button>
//               {activeStep !== steps.length &&
//                 (completed[activeStep] ? (
//                   <Typography variant="caption" sx={{ display: 'inline-block' }}>
//                     Step {activeStep + 1} already completed
//                   </Typography>
//                 ) : (
//                   <Button onClick={handleComplete}>
//                     {completedSteps() === totalSteps() - 1
//                       ? 'Finish'
//                       : 'Complete Step'}
//                   </Button>
//                 ))}
//             </Box>
//           </React.Fragment>
//         )}
//       </div>
//     </Box>
//   );
// }