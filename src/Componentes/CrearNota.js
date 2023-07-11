import React, { useState, Component, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// const Post = () => {
//   const [state, setState] = useState({
//     categoria: ""
//   });

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setState({
//       ...state,
//       [e.target.name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const CatData = {
//       categoria: state.name
//     };
//     axios.post("https://localhost:7201/Nota/Get", CatData).then((result) => {
//       console.log(result);
//     });
//   };
//   return (
//     <div>
//       <h1>Register or Create new account</h1>
//       <hr />
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="name">
//           Name
//           <input
//             type="text"
//             name="name"
//             value={state.name}
//             onChange={handleChange}
//           />
//         </label>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };
// class App extends Component{
//     state = {
//     categoria: [],
//     formato: [],
//     usuario: [],
//   }
//   componentDidMount(){
//     axios
//     .get("https://localhost:7201/Categoria/Get")
//     .then((response) => {
//       console.log(response.data.result);
//       this.setState({categoria : response.data.result})
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//     axios
//     .get("https://localhost:7201/Formato/Get")
//     .then((res) => {
//       console.log(res.data.result);
//       this.setState({formato : res.data.result})
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//     axios
//     .get("https://localhost:7201/Usuario/Get")
//     .then((res) => {
//       console.log(res.data.result);
//       this.setState({usuario : res.data.result})
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   }

//   render(){
//     return(
//       <div>
//         <label for="password">
//         Categoria
//           <select>
//             {this.state.categoria.map(elemento =>(
//             <option key={elemento.id_Categoria} value={elemento.id_Categoria}>{elemento.nomCategoria}</option>
//             )
//             )}
//           </select>
//         </label>
//         <label for="password">
//         Formato
//           <select>
//             {this.state.formato.map(elemento =>(
//             <option key={elemento.id_Formato} value={elemento.id_Formato}>{elemento.nomFormato}</option>
//             )
//             )}
//           </select>
//         </label>
//         <label for="password">
//         Usuario
//           <select>
//             {this.state.usuario.map(elemento =>(
//             <option key={elemento.id_Usuario} value={elemento.id_Usuario}>{elemento.nombre}</option>
//             )
//             )}
//           </select>
//             <span>Seleccionado: { 'Pk: ' + this.state.usuario.id_Usuario }</span>
//         </label>
//       </div>
//     );
//   }
// }

// export default App;

const App = () => {
  const [state, setState] = useState({
    titulo: "",
    idFormato: 0,
    idReportero: 0,
    idCategoria: 0

  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const NotaData = {
      categoria: state.name
    };
    axios.post("https://localhost:7201/Nota/Post", NotaData).then((result) => {
      console.log(result);
    });
  };

  const [posts, setPosts] = useState([]);
  useEffect(() => {
      const getPosts = async () =>{
          const {data: res} = await axios.get("https://localhost:7201/Formato/Get");
          setPosts(res.result);
          console.log(res.result)
      }
      getPosts();
  },[]);

  return (
    <div>
      <h1>Crear una nota</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </label>
        
        <button type="submit">Crear</button>
        <Link to="/Categorias"></Link>
      </form>
      
        <label for="password">
         Categoria
           {/* <select>
           {posts.map((post) => (
            <option key={post.id_Categoria} value={post.id_Formato}>{post.nomCategoria}</option>
                    ))}
          </select> */}
        </label>
        <label for="password">
        Formato
          <select>
          {posts.map((post) => (
            <option key={post.id_Formato} value={post.id_Formato}>{post.nomFormato}</option>
                    ))}
          </select>
        </label>
        <label for="password">
        Usuario
          <select>
            {/* {this.state.usuario.map(elemento =>(
            <option key={elemento.id_Usuario} value={elemento.id_Usuario}>{elemento.nombre}</option>
            )
            )} */}
          </select>
        </label>
    </div>
  );
};

export default App;