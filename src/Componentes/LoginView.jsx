import React from "react";
import { Link } from "react-router-dom";



function Login() {
    return (
        <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Iniciar sesion</h3>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="user"
                className="form-control mt-1"
                placeholder="Username"
              />
            </div>
            <div className="form-group mt-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Contraseña"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              
            <Link to="Header">Ingresar</Link>
            </div>
          </div>
        </form>
      </div>
    )
}



export default Login