import { Routes, Route } from 'react-router-dom';
import Home from './modules/home/Home';
import AssocieSe from './modules/formulario/AssocieSe';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/associe-se" element={<AssocieSe />} />
    </Routes>
  );
};

export default AppRoutes;
