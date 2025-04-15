import { Grid2 } from '@mui/material';
import BannerCarousel from './banner/Banner';
import CardNoticias from './noticias/CardNoticias';
import Sobre from './sobre/Sobre';
import Diretoria from './sobre/Diretoria';
import Contatos from './contatos/Contatos';
import Header from '../header/Header';

const Home = () => {
  return (
    <>
      <Grid2>
        <Header />
      </Grid2>
      <BannerCarousel />
      <CardNoticias />
      <Sobre />
      <Diretoria />
      <Contatos />
    </>
  );
};

export default Home;
