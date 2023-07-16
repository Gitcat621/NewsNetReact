import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {FaAngleLeft} from 'react-icons/fa';
import {FaPrint} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const LeerGuion=()=>{
    const [Datos, SetDatos] = useState([]);
    const {id} = useParams()
    useEffect(()=>{
      GetDatos();
  },[]);
  
  const GetDatos = async()=>{
      const respuesta = await axios.get('https://localhost:7201/Guion/GetNota/'+id);
      console.log(respuesta.data.result);
      SetDatos(respuesta.data.result);
  }
    return(
        <div className="Auth-form-container">
        <form className="Auth-form-Guion">
        <div className="Auth-form-content">
            {/* <h2 className="Auth-form-title">Guión Cancun Vive 03/07/23</h2>
            <div className="Row">
                <div className="Grid">
                    <h5> Reportero: reportero  </h5>
                </div>
                <div className="Grid">
                    <h5> Categoria: categoria </h5>
                </div>
                <div className="Grid">
                    <h5> Formato: formato </h5>
                </div>
            </div>
            <br /> */}
            <div>
                <form className="Button-form">
                    <Link to='/Header/GuionNota'>
                        <button type="button" class="btn btn-dark"> <FaAngleLeft size={20} color="white"/> Regresar</button>
                    </Link>
                    <button type="button" class="btn btn-primary">  <FaPrint size={20} color="white"/> Imprimir Guión </button>
                </form>
            </div>
            <br />
            <div className="Row-Guion">
            {Datos.map((Datos) =>(
                    <div>
                        <textarea  type="text"
                                className="excel-cell-input"
                                value={Datos.anotacion}
                                disabled='true'
                                />
                        <textarea  type="text"
                                className="excel-cell-input"
                                value={Datos.descripcion} disabled='true' Resize='none'/>
                    </div>
                    ))}
            </div>

        </div>
            <br />
        
        </form>
    </div>
    )
    
}

 export default LeerGuion