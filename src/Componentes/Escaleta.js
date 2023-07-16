import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { FaAngleLeft } from 'react-icons/fa';
import { FaPlusSquare } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaSave } from 'react-icons/fa';
import {FaFilePdf} from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa';
import {BsFillSignpostFill} from 'react-icons/bs';
import { FaTrash } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { show_alerta } from "../Funciones"


const Table =()=> {
  const [Datos, SetDatos] = useState([]);
  const {id} = useParams()
  const [iD_Linea, setID_Linea] = useState('');
  const [tipo, setTipo] = useState('');
  const [texto, setTexto] = useState('');
  const [id_Nota, setId_Nota] = useState('');
  const [id_Escaleta, setId_Escaleta] = useState('');
  const [id_Conductor, setId_Conductor] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');
  useEffect(()=>{
    GetDatos();
},[]);

const GetDatos = async()=>{
    const respuesta = await axios.get('https://localhost:7201/Linea/GetEscaleta/'+id);
    console.log(respuesta.data.result);
    SetDatos(respuesta.data.result);
}
const OpenModal = (op,tipo,texto,id_Nota,id_Escaleta,id_Conductor,id) =>{
  setID_Linea('');
  setTipo('');
  setTexto('');
  setId_Nota('');
  setId_Escaleta('');
  setId_Conductor('');
  setOperation(op);
  if(op === 1){
    setTitle('insertar linea')
  }
  else if(op === 2){
    setTitle('Modificar linea')
    setID_Linea(iD_Linea);
    setTipo(tipo);
    setTexto(texto);
    setId_Nota(id_Nota);
    setId_Escaleta(id);
    setId_Conductor(id_Conductor);
  }
  else if(op === 3){
    setTitle('Inserta Indicacion')
  }
  window.setTimeout(function(){
    document.getElementById('nombre').focus();
  },500);
}
const Validar = () =>{
  var parametros;
  if(operation == 1){
    if(tipo.trim()===''){
      show_alerta('Seleccione el tipo de linea','warning');
    }
    else if(texto.trim()===''){
      show_alerta('Escribe la indicacion','warning');
    }
    else if(id_Nota.trim()===''){
      show_alerta('Escoja la nota que llevara','warning');
    }
    else if(id_Escaleta.trim()===''){
      show_alerta('Selecciona la escaleta ligada','warning');
    }
    else if(id_Conductor===''){
      show_alerta('Escoge el conductor','warning');
    }
  }
  else{
    if(texto.trim()===''){
      show_alerta('Escribe la indicacion','warning');
    }
    else if(id_Escaleta.trim()===''){
      show_alerta('Selecciona la escaleta ligada','warning');
    }
    else{
    if(operation === 1){
      parametros = {texto:texto.trim(),idNota:id_Nota.trim(),idEscaleta:id_Escaleta.trim(),idConductor:id_Conductor.trim()};
        axios.post('https://localhost:7201/Linea/PostNota', parametros).then(function(respuesta){
        document.getElementById('btnCerrar').click();
        GetDatos();
      })
      .catch(function(error){
        show_alerta('error en la solicitud','error');
        console.log(error);
      });

    }
    else if(operation === 2){
      parametros = {tipo:tipo.trim(),texto:texto.trim(),idNota:id_Conductor,idEscaleta:id_Escaleta,idConductor:id_Conductor};
      axios.put('https://localhost:7201/Usuario/Put/' + iD_Linea, parametros).then(function(respuesta){
        document.getElementById('btnCerrar').click();
        GetDatos();
      })
      .catch(function(error){
        show_alerta('error en la solicitud','error');
        console.log(error);
      });

    }
    else{
      parametros = {texto:texto.trim(),idEscaleta:id_Escaleta};
        axios.post('https://localhost:7201/Linea/PostIndicacion', parametros).then(function(respuesta){
        document.getElementById('btnCerrar').click();
        GetDatos();
      })
      .catch(function(error){
        show_alerta('error en la solicitud','error');
        console.log(error);
      });
    }
    console.log("Se termino el consumo de la api");
  }}
}
const deleteDatos = (iD_Linea) =>{
  const MySwal = whitReactContent(Swal);
  MySwal.fire({
    title:'Seguro que quieres borrar esta linea?',
    icon: 'question', text:'No se podra recuperar despues',
    showCancelButton:true,confirmButtonText:"si, eliminar",cancelbuttonText:'cancelar'
  }).then((result) =>{
    if(result.isConfirmed){
      setID_Linea(iD_Linea);
      axios.delete('https://localhost:7201/Linea/Delete/' + iD_Linea).then(function(respuesta){
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
const Corte=()=>{
  setTexto('CORTE');
  setId_Escaleta(id);
  var parametros = {texto:texto.trim(),idEscaleta:id};
  const respuesta = axios.get('https://localhost:7201/Linea/PostIndicacion',parametros).then(function(respuesta){
    GetDatos();
  })
  .catch(function(error){
    show_alerta('error en la solicitud','error');
    console.log(error);
  });
  
}

//Comienza el codigo de beto
  const Save = () => {
    setRows.Save()
  }

  const [dragItem, setDragItem] = useState();
  const [rows, setRows] = useState([
    
    { id: '1', order: '1', content: 'Javier', title: 'Manifestacion', reportero: 'Iliana', format: 'FT' },
    { id: '2', order: '2' ,content: 'Javier', title: 'Fuga de agua', reportero: 'Iliana', format: 'FT' },
    { id: '3', order: '3', content: 'Javier', title: 'Incendio', reportero: 'Iliana', format: 'TX/IN' },
    { id: '4', order: '4',content: 'Javier', title: 'Trafico', reportero: 'Iliana', format: 'TX' },
  ]);
  
  const handleAddRow = () => {
    const newRow = {
        id: rows.length + 1, content: '-', title: 'INDICACION', reportero: '-', format: '-' 
    };

    setRows([...rows, newRow]);
  };
  

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newRows = [...rows];
    const [removed] = newRows.splice(result.source.index, 1);
    newRows.splice(result.destination.index, 0, removed);

    setRows(newRows);
  };
  

  const handleDragStart = (index) => {
    setDragItem(index);
  };
  
  const handleDragEnter = (e, index) => {
    e.target.style.backgroundColor = "#336699";
    const newRows = [...rows];
    const item = newRows[dragItem];
    newRows.splice(dragItem, 1);
    newRows.splice(index, 0, item);
    setDragItem(index);
    setRows(newRows);
  };
  
  const handleDragLeave = (e) => {
    e.target.style.backgroundColor = "rgb(192, 192, 192)";
  };
  
  const handleDrop = (e) => {
    e.target.style.backgroundColor = "rgb(192, 192, 192)";
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form-escaleta">
        <div className="Auth-form-content">
            <h3 className="Auth-form-title">Cancun Vive 22-06-23</h3>
            <form className="Button-form">
                  <Link to='/Escaletas'>
                    <button type="button" class="btn btn-dark"  > <FaAngleLeft size={20} color="white"/> Regresar</button>
                  </Link>
                    <button type="button" class="btn btn-success"> <FaSave size={20} color="white"/> Guardar </button>
                    <button type='button' class='btn btn-warning'> <FaEdit size={20} color='black'/> Editar Escaleta</button>
                    <button type="button" class="btn btn-primary" onClick={handleAddRow} > <BsFillSignpostFill size={20} color='white'/> Agregar Indicación</button>
                    
                  <Link to='/AgregarNotas'>
                    <button type="button" class="btn btn-success"> <FaPlusSquare size={20} color='white'/> Agregar Nota</button>
                  </Link>
                  <button type='button' class='btn btn-danger'> <FaFilePdf size={20} color='white'/> Generar PDF </button>
                  <button type='button' class='btn btn-danger' color='#530108'> Generar Prompt</button>
            </form>
            <br />

            <div>
              <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="rows">
                    {(provided) => (
                      <table class="table" >
                          <thead>
                            
                              <tr >
                                  <th scope="col">#</th>
                                  <th scope='col'>Orden</th>
                                  <th scope="col">Conductor</th>
                                  <th scope="col">Titulo</th>
                                  <th scope="col">Reportero</th>
                                  <th scope="col">Formato</th>
                                  <th scope="col">          </th>
                              </tr>
                          </thead>
                        
                        
                        <tbody>
                          {rows.map((row, index) => (
                            <Draggable key={row.id} draggableId={row.id} index={index}  >
                              {(provided) => (
                                
                                <tr className="dnd"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  draggable
                                  key={index}
                                  onDragStart={() => handleDragStart(index)}
                                  onDragEnter={(e) => handleDragEnter(e, index)}
                                  onDragLeave={(e) => handleDragLeave(e)}
                                  onDrop={(e) => handleDrop(e)}
                                  onDragOver={(e) => e.preventDefault()}>
                                  <td> {row.id} </td>
                                  <td> {row.order} </td>
                                  <td>{row.content}</td>
                                  <td> {row.title} </td>
                                  <td> {row.reportero} </td>
                                  <td> {row.format} </td>
                                  <td>    
                                    <button type="button" class="btn btn-warning"> <FaEdit size={20} color="black" />  Editar</button> 
                                    <button type="button" class="btn btn-danger"> <FaTrash size={20} color='white' /> Eliminar</button> 
                                  </td>
                                </tr>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </tbody>
                      </table>
                    )}
                  </Droppable>
                </DragDropContext>
            </div>
        </div>
      <br/>
      </form>

      <div>
                <form className="Button-form">
                    <Link to='/Header/EscaletaProgramas'>
                        <button type="button" class="btn btn-dark"> <FaAngleLeft size={20} color="white"/> Regresar</button>
                    </Link>
                        <button onClick={()=> Corte()} type="button" class="btn btn-success"> <FaSave size={20} color="white"/> Agregar corte </button>                
                        <button onClick={()=> OpenModal(3)} class="btn btn-primary" data-bs-toggle='modal' data-bs-target='#modalIndicacion' type="button"> <FaSearch  size={20} color="white"/> agregar indicacion</button>                
                        <button onClick={()=> OpenModal(1)} type="button" class="btn btn-primary" data-bs-toggle='modal' data-bs-target='#modaldefault'> <FaSearch  size={20} color="white"/> agregar nota</button>
                </form>
            </div>

            <div className="Auth-form-container-Main">
            <form className='Table-form'>
            <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Conductor</th>
                            <th scope="col">Indicación</th>
                            <th scope="col">Nota</th>
                            <th scope="col">Reportero</th>
                            <th scope="col">Formato</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    {Datos.map((Datos,i) =>(
                    <tbody>
                            <tr>
                                <td>{(i+1)}</td>
                                <td>{Datos.conductor.nomConductor}</td>
                                <td>{Datos.texto}</td>
                                <td>{Datos.nota.titulo}</td>
                                <td>{Datos.nota.usuario.nombre}</td>
                                <td>{Datos.nota.formato.nomFormato}</td>
                                <td className="buttons-th"> 
                                  <button onClick={()=> OpenModal(2,Datos.tipo,Datos.texto,Datos.id_Nota,Datos.id_Escaleta,Datos.id_Conductor)} data-bs-toggle='modal' data-bs-target='#modaldefault' type="button" class="btn btn-warning"> <FaEdit size={20} color="black" />  Editar</button> 
                                  <button onClick={()=> deleteDatos(Datos.iD_Linea)} type="button" class="btn btn-danger"> <FaTrash size={20} color='white' /> Eliminar</button> 
                                </td>
                            </tr>
                    </tbody>
                    ))}
                </table>
                
            </form>
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
                <input type='text' id="nombre" className="form-control" placeholder="Tipo" value={tipo}
                onChange={(e)=> setTipo(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type='text' id="apellidos" className="form-control" placeholder="Texto" value={texto}
                onChange={(e)=> setTexto(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <select required className="form-select" value={id_Nota} onChange={(e)=> setId_Nota(e.target.value)}>
                  {Datos.map(Datos =>(
                      <option value={Datos.id_Nota}>{Datos.nota.titulo}</option>
                  ))}
                  //          valor que escoge       datos que se muestran
                </select>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <select required className="form-select" value={id_Escaleta} onChange={(e)=> setId_Escaleta(e.target.value)}>
                  {Datos.map(Datos =>(
                      <option value={Datos.id_Escaleta}>{Datos.id_Escaleta}</option>
                  ))}
                  //          valor que escoge       datos que se muestran
                </select>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <select required className="form-select" value={id_Conductor} onChange={(e)=> setId_Conductor(e.target.value)}>
                  {Datos.map(Datos =>(
                      <option value={Datos.id_Conductor}>{Datos.conductor.nomConductor}</option>
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
      {/* Modal indicacion */}
      <div id='modalIndicacion' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <input type='text' id="apellidos" className="form-control" placeholder="Texto" value={texto}
                onChange={(e)=> setTexto(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className="input-group-text"><i className="fa-solid fa-gift"></i></span>
                <select required className="form-select" value={id_Escaleta} onChange={(e)=> setId_Escaleta(e.target.value)}>
                  {Datos.map(Datos =>(
                      <option value={Datos.id_Escaleta}>{Datos.escaleta.idEscaleta}</option>
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
  );
};

export default Table