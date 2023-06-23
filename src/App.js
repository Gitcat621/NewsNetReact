
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Menu from "./Componentes/Menu";
import Bitacora from './Componentes/Bitacora';
import Usuario from './Componentes/Usuario';
import Default from './Componentes/Default';
import CrearCategoria from './Componentes/CrearCategoria'

function App() {
  return (
    <div>
      <h1>Rutas aaaaaaaa</h1>
      <Routes>
          <Route path="/" element={<Menu />}>
            <Route path="Bitacora" element={<Bitacora />}/>
            <Route path="Usuario" element={<Usuario />}/>
            <Route path="Categoria" element={<CrearCategoria />}/>
            <Route path="*" element={<Default />}/>
      </Route>
      </Routes>
    </div>
  );
}

export default App;
