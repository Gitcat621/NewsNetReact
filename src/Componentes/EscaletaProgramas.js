import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const Escaleta = () => {
  const [programas, setProgramas] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7201/Programa/Get")
      .then((response) => {
        console.log(response.data.result);
        setProgramas(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <body>
      <div>
        <h3>Escaletas</h3>
      </div>

      <div>
        <form className="Button-form">
          <Link to='/Header'>
            <button type="button" className="btn btn-dark">
              <FaAngleLeft size={20} color="white" /> Regresar
            </button>
          </Link>

          <Link to='/EscaletaView'>
            <button type="button" className="btn btn-primary">
              <FaSearch size={20} color="white" /> Buscar
            </button>
          </Link>
        </form>
      </div>

      <div className="Auth-form-container-Main">
        <form className='Table-form'>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Programa</th>
                <th scope="col">Categoria</th>
                <th scope="col">Fecha</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            {programas.map((programa) => (
              <tbody key={programa.iD_Programa}>
                <tr>
                  <td>{programa.iD_Programa}</td>
                  <td>{programa.nomPrograma}</td>
                  <td>{programa.categoria.nomCategoria}</td>
                  <td>28/06/2023</td>
                  <td className="buttons-th">
                    <Link to={'/Escaletas/' + programa.iD_Programa} className="btn btn-success">
                      <FaEye size={20} color="white" /> Ver
                    </Link>
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

export default Escaleta;