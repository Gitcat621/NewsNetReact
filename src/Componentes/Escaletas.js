import React, { Component } from "react";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa";
import {FaAngleLeft} from 'react-icons/fa';
import { FaPlusSquare } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaEye } from 'react-icons/fa';
import { Link } from "react-router-dom";
import axios from "axios";

class Escaleta extends Component{
    state = {
    programas: []
  }
  componentDidMount(){
    axios
    .get("https://localhost:7201/Programa/Get")
    .then((response) => {
      console.log(response.data.result);
      this.setState({programas : response.data.result})
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render(){
    return(
<body>
            <div>
                <h3> Escaletas </h3>
            </div>

            <div>
                <form className="Button-form">
                    <Link to='/MainMenu'>
                        <button type="button" class="btn btn-dark"> <FaAngleLeft size={20} color="white"/> Regresar</button>
                    </Link>

                    <Link to='/NuevaEscaleta'>
                        <button type="button" class="btn btn-success"> <FaPlusSquare size={20} color="white"/> Agregar Nueva Escaleta</button>                
                    </Link>

                    <Link to='/EscaletaView'>
                        <button type="button" class="btn btn-primary"> <FaSearch  size={20} color="white"/> Buscar</button>                
                    </Link>
                </form>
            </div>

            <div className="Auth-form-container-Main">
            <form className='Table-form'>
            <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Programa</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    {this.state.programas.map((programas) => (
                    <tbody>
                            <tr>
                                <td>{programas.iD_Programa}</td>
                                <td>{programas.nomPrograma}</td>
                                <td>{programas.categoria.nomCategoria}</td>
                                <td>28/06/2023</td>
                                <td className="buttons-th"> 
                                  <button type="button" class='btn btn-success'>  <FaEye size={20} color="white"/> Ver </button>
                                  <button type="button" class="btn btn-warning"> <FaEdit size={20} color="black" />  Editar</button> 
                                  <button type="button" class="btn btn-danger"> <FaTrash size={20} color='white' /> Eliminar</button> 
                                </td>
                            </tr>
                    </tbody>
                    ))}
                </table>
                
            </form>
        </div>
        </body>

    );
  }
}

export default Escaleta;