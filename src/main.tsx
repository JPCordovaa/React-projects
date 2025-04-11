import { Grid2 } from '@mui/material'
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Form from './modules/formulario/Form'
import Header from './modules/header/Header'
import BannerCarousel from './modules/banner/Banner';

createRoot(document.getElementById('root')!).render(
  <>
    <Grid2>
      <Header />
    </Grid2>
    <BannerCarousel/>
    <Form />
  </>
)
