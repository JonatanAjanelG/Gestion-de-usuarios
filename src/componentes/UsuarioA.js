import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/actualizar.css'; // Importa el archivo CSS

const Ingresar = () => {
  const [formData, setFormData] = useState({
    id: '', // Campo para el ID del usuario a modificar
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    fecha: '',
    estado: 'Seleccione un estado',
  });

  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = formData.id ? `/api/usuarioA/${formData.id}` : '/api/usuarioA'; // Si hay un ID, se usa para actualizar

    try {
      const response = await fetch(apiUrl, {
        method: formData.id ? 'PUT' : 'POST', // Si hay un ID, se usa PUT para actualizar
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(formData.id ? `Usuario con ID ${formData.id} actualizado correctamente.` : `Datos enviados correctamente. El ID del registro es: ${data.usuario.id}`);
        setFormData({
          id: '',
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          direccion: '',
          fecha: '',
          estado: 'Seleccione un estado',
        });
      } else {
        setMensaje('Error al enviar los datos.');
      }
    } catch (error) {
      setMensaje('Ocurrió un error al enviar los datos.');
    }
  };

  const handleRegresar = () => {
    navigate('/'); // Redirige a la página principal o la ruta que prefieras
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Modificar Usuario</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Campo para el ID del usuario */}
        <div>
          <label htmlFor="id">ID del Usuario:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Ingrese el ID del usuario que desea actualizar"
            required
          />
        </div>

        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="direccion">Dirección:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="fechaingeso">Fecha Ingreso:</label>
          <input
            type="date"
            id="fechaingeso"
            name="fechaingeso"
            value={formData.fechaingeso}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          >
            <option value="">Seleccione un estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        {/* Botones */}
        <div className="button-container">
          <button type="submit" className="actualizar">Actualizar</button>
          <button type="button" onClick={handleRegresar} className="regresar">Regresar</button>
        </div>

        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
};

export default Ingresar;
