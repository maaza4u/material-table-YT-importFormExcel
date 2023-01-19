





// import React, { useState } from "react";
// import {
//   Typography,
//   Button,
//   Stepper,
//   Step,
//   StepLabel,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import FileUpload from "./FileUpload/fileUpload";
// import MapColumns from "./MapColumns";






// const useStyles = makeStyles((theme) => ({
//   button: {
//     marginRight: theme.spacing(1),
//   },
// }));

// function getSteps() {
//   return [
//     "Upload File",
//     "Select Header",
//     "",
//     "Map Columns",
//     "Review Changes",

//   ];
// }

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return (
//         <div>
//         <FileUpload/>
//         </div>
//       );

//     case 1:
//       return (
//         <div>
//         <MapColumns/>
//         </div>
//       );
//     case 2:
//       return (
//         <div>

//         </div>
        
//       );
//     case 3:
//       return (
//         <div>

//         </div>
        
//       );
//       case 4:
//       return (
//         <div>
//           Review Changes
//         </div>
//       );
//     default:
//       return "unknown step";
//   }
// }

// const LinaerStepper = () => {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = useState(0);
//   const [skippedSteps, setSkippedSteps] = useState([]);
//   const steps = getSteps();

//   const isStepOptional = (step) => {
//     return step === 1 || step === 2;
//   };

//   const isStepSkipped = (step) => {
//     return skippedSteps.includes(step);
//   };

//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//     setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));
//   };

//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };

//   const handleSkip = () => {
//     if (!isStepSkipped(activeStep)) {
//       setSkippedSteps([...skippedSteps, activeStep]);
//     }
//     setActiveStep(activeStep + 1);
//   };

//   return (
//     <div>
//       <Stepper alternativeLabel activeStep={activeStep}>
//         {steps.map((step, index) => {
//           const labelProps = {};
//           const stepProps = {};
//           if (isStepOptional(index)) {
//             labelProps.optional = (
//               <Typography
//                 variant="caption"
//                 align="center"
//                 style={{ display: "block" }}
//               >
//               </Typography>
//             );
//           }
//           if (isStepSkipped(index)) {
//             stepProps.completed = false;
//           }
//           return (
//             <Step {...stepProps} key={index}>
//               <StepLabel {...labelProps}>{step}</StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>

//       {activeStep === steps.length ? (
//         <Typography variant="h3" align="center">
//           File Saved SuccessFully
//         </Typography>
//       ) : (
//         <div>
//           <form>{getStepContent(activeStep)}</form>
//           <Button
//             className={classes.button}
//             disabled={activeStep === 0}
//             onClick={handleBack}
//           >
//             back
//           </Button>
//           {isStepOptional(activeStep) && (
//             <Button
//               className={classes.button}
//               variant="contained"
//               color="primary"
//               onClick={handleSkip}
//             >
//               skip
//             </Button>
//           )}
//           <Button
//             className={classes.button}
//             variant="contained"
//             color="primary"
//             onClick={handleNext}
//           >
//             {activeStep === steps.length - 1 ? "Finish" : "Next"}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LinaerStepper;
