import React from "react";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa";
import {FaAngleLeft} from 'react-icons/fa';
import { FaPlusSquare } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaEye } from 'react-icons/fa'


function Bitacora() {
return (
  <body>
            <div>
                <h3>Bitácora de notas</h3>
            </div>

            <div>
                <form className="Button-form">
                    <button type="button" class="btn btn-dark"> <FaAngleLeft size={20} color="white"/> Regresar</button>
                    <button type="button" class="btn btn-success"> <FaPlusSquare size={20} color="white"/> Agregar Nota</button>
                    <button type="button" class="btn btn-primary"> <FaSearch  size={20} color="white"/> Buscar</button>
                </form>
            </div>

        <div className="Auth-form-container-Main">
            <form className='Table-form'>
            <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">No. Nota</th>
                            <th scope="col">Título</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Formato</th>
                            <th scope="col">Reportero</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">     </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row">1</td>
                            <td>Manifestacion</td>
                            <td>Noticias</td>
                            <td>TX</td>
                            <td>Brito</td>
                            <td>11-06-23</td>
                            <td className="buttons-th"> 
                                 <button type="button" class='btn btn-success'>  <FaEye size={20} color="white"/> Ver </button>
                                 <button type="button" class="btn btn-warning"> <FaEdit size={20} color="black" />  Editar</button> 
                                 <button type="button" class="btn btn-danger"> <FaTrash size={20} color='white' /> Eliminar</button> 
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">1</td>    {/* <td> {{ nota.iD_Nota }} </td>    */}
                            <td>Manifestacion</td>
                            <td>Noticias</td>
                            <td>TX</td>
                            <td>Brito</td>
                            <td>11-06-23</td>
                            <td className="buttons-th"> 
                                 <button type="button" class='btn btn-success'>  <FaEye size={20} color="white"/> Ver </button>
                                 <button type="button" class="btn btn-warning"> <FaEdit size={20} color="black"/> Editar</button> 
                                 <button type="button" class="btn btn-danger"> <FaTrash size={20} color='white' /> Eliminar</button> 
                            </td>
                        </tr>
                        <tr>
                            <td scope="row">1</td>
                            <td>Manifestacion</td>
                            <td>Noticias</td>
                            <td>TX</td>
                            <td>Brito</td>
                            <td>11-06-23</td>
                            <td className="buttons-th">

                                  <button type="button" class='btn btn-success'>  <FaEye size={20} color="white"/> Ver </button>
                                 <button type="button" class="btn btn-warning"> <FaEdit size={20} color="black"/> Editar</button> 
                                 <button type="button" class="btn btn-danger"> <FaTrash size={20} color='white'/> Eliminar</button> 
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </form>
        </div>
        
        </body>
)
}

export default Bitacora;