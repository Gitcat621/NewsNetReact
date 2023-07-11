import { useEffect, useState } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import whitReactContent from 'sweetalert2-react-content'
import { show_alerta } from "../Funciones"

const App = () => {
  const [Datos, SetDatos] = useState([]);
  const [iD_Programa, setID_Programa] = useState('');
  const [nomPrograma, setNomPrograma] = useState('');
  const [id_Categoria, setId_Categoria] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(()=>{
      GetDatos();
  },[]);

  const GetDatos = async ()=>{
      const respuesta = await axios.get('https://localhost:7201/Programa/Get');
      console.log(respuesta.data.result);
      SetDatos(respuesta.data.result);
  }

  const OpenModal = (op,iD_Programa,nomPrograma,id_Categoria) =>{
    setID_Programa('');
    setNomPrograma('');
    setId_Categoria('');
    setOperation(op);
    if(op === 1){
      setTitle('Registrar Programa')
    }
    else if(op === 2){
      setTitle('Actualizar Programa')
      setID_Programa(iD_Programa);
      setNomPrograma(nomPrograma);
      setId_Categoria(id_Categoria);
    }
    window.setTimeout(function(){
      document.getElementById('nombre').focus();
    },500);
  }
  const Validar = () =>{
    var parametros;
    var id;
    if(nomPrograma.trim()===''){
      show_alerta('Escribe el nombre','warning');
    }
    if(id_Categoria===''){
      show_alerta('Escoge la categoria','warning');
    }

    else{
      if(operation === 1){
        parametros = {programa:nomPrograma.trim(),idCategoria:id_Categoria};
          axios.post('https://localhost:7201/Programa/Post', parametros).then(function(respuesta){
          document.getElementById('btnCerrar').click();
          GetDatos();
        })
        .catch(function(error){
          show_alerta('error en la solicitud','error');
          console.log(error);
        });

      }
      else{
        id = {idPrograma:iD_Programa}
        parametros = {programa:nomPrograma.trim(),idCategoria:id_Categoria};
        axios.put('https://localhost:7201/Programa/Put/' + iD_Programa, parametros).then(function(respuesta){
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
  const deleteDatos = (iD_Programa,nomPrograma) =>{
    const MySwal = whitReactContent(Swal);
    MySwal.fire({
      title:'Seguro que quieres borrar a ' + nomPrograma +'?',
      icon: 'question', text:'No se podra recuperar despues',
      showCancelButton:true,confirmButtonText:"si, eliminar",cancelbuttonText:'cancelar'
    }).then((result) =>{
      if(result.isConfirmed){
        setID_Programa(iD_Programa);
        axios.delete('https://localhost:7201/Programa/Delete/' + iD_Programa).then(function(respuesta){
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
                  <tr><th>#</th><th>Programa</th><th>Categoria</th><th>Opciones</th></tr>
                </thead>
                <tbody className="table-group-divider">
                  {Datos.map((Datos,i) =>(
                    <tr key={Datos.iD_Programa}>
                      <td>{(i+1)}</td>
                      <td>{Datos.nomPrograma}</td>
                      <td>{Datos.categoria.nomCategoria}</td>
                      <td>
                        <button onClick={()=> OpenModal(2,Datos.iD_Programa,Datos.nomPrograma,Datos.id_Categoria)} 
                        className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modaldefault'>
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        &nbsp;
                        <button onClick={()=> deleteDatos(Datos.iD_Programa,Datos.nomPrograma)} className="btn btn-danger">
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
                <input type='text' id="nombre" className="form-control" placeholder="Nombre" value={nomPrograma}
                onChange={(e)=> setNomPrograma(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <select required className="form-select" value={id_Categoria} onChange={(e)=> setId_Categoria(e.target.value)}>
                  {Datos.map(Datos =>(
                      <option value={Datos.id_Categoria}>{Datos.categoria.nomCategoria}</option>
                  ))}
                  //          valor que escoge       datos que se muestran
                </select>
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