import {FaAngleLeft} from 'react-icons/fa';
import { FaPlusSquare } from "react-icons/fa";
import { FaSave } from 'react-icons/fa';
import { FaMinusSquare } from 'react-icons/fa'
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const NuevoGuion = () => {
  const [Datos, SetDatos] = useState([]);
  const [Notas, SetNotas] = useState([]);
  const [iD_Guion, setID_Guion] = useState('');
  const [anotacion, setAnotacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [id_Nota, setId_Nota] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');


  
  const crear=()=>{
    
    setTexto('');
    setId_Escaleta(id);
    var parametros = {anotacion:anotacion.trim(),descripcion:descripcion.trim(),id_Nota:id};
    const respuesta = axios.post('https://localhost:7201/Linea/PostIndicacion',parametros).then(function(respuesta){
    })
    .catch(function(error){
      show_alerta('error en la solicitud','error');
      console.log(error);
    });
    
  }

  const [textAreas, setTextAreas] = useState(['Texto largo...']);

  const handleAddTextArea = () => {
    setTextAreas((prevState) => [...prevState, '']);
  };

  const [textareaValue, setTextareaValue] = useState('');

  const handleChangeHeight = (large) => {
    const { value } = large.target;
    setTextareaValue(value);
    large.target.style.height = 'auto';
    large.target.style.height = large.target.scrollHeight + 'px';
  };

  const handleRemoveTextArea = (index) => {
    const updatedTextAreas = [...textAreas];
    updatedTextAreas.splice(index, 1);
    setTextAreas(updatedTextAreas);
  };

  const handleChange = (event, index) => {
    const { value } = event.target;
    const updatedTextAreas = [...textAreas];
    updatedTextAreas[index] = value;
    setTextAreas(updatedTextAreas);
    setTextareaValue(value);
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };


  const handleInput = (event, index) => {
    const { value, scrollHeight } = event.target;
    event.target.style.height = scrollHeight + 'px';
    const updatedTextAreas = [...textAreas];
    updatedTextAreas[index] = value;
    setTextAreas(updatedTextAreas);
  };

  useEffect(() => {
    const textareaLeft = document.getElementById('textarea-left');
    const textareaRight = document.getElementById('textarea-right');

    const handleTextareaInput = () => {
      textareaRight.style.height = textareaLeft.scrollHeight + 'px';
    };

    const handleTextareaScroll = () => {
      textareaRight.scrollTop = textareaLeft.scrollTop;
    };

    textareaLeft.addEventListener('input', handleTextareaInput);
    textareaLeft.addEventListener('scroll', handleTextareaScroll);

    return () => {
      textareaLeft.removeEventListener('input', handleTextareaInput);
      textareaLeft.removeEventListener('scroll', handleTextareaScroll);
    };
  }, []);

  return (
    <div className="Auth-form-container">
      <form className="Auth-form-Guion">
        <div className="Auth-form-content">
          <h2 className="Auth-form-title">Crear guión</h2>
          <h3 className="Text-helper">Escriba en las cuadrillas a continuación los guiones que desea agregar a la nota</h3>
          <div>
            <h3>TITULO: SAMPLE TEXT</h3>
          </div>
          <br />
          <div>
            <form className="Button-form">
              <Link to='/Header/GuionNota'>
              <button type="button" className="btn btn-dark">
                <FaAngleLeft size={20} color="white" /> Regresar
              </button>
              </Link>
              <button type="button" className="btn btn-success">
                <FaSave size={20} color="white" /> Guardar cambios
              </button>
              <button type="button" className="btn btn-primary" onClick={handleAddTextArea}>
                <FaPlusSquare size={20} color="white" /> Agregar Celda
              </button>
              <button type="button" className="btn btn-danger" onClick={() => handleRemoveTextArea()}>
                <FaMinusSquare size={20} color="white" /> Quitar Celda
              </button>
            </form>
          </div>
          <br />
          <div>
            {textAreas.map((text, index) => (
              <div className="textarea-container" key={index}>
                <textarea
                  class="textarea-left"
                  id="textarea-left"
                  style={{ width: "300px", resize: "none" }}
                  onChange={handleChange}
                />

                <textarea
                  class="textarea-right"
                  id="textarea-right"
                  style={{ width: "300px", resize: "none"}}
                />
              </div>
            ))}
          </div>
        </div>
        <br />
      </form>
    </div>
  );
};

export default NuevoGuion;