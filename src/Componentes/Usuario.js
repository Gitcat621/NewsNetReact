import React from "react";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa";
import {FaAngleLeft} from 'react-icons/fa';
import { FaPlusSquare } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaEye } from 'react-icons/fa'
import axios from "axios";

// const baseURL = 

function Usuario(){
 return(
<body>
    
            <div>
                <h3>USUARIOS</h3>
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
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Usser</th>
                            <th scope="col">Password</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Administrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre</td>
                            <td>Apellido</td>
                            <td>Nick</td>
                            <td>621</td>
                            <td>Admin</td>
                            <td className="buttons-th"> 
                                 <button type="button" class='btn btn-success'>  <FaEye size={20} color="white"/> Ver </button>
                                 <button type="button" class="btn btn-warning"> <FaEdit size={20} color="black" />  Editar</button> 
                                 <button type="button" class="btn btn-danger"> <FaTrash size={20} color='white' /> Eliminar</button> 
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </form>
        </div>
        
        </body>

 )
}

export default Usuario;