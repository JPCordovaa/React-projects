import { Grid2 } from '@mui/material';
import Header from '../header/Header';
import Form from './Form';

const AssocieSe = () => {
  return (
    <>
      <Grid2>
        <Header />
      </Grid2>
      <Grid2 container justifyContent="center" mt={5}>
        <Form />
      </Grid2>
    </>
  );
};

export default AssocieSe;
