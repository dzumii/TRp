
import Button from 'react-bootstrap/Button';
import { Field, ErrorMessage } from 'formik';

export const LoadTestData = ({
    classes,
    useTest,
    handleRemoveUseTest,
    handleUseTest,
}) => {

    const result = useTest ? (

        <Button variant="light" onClick={handleRemoveUseTest}>Remove Test Data</Button>
    ) : (

        <Button variant="light" onClick={handleUseTest}>Use Test Data</Button>
    );

    return result;
};






