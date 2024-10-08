import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Ingresar.css'; // Importa el archivo CSS
import Modal from './Modal'; // Importa el componente modal

const Ingresar = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    fechaingeso: '',
    estado: 'Seleccione un estado',
  });

  const [mensaje, setMensaje] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'https://examen2-usuario.onrender.com/api/usuario';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(`Datos enviados correctamente. El ID del registro es: ${data.usuario.id}`);
        setShowModal(true); // Muestra el modal cuando los datos se envían correctamente
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          direccion: '',
          fechaingeso: '',
          estado: 'Seleccione un estado',
        });
      } else {
        setMensaje('Error al enviar los datos.');
        setShowModal(true); // Muestra el modal en caso de error
      }
    } catch (error) {
      setMensaje('Ocurrió un error al enviar los datos.');
      setShowModal(true); // Muestra el modal en caso de error
    }
  };

  const handleRedirect = (ruta) => {
    navigate(ruta);
  };

  const closeModal = () => {
    setShowModal(false); // Cierra el modal cuando se presiona "Cerrar"
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Registro de Usuario</h2>
      
      <form onSubmit={handleSubmit}>
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

        <div className="button-container">
          <button type="submit" className="enviar">Enviar</button>
          <button type="button" className="actualizar" onClick={() => handleRedirect('/usuarioA')}>Actualizar</button>
          <button type="button" className="buscar" onClick={() => handleRedirect('/usuarioB')}>Buscar</button>
          <button type="button" className="eliminar" onClick={() => handleRedirect('/usuarioE')}>Eliminar</button>
        </div>
      </form>

      {/* Modal para mostrar el mensaje */}
      {showModal && <Modal mensaje={mensaje} closeModal={closeModal} />}
    </div>
  );
};

export default Ingresar;
