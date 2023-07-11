import { useEffect, useState } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import whitReactContent from 'sweetalert2-react-content'
import { show_alerta } from "../Funciones"

const App = () => {
  const [Datos, SetDatos] = useState([]);
  const [iD_Rol, setID_Rol] = useState('');
  const [nomRol, setNomRol] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(()=>{
      GetDatos();
  },[]);

  const GetDatos = async ()=>{
      const respuesta = await axios.get('https://localhost:7201/Rol/Get');
      console.log(respuesta.data.result);
      SetDatos(respuesta.data.result);
  }

  const OpenModal = (op,iD_Rol,nomRol) =>{
    setID_Rol('');
    setNomRol('');
    setOperation(op);
    if(op === 1){
      setTitle('Registrar Rol')
    }
    else if(op === 2){
      setTitle('Actualizar Rol')
      setID_Rol(iD_Rol);
      setNomRol(nomRol);
    }
    window.setTimeout(function(){
      document.getElementById('nombre').focus();
    },500);
  }
  const Validar = () =>{
    var parametros;
    var id;
    if(nomRol.trim()===''){
      show_alerta('Escribe el nombre','warning');
    }
    else{
      if(operation === 1){
        parametros = {rol:nomRol.trim()};
          axios.post('https://localhost:7201/Rol/Post', parametros).then(function(respuesta){
          document.getElementById('btnCerrar').click();
          GetDatos();
        })
        .catch(function(error){
          show_alerta('error en la solicitud','error');
          console.log(error);
        });

      }
      else{
        id = {idRol:iD_Rol}
        parametros = {rol:nomRol.trim()};
        axios.put('https://localhost:7201/Rol/Put/' + iD_Rol, parametros).then(function(respuesta){
          document.getElementById('btnCerrar').click();
          GetDatos();
        })
        .catch(function(error){
          show_alerta('error en la solicitud','error');
          console.log(error);
        });

      }
      console.log("Se termino el consumo de la api");
    }
  }
  const deleteDatos = (iD_Rol,nomRol) =>{
    const MySwal = whitReactContent(Swal);
    MySwal.fire({
      title:'Seguro que quieres borrar ' + nomRol +'?',
      icon: 'question', text:'No se podra recuperar despues',
      showCancelButton:true,confirmButtonText:"si, eliminar",cancelbuttonText:'cancelar'
    }).then((result) =>{
      if(result.isConfirmed){
        setID_Rol(iD_Rol);
        axios.delete('https://localhost:7201/Rol/Delete/' + iD_Rol).then(function(respuesta){
          document.getElementById('btnCerrar').click();
          GetDatos();
        })
        .catch(function(error){
          show_alerta('error en la solicitud','error');
          console.log(error);
        });
      }
    });
  }
  return (
    <div>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-4'>
            <div className='d-grid mx-auto'>
                <button onClick={()=> OpenModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modaldefault'>
                  <i className='fa-solid fa-circle-plus'></i> Crear
                </button>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-12'>
            <div className='table-responsive'>
              <div className='table table-bordered'>
                <thead>
                  <tr><th>#</th><th>Rol</th><th>Opciones</th></tr>
                </thead>
                <tbody className="table-group-divider">
                  {Datos.map((Datos,i) =>(
                    <tr key={Datos.iD_Rol}>
                      <td>{(i+1)}</td>
                      <td>{Datos.nomRol}</td>
                      <td>
                        <button onClick={()=> OpenModal(2,Datos.iD_Rol,Datos.nomRol)} 
                        className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modaldefault'>
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        &nbsp;
                        <button onClick={()=> deleteDatos(Datos.iD_Rol,Datos.nomRol)} className="btn btn-danger">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='modaldefault' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <input type='hidden' id='id'></input>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type='text' id="nombre" className="form-control" placeholder="Formato" value={nomRol}
                onChange={(e)=> setNomRol(e.target.value)}></input>
              </div>
              <div className="d-grid col-6 mx-auto">
                    <button onClick={()=> Validar()} className="btn btn-success">
                      <i className="fa-solid fa-floppy-disk"></i> Guardar
                    </button>
              </div>
            </div>
            <div className="modal-footer">
                    <button type="button" id='btnCerrar' className="btn btn-secondary" data-bs-dismiss='modal'>cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App