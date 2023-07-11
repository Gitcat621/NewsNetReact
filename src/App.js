import { Routes, Route } from 'react-router-dom';
import Header from "./Componentes/Header";
import Bitacora from './Componentes/Bitacora';
import Usuario from './Componentes/Usuario';
import Default from './Componentes/Default';
import Escaleta from './Componentes/Escaleta';
import Guion from './Componentes/Guion';
import CrearNota from './Componentes/CrearNota';
import LoginView from './Componentes/LoginView';
import CPrueba from './Componentes/CPrueba';
import Categorias from './Componentes/Categorias';
import Roles from './Componentes/Roles';
import Guiones from './Componentes/Guiones';
import Conductor from './Componentes/Conductor';
import Formatos from './Componentes/Formatos';
import Programas from './Componentes/Programas';
import Escaletas from './Componentes/Escaletas'

function App() {
  return (
    <div className="App">
       <header className='App-header'> 

        <div className='DateTime'>
          <p>HOLA</p>
        </div>

      </header>
      {/* <body className="App-body"> */}
      <body >
      <Routes>
          <Route path="/" element={<LoginView />}/>
          <Route path="Header" element={ <Header /> }>
            <Route path="Bitacora" element={<Bitacora />}/>
            <Route path="Usuario" element={<Usuario />}/>
            <Route path="Escaleta" element={<Escaleta />}/>
            <Route path="Escaletas" element={<Escaletas />}/>
            <Route path="Guiones" element={<Guiones />}/>
            <Route path="Guion" element={<Guion />}/>
            <Route path="*" element={<Default />}/>
            <Route path="CPrueba" element={<CPrueba />}/>
            <Route path="Roles" element={<Roles />}/>
            <Route path="Categorias" element={<Categorias />}/>
            <Route path="Conductor" element={<Conductor />}/>
            <Route path="Formatos" element={<Formatos />}/>
            <Route path="Programas" element={<Programas />}/>
          </Route>
          <Route path="CrearNota" element={<CrearNota />}/>

      </Routes>
      </body>
      {/* <footer className='App-footer'>
          <h5>Televisora de Cancún SA de CV. © 2023 Todos los derechos reservados </h5>
          <div>
            <h7>Powered by</h7>
            <h6> Beto & Tommy</h6>
          </div>
      </footer> */}
    </div>
  );
}

export default App;
