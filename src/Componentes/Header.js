import { Outlet, Link } from "react-router-dom";

const Menu = () =>{
return <div>
	<h1>Bienvenido</h1>
    <table> 
	<tr> 
		<td class="mnu_separator">
            <Link to="Bitacora">Bitacora</Link>
		</td>
		<td> 
            <Link to="EscaletaProgramas">Escaletas</Link>
		</td>
		<td class="mnu_separator">
			<Link to="GuionNota">Notas</Link>
		</td>
		<td class="mnu_separator">
			<p>///</p>
		</td>
		<td class="mnu_separator">
		<Link to="Usuario">Usuario</Link>
		</td>
		<td class="mnu_separator">
		<Link to="Notas">Notas</Link>
		</td>
		<td class="mnu_separator">
		<Link to="Guiones">Guiones</Link>
		</td>
		<td class="mnu_separator">
		<Link to="Roles">Roles</Link>
		</td>
		<td class="mnu_separator">
		<Link to="Categorias">Categorías</Link>
		</td>
		<td class="mnu_separator">
		<Link to="Conductor">Conductores</Link>
		</td>
		<td class="mnu_separator">
		<Link to="Formatos">Formatos</Link>
		</td>
		<td class="mnu_separator">
		<Link to="Programas">Programas</Link>
		</td>
		<td width="100%">
		
			<table cellspacing="0" align="right" class="menu_usr">
				<tr>
					<Link to="CPrueba">Componente de prueba</Link>
				</tr>				
				<tr>
					<Link to="/">Salir</Link>
				</tr>
			</table>
		
		</td>
	</tr> 
</table>

    <hr/>
    <Outlet/>
</div>;
}

export default Menu;