import { Outlet, Link } from "react-router-dom";

const Menu = () =>{
return <div>
    <nav>
        <ul>
        <li>
            <Link to="/Usuario">Usuario</Link>
        </li>
        <li>
            <Link to="/Bitacora">Bitacora</Link>
        </li>
        <li>
            <Link to="/Categoria">Categoria</Link>
        </li>
        </ul>
    </nav>
    <hr/>
    <Outlet/>
</div>;
}

export default Menu;