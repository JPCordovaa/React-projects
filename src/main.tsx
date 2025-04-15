import { Grid2 } from '@mui/material'
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Form from './modules/formulario/Form'
import Header from './modules/header/Header'
import BannerCarousel from './modules/banner/Banner';
import { BrowserRouter } from 'react-router-dom';
import CardNoticias from './modules/noticias/CardNoticias';
import Diretoria from './modules/sobre/Diretoria';
import Sobre from './modules/sobre/Sobre';
import Contatos from './modules/contatos/Contatos';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Grid2>
      <Header />
    </Grid2>
    <BannerCarousel/>
    <Form />
    <CardNoticias/>
    <Sobre/>
    <Diretoria/>
    <Contatos/>
  </BrowserRouter>
)
