import { useEffect, useState } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import whitReactContent from 'sweetalert2-react-content'
import { show_alerta } from "../Funciones"

const App = () => {
  const [Datos, SetDatos] = useState([]);
  const [iD_Nota, setID_Nota] = useState('');
  const [titulo, setTitulo] = useState('');
  const [id_Categoria, setId_Categoria] = useState('');
  const [id_Formato, setId_Formato] = useState('');
  const [id_Usuario, setId_Usuario] = useState('');
  const [fecha, setFecha] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(()=>{
      GetDatos();
  },[]);

  const GetDatos = async ()=>{
      const respuesta = await axios.get('https://localhost:7201/Nota/Get');
      console.log(respuesta.data.result);
      SetDatos(respuesta.data.result);
  }

  const OpenModal = (op,iD_Nota,titulo,id_Categoria,id_Formato,id_Usuario,fecha) =>{
    setID_Nota('');
    setTitulo('');
    setId_Categoria('');
    setId_Formato('');
    setId_Usuario('');
    setFecha('');
    setOperation(op);
    if(op === 1){
      setTitle('Crear Nota')
    }
    else if(op === 2){
      setTitle('Actualizar Nota')
      setID_Nota(iD_Nota);
      setTitulo(titulo);
      setId_Categoria(id_Categoria);
      setId_Formato(id_Formato);
      setId_Usuario(id_Usuario);
      setFecha(fecha);
    }
    window.setTimeout(function(){
      document.getElementById('nombre').focus();
    },500);
  }
  const Validar = () =>{
    var parametros;
    var id;
    if(titulo.trim()===''){
      show_alerta('Escribe el titulo','warning');
    }
    else if(id_Categoria===''){
      show_alerta('Escoge una categoria','warning');
    }
    else if(id_Formato===''){
      show_alerta('Seleccion un Formato','warning');
    }
    else if(id_Usuario===''){
      show_alerta('Seleccion un reportero','warning');
    }
    else if(fecha===''){
      show_alerta('Introduce la fecha','warning');
    }
    else{
      if(operation === 1){
        parametros = {titulo:titulo.trim(),idCategoria:id_Categoria.trim(),idFormato:id_Formato.trim(),idUsuario:id_Usuario.trim()};
          axios.post('https://localhost:7201/Nota/Post', parametros).then(function(respuesta){
          document.getElementById('btnCerrar').click();
          GetDatos();
        })
        .catch(function(error){
          show_alerta('error en la solicitud','error');
          console.log(error);
        });

      }
      else{
        id = {idNota:iD_Nota}
        parametros = {titulo:titulo.trim(),idCategoria:id_Categoria,idFormato:id_Formato,idUsuario:id_Usuario,fecha:fecha};
        axios.put('https://localhost:7201/Nota/Put/' + iD_Nota, parametros).then(function(respuesta){
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
  const deleteDatos = (iD_Nota) =>{
    const MySwal = whitReactContent(Swal);
    MySwal.fire({
      title:'Seguro que quieres borrar esta nota?',
      icon: 'question', text:'No se podra recuperar despues',
      showCancelButton:true,confirmButtonText:"si, eliminar",cancelbuttonText:'cancelar'
    }).then((result) =>{
      if(result.isConfirmed){
        setID_Nota(iD_Nota);
        axios.delete('https://localhost:7201/Nota/Delete/' + iD_Nota).then(function(respuesta){
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
                  <tr><th>#</th><th>Titulo</th><th>Categoria</th><th>Formato</th><th>Reportero</th><th>Fecha</th><th>Opciones</th></tr>
                </thead>
                <tbody className="table-group-divider">
                  {Datos.map((Datos,i) =>(
                    <tr key={Datos.iD_Nota}>
                      <td>{(i+1)}</td>
                      <td>{Datos.titulo}</td>
                      <td>{Datos.categoria.nomCategoria}</td>
                      <td>{Datos.formato.nomFormato}</td>
                      <td>{Datos.usuario.nombre}</td>
                      <td>{Datos.fecha}</td>
                      <td>
                        <button onClick={()=> OpenModal(2,Datos.iD_Nota,Datos.titulo,Datos.id_Categoria,Datos.id_Formato,Datos.id_Usuario,Datos.fecha)} 
                        className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modaldefault'>
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        &nbsp;
                        <button onClick={()=> deleteDatos(Datos.iD_Nota)} className="btn btn-danger">
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
                <input type='text' id="nombre" className="form-control" placeholder="Titulo" value={titulo}
                onChange={(e)=> setTitulo(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type='text' id="apellidos" className="form-control" placeholder="Fecha(se inserta automaticamente)" value={fecha}
                onChange={(e)=> setFecha(e.target.value)}></input>
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
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <select required className="form-select" value={id_Formato} onChange={(e)=> setId_Formato(e.target.value)}>
                  {Datos.map(Datos =>(
                      <option value={Datos.id_Formato}>{Datos.formato.nomFormato}</option>
                  ))}
                  //          valor que escoge       datos que se muestran
                </select>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <select required className="form-select" value={id_Usuario} onChange={(e)=> setId_Usuario(e.target.value)}>
                  {Datos.map(Datos =>(
                      <option value={Datos.id_Usuario}>{Datos.usuario.nombre}</option>
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