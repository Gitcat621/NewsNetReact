import { useEffect, useState } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import whitReactContent from 'sweetalert2-react-content'
import { show_alerta } from "../Funciones"
import { Link } from "react-router-dom";

const App = () => {
  const [Datos, SetDatos] = useState([]);
  const [Notas, SetNotas] = useState([]);
  const [iD_Guion, setID_Guion] = useState('');
  const [anotacion, setAnotacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [id_Nota, setId_Nota] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(()=>{
      GetDatos();
  },[]);

  const GetDatos = async ()=>{
      const respuesta = await axios.get('https://localhost:7201/Guion/Get');
      const respuesta2 = await axios.get('https://localhost:7201/Nota/Get');
      SetDatos(respuesta.data.result);
      SetNotas(respuesta2.data.result);
  }

  const OpenModal = (op,iD_Guion,anotacion,descripcion,fecha,id_Nota) =>{
    setID_Guion('');
    setAnotacion('');
    setDescripcion('');
    setFecha('');
    setId_Nota('');
    setOperation(op);
    if(op === 1){
      setTitle('Crear guion')
    }
    else if(op === 2){
      setTitle('Actualizar Guion')
      setID_Guion(iD_Guion);
      setAnotacion(anotacion);
      setDescripcion(descripcion);
      setFecha(fecha);
      setId_Nota(id_Nota);
    }
    window.setTimeout(function(){
      document.getElementById('nombre').focus();
    },500);
  }
  const Validar = () =>{
    var parametros;
    if(operation===1){
      if(anotacion.trim()===''){
        show_alerta('Escribe la anotacion','warning');
      }
      else if(descripcion.trim()===''){
        show_alerta('Escribe la descripcion','warning');
      }
      else if(id_Nota===''){
        show_alerta('Seleccion la nota perteneciente','warning');
      }
    }
    else{
      if(anotacion.trim()===''){
        show_alerta('Escribe la anotacion','warning');
      }
      else if(descripcion.trim()===''){
        show_alerta('Escribe la descripcion','warning');
      }
      else if(fecha.trim()===''){
        show_alerta('Escribe la fecha','warning');
      }
      else if(id_Nota===''){
        show_alerta('Seleccion la nota perteneciente','warning');
      }
    }
    if(operation === 1){
      parametros = {anotacion:anotacion.trim(),descripcion:descripcion.trim(),idNota:id_Nota.trim()};
        axios.post('https://localhost:7201/Guion/Post', parametros).then(function(respuesta){
        document.getElementById('btnCerrar').click();
        GetDatos();
      })
      .catch(function(error){
        show_alerta('error en la solicitud','error');
        console.log(error);
      });

    }
    else{
      parametros = {anotacion:anotacion.trim(),descripcion:descripcion.trim(),fecha:fecha.trim(),idNota:id_Nota};
      axios.put('https://localhost:7201/Guion/Put/' + iD_Guion, parametros).then(function(respuesta){
        document.getElementById('btnCerrareditar').click();
        GetDatos();
      })
      .catch(function(error){
        show_alerta('error en la solicitud','error');
        console.log(error);
      });

    }
    console.log("Se termino el consumo de la api");
  }
  const deleteDatos = (iD_Guion) =>{
    const MySwal = whitReactContent(Swal);
    MySwal.fire({
      title:'Seguro que quieres borrar este guion?',
      icon: 'question', text:'No se podra recuperar despues',
      showCancelButton:true,confirmButtonText:"si, eliminar",cancelbuttonText:'cancelar'
    }).then((result) =>{
      if(result.isConfirmed){
        setID_Guion(iD_Guion);
        axios.delete('https://localhost:7201/Guion/Delete/' + iD_Guion).then(function(respuesta){
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
                  <tr><th>#</th><th>Nota</th><th>Anotacion</th><th>Descripcion</th><th>Fecha</th><th>Opciones</th></tr>
                </thead>
                <tbody className="table-group-divider">
                  {Datos.map((Datos,i) =>(
                    <tr key={Datos.iD_Guion}>
                      <td>{(i+1)}</td>
                      <td>{Datos.nota.titulo}</td>
                      <td>{Datos.anotacion}</td>
                      <td>{Datos.descripcion}</td>
                      <td>{Datos.fecha}</td>
                      <td className="buttons-th"> 
                        <Link to={'/VerGuion/'+ Datos.iD_Guion} class="btn btn-success"> Ver </Link>
                        <button onClick={()=> OpenModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modaldefault'>Crear</button>
                        <br/><Link to={'/Guion/'+ Datos.iD_Nota} class="btn btn-success"> <i className='fa-solid fa-circle-plus'></i> Crear en otra ventana</Link>
                        &nbsp;
                        <button onClick={()=> OpenModal(2,Datos.iD_Guion,Datos.anotacion,Datos.descripcion,Datos.fecha,Datos.id_Nota)} 
                        className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modaleditar'>
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        &nbsp;
                        <button onClick={()=> deleteDatos(Datos.iD_Guion)} className="btn btn-danger">
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
                <input type='text' id="nombre" className="form-control" placeholder="Anotacion" value={anotacion}
                onChange={(e)=> setAnotacion(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type='text' id="apellidos" className="form-control" placeholder="Descripcion" value={descripcion}
                onChange={(e)=> setDescripcion(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <select required className="form-select" value={id_Nota} onChange={(e)=> setId_Nota(e.target.value)}>
                      <option></option>
                  {Notas.map(Notas =>(
                      <option value={Notas.iD_Nota}>{Notas.titulo}</option>
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
      <div id='modaleditar' className='modal fade' aria-hidden='true'>
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
                <input type='text' id="nombre" className="form-control" placeholder="Anotacion" value={anotacion}
                onChange={(e)=> setAnotacion(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type='text' id="apellidos" className="form-control" placeholder="Descripcion" value={descripcion}
                onChange={(e)=> setDescripcion(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type='text' id="nickName" className="form-control" placeholder="Fecha(se inserta automaticamente)" value={fecha}
                onChange={(e)=> setFecha(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <select required className="form-select" value={id_Nota} onChange={(e)=> setId_Nota(e.target.value)}>
                      <option></option>
                  {Notas.map(Notas =>(
                      <option value={Notas.iD_Nota}>{Notas.titulo}</option>
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
                    <button type="button" id='btnCerrareditar' className="btn btn-secondary" data-bs-dismiss='modal'>cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App