// import {
//     Button,
//     FormControl,
//     Grid,
//     InputLabel,
//     NativeSelect,
//     Paper,
//     TextField,
//   } from "@material-ui/core";
//   import {
//     DeleteOutline,
//     DeleteOutlineSharp,
//     PlayArrow,
//   } from "@material-ui/icons";

import Button from 'react-bootstrap/Button';
import { Field, ErrorMessage } from 'formik';

export const LoadTestData = ({
    classes,
    useTest,
    handleRemoveUseTest,
    handleUseTest,
}) => {

    const result = useTest ? (
        // <Button
        //     className={classes.test_button}
        //     startIcon={<DeleteOutline />}
        //     size="large"
        //     type={"button"}
        //     variant="contained"
        //     color="primary"
        //     onClick={handleRemoveUseTest}
        // >
        //     Remove Test Data
        // </Button>

        <Button variant="light" onClick={handleRemoveUseTest}>Remove Test Data</Button>
    ) : (
        // <Button
        //     className={classes.test_button}
        //     startIcon={<PlayArrow />}
        //     size="large"
        //     type={"button"}
        //     variant="contained"
        //     color="primary"
        //     onClick={handleUseTest}
        // >
        //     Use Test Data
        // </Button>
        <Button variant="light" onClick={handleUseTest}>Use Test Data</Button>
    );

    return result;
};


// export const handleFileUploadChangedCommon = (event, Formik, setUploadFile) => {
//     let reader = new FileReader();
//     let file = event.target.files[0];
//     if (file) {
//         reader.onloadend = () => {
//             Formik.setFieldValue("file", event.target.files[0].name);
//             setUploadFile(event.target.files[0]);

//             Formik.setFieldError("file", undefined);
//         };
//         reader.readAsDataURL(file);
//     } else {
//         Formik.setFieldError("file", "Please upload a readable text file");
//         Formik.setFieldValue("file", undefined);
//     }
// };


//     const file = event.target.files[0];
//     if (file) {
//         setUploadFile(file);
//     }
// };





