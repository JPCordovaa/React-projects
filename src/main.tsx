import "@fortawesome/fontawesome-free/css/all.min.css";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Grid2 } from '@mui/material';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import './App.css';
import AppRoutes from './Routes';

createRoot(document.getElementById('root')!).render(
  <Grid2 style={{ padding: "15px", background: "linear-gradient(180deg, #01416e, #01416e)" }}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </Grid2>
);
