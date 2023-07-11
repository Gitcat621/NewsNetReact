import { useEffect, useState } from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import whitReactContent from 'sweetalert2-react-content'
import { show_alerta } from "../Funciones"

const CPrueba = () => {
  const [Datos, SetDatos] = useState([]);
  const [iD, setID] = useState('');
  const [dato1, setDato1] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(()=>{
      GetDatos();
  },[]);

  const GetDatos = async ()=>{
      const respuesta = await axios.get('https://localhost:7201//Get');
      console.log(respuesta.data.result);
      SetDatos(respuesta.data.result);
  }

  const OpenModal = (op,iD,dato1) =>{
    setID('');
    setDato1('');
    setOperation(op);
    if(op === 1){
      setTitle('Registrar Formato')
    }
    else if(op === 2){
      setTitle('Actualizar Formato')
      setID(iD);
      setDato1(dato1);
    }
    window.setTimeout(function(){
      document.getElementById('nombre').focus();
    },500);
  }
  const Validar = () =>{
    var parametros;
    var id;
    if(dato1.trim()===''){
      show_alerta('Escribe el nombre','warning');
    }
    else{
      if(operation === 1){
        parametros = {dato1:dato1.trim()};
          axios.post('https://localhost:7201//Post', parametros).then(function(respuesta){
          // var tipo = respuesta.data[0];
          // var msj = respuesta.data[1];
          // show_alerta(msj,tipo);
          // if(tipo === 'success'){
          //   document.getElementById('btnCerrar').click();
          //   GetFormato();
          // }
          document.getElementById('btnCerrar').click();
          GetDatos();
        })
        .catch(function(error){
          show_alerta('error en la solicitud','error');
          console.log(error);
        });

      }
      else{
        id = {id:iD}
        parametros = {dato1:dato1.trim()};
        axios.put('https://localhost:7201//Put/' + iD, parametros).then(function(respuesta){
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
  const deleteDatos = (iD,dato1) =>{
    const MySwal = whitReactContent(Swal);
    MySwal.fire({
      title:'Seguro que quieres borrar ' + dato1 +'?',
      icon: 'question', text:'No se podra recuperar despues',
      showCancelButton:true,confirmButtonText:"si, eliminar",cancelbuttonText:'cancelar'
    }).then((result) =>{
      if(result.isConfirmed){
        setID(iD);
        axios.delete('https://localhost:7201//Delete/' + iD).then(function(respuesta){
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
                <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modaldefault'>
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
                  <tr><th>#</th><th>Datos1</th><th>Datos2</th><th>Datos3</th></tr>
                </thead>
                <tbody className="table-group-divider">
                    <tr>
                      <td>1</td>
                      <td>A</td>
                      <td>B</td>
                      <td>C</td>
                      <td>
                        <button
                        className="btn btn-warning" data-bs-toggle='modal' data-bs-target='#modaldefault'>
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-danger">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
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
              <label className='h5'>Crear</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <input type='hidden' id='id'></input>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input className='form-control' placeholder='Teclea los datos...'></input>
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

export default CPrueba