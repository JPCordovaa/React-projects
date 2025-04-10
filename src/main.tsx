import { Grid2 } from '@mui/material'
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css";
import Form from './modules/formulario/Form'
import Header from './modules/Header'

createRoot(document.getElementById('root')!).render(
  <>
    <Grid2 style={{}}>
      <Header />
    </Grid2>
    <Form />
  </>
)
