'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveVehicleAction, deleteImageAction } from './actions';

const inputStyle = { width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '0.25rem' };
const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: '600' };

export default function VehicleForm({ vehicle, isNew }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(vehicle?.images || []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const result = await saveVehicleAction(formData, vehicle?.id, isNew);
    
    if (result.success) {
      router.push('/admin/vehiculos');
      router.refresh();
    } else {
      alert(result.error);
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imgId) => {
    if(!confirm('¿Seguro que deseas eliminar esta imagen?')) return;
    
    setLoading(true);
    const res = await deleteImageAction(imgId);
    if(res.success) {
      setImages(images.filter(img => img.id !== imgId));
      router.refresh();
    } else {
      alert('Error eliminando imagen');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', maxWidth: '800px', backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
      
      {/* Imágenes actuales (solo en edición) */}
      {!isNew && images.length > 0 && (
        <div style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Imágenes Actuales</h3>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {images.map(img => (
              <div key={img.id} style={{ position: 'relative', width: '120px', height: '90px', borderRadius: '0.5rem', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="Coche" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                <button type="button" onClick={() => handleDeleteImage(img.id)} style={{ position:'absolute', top: '0.25rem', right: '0.25rem', background: 'red', color: 'white', border: 'none', borderRadius:'50%', width:'24px', height:'24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marca y Modelo */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Marca *</label>
          <input required type="text" name="marca" defaultValue={vehicle?.marca || ''} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Modelo *</label>
          <input required type="text" name="modelo" defaultValue={vehicle?.modelo || ''} style={inputStyle} />
        </div>
      </div>

      {/* Versión, Precio y Estado */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Versión</label>
          <input type="text" name="version" defaultValue={vehicle?.version || ''} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Precio (€) *</label>
          <input required type="number" name="precio" defaultValue={vehicle?.precio || ''} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Estado</label>
          <select name="estado" defaultValue={vehicle?.estado || 'disponible'} style={inputStyle}>
            <option value="disponible">Disponible</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido</option>
          </select>
        </div>
      </div>

      {/* Año, Kilómetros, Combustible y Cambio */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Año</label>
          <input type="number" name="year" defaultValue={vehicle?.year || ''} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Kilómetros</label>
          <input type="number" name="kilometros" defaultValue={vehicle?.kilometros || ''} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Combustible</label>
          <select name="combustible" defaultValue={vehicle?.combustible || 'Gasolina'} style={inputStyle}>
            <option value="Gasolina">Gasolina</option>
            <option value="Diésel">Diésel</option>
            <option value="Híbrido">Híbrido</option>
            <option value="Eléctrico">Eléctrico</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Cambio</label>
          <select name="cambio" defaultValue={vehicle?.cambio || 'Manual'} style={inputStyle}>
            <option value="Manual">Manual</option>
            <option value="Automático">Automático</option>
          </select>
        </div>
      </div>

      {/* Potencia, Color y Etiqueta Ambiental */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Potencia (CV)</label>
          <input
            type="number"
            name="potencia"
            defaultValue={vehicle?.potencia || ''}
            placeholder="Ej: 150"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Color</label>
          <input
            type="text"
            name="color"
            defaultValue={vehicle?.color || ''}
            placeholder="Ej: Blanco"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Etiqueta Ambiental</label>
          <select name="etiquetaAmbiental" defaultValue={vehicle?.etiquetaAmbiental || ''} style={inputStyle}>
            <option value="">Sin especificar</option>
            <option value="0">0</option>
            <option value="ECO">ECO</option>
            <option value="C">C</option>
            <option value="B">B</option>
            <option value="Sin etiqueta">Sin etiqueta</option>
          </select>
        </div>
      </div>

      {/* Descripción */}
      <div>
        <label style={labelStyle}>Descripción</label>
        <textarea
          name="descripcion"
          defaultValue={vehicle?.descripcion || ''}
          placeholder="Ej: Paquete AMG completo interior y exterior. Sistema MBUX. Vehículo en muy buen estado."
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit', fontSize: 'inherit' }}
        />
      </div>

      {/* Subir imágenes */}
      <div>
        <label style={labelStyle}>Subir Nuevas Imágenes</label>
        <input type="file" name="images" multiple accept="image/jpeg, image/png, image/webp" style={{ width: '100%', padding: '0.75rem', border: '1px dashed #cbd5e1', borderRadius: '0.5rem', backgroundColor: '#f8fafc' }} />
        <p style={{ fontSize:'0.75rem', color:'#64748b', marginTop:'0.25rem' }}>Puedes seleccionar varias imágenes a la vez. JPG y PNG soportados.</p>
      </div>

      {/* Acciones */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '200px' }}>
          {loading ? 'Guardando...' : 'Guardar Vehículo'}
        </button>
        <button type="button" onClick={() => router.push('/admin/vehiculos')} className="btn btn-outline" style={{ background: 'white' }}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
