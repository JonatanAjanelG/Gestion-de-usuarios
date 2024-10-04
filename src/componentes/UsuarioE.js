import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/eliminar.css'; // Importa el archivo CSS

const EliminarUsuario = () => {
  const [id, setId] = useState(''); // Estado para almacenar el ID del usuario
  const [mensaje, setMensaje] = useState(''); // Estado para mostrar mensajes de éxito o error
  const navigate = useNavigate(); // Hook para manejar la navegación

  // Función para manejar el cambio en el input de ID
  const handleChange = (e) => {
    setId(e.target.value);
  };

  // Función para manejar el envío del formulario y eliminar el usuario
  const handleEliminar = async (e) => {
    e.preventDefault();

    if (!id) {
      setMensaje('Por favor, ingrese un ID válido.');
      return;
    }

    const apiUrl = `https://examen2-usuario.onrender.com/api/usuarioD/${id}`; // URL de la API para eliminar el usuario por ID

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMensaje(`Usuario con ID ${id} eliminado correctamente.`);
        setId(''); // Limpiar el campo ID
      } else {
        setMensaje('Error al eliminar el usuario. Verifique que el ID sea correcto.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Ocurrió un error al eliminar el usuario.');
    }
  };

  // Función para regresar a la página anterior
  const handleRegresar = () => {
    navigate('/'); // Redirige a la página de inicio o a la ruta que desees
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Eliminar Usuario</h2>
      
      <form onSubmit={handleEliminar}>
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
          <button type="submit" className="eliminar">Eliminar</button>
          <button type="button" onClick={handleRegresar} className="regresar">Regresar</button>
        </div>

        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
};

export default EliminarUsuario;
