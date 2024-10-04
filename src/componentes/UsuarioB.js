import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/buscar.css'; // Importa el archivo CSS

const BuscarUsuario = () => {
  const [id, setId] = useState(''); // Estado para almacenar el ID del usuario
  const [usuario, setUsuario] = useState(null); // Estado para almacenar los datos del usuario
  const [mensaje, setMensaje] = useState(''); // Estado para mostrar mensajes de éxito o error
  const navigate = useNavigate(); // Hook para manejar la navegación

  // Función para manejar el cambio en el input de ID
  const handleChange = (e) => {
    setId(e.target.value);
  };

  // Función para obtener los datos del usuario
  const handleBuscarUsuario = async (e) => {
    e.preventDefault();

    if (!id) {
      setMensaje('Por favor, ingrese un ID válido.');
      return;
    }

    const apiUrl = `https://examen2-usuario.onrender.com/api/usuario/${id}`; // URL de la API para obtener el usuario por ID

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setUsuario(data.usuario); // Accedemos a la propiedad "usuario" dentro de la respuesta
        setMensaje('');
      } else {
        setMensaje('Usuario no encontrado. Verifique el ID.');
        setUsuario(null); // Limpiar los datos si no se encuentra el usuario
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Ocurrió un error al buscar el usuario.');
      setUsuario(null); // Limpiar los datos en caso de error
    }
  };

  // Función para regresar a la página anterior
  const handleRegresar = () => {
    navigate('/'); // Redirige a la página de inicio o a la ruta que desees
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Buscar Usuario</h2>
      
      <form onSubmit={handleBuscarUsuario}>
        <div>
          <label htmlFor="id">ID del Usuario:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={handleChange}
            required
            placeholder="Ingrese el ID del usuario"
          />
        </div>

        <div className="button-container">
          <button type="submit" className="buscar">Buscar Usuario</button>
          <button type="button" onClick={handleRegresar} className="regresar">Regresar</button>
        </div>

        {mensaje && <p>{mensaje}</p>}
      </form>

      {/* Mostrar la tabla de datos si el usuario es encontrado */}
      {usuario && (
        <div>
          <h3>Datos del Usuario</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Fecha Ingreso</th> {/* Cambiado para reflejar el campo correcto */}
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.direccion}</td>
                <td>{usuario.fechaingeso}</td> {/* Usar el nombre correcto "fechaingeso" */}
                <td>{usuario.estado}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuscarUsuario;
