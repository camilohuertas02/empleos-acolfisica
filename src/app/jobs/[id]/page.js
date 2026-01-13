'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // Asegurate que la ruta sea correcta
import { useParams } from 'next/navigation';

export default function JobDetailsPage() {
  const { id } = useParams(); // Esto captura el numero de la URL
  const [empleo, setEmpleo] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarEmpleo() {
      // Consulta a Supabase buscando por ID
      const { data, error } = await supabase
        .from('empleos')
        .select('*')
        .eq('id', id)
        .single(); // .single() porque solo queremos UNO

      if (data) setEmpleo(data);
      setCargando(false);
    }
    if(id) cargarEmpleo();
  }, [id]);

  if (cargando) return <div className="text-center p-10">Cargando detalles...</div>;
  if (!empleo) return <div className="text-center p-10">Empleo no encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        
        {/* Encabezado con color Institucional */}
        <div className="bg-blue-900 p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">{empleo.titulo}</h1>
          <div className="flex flex-wrap gap-4 text-blue-100 text-sm font-medium">
             <span>🏢 {empleo.organizacion}</span>
             <span>📍 {empleo.ciudad}, {empleo.pais}</span>
             <span>💰 {empleo.rango_salarial}</span>
          </div>
        </div>

        {/* Cuerpo de la oferta */}
        <div className="p-8 text-gray-800 space-y-6">
          
          <section>
            <h2 className="text-xl font-bold text-blue-900 mb-3 border-b pb-1">Descripción del Rol</h2>
            {/* Nota: Aquí en el futuro usaremos un parser de Markdown si el texto es largo */}
            <p className="whitespace-pre-line leading-relaxed">
              {empleo.descripcion || "No hay descripción detallada disponible para esta oferta."}
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded border">
              <h3 className="font-bold text-sm text-gray-500 uppercase">Modalidad</h3>
              <p>{empleo.modalidad}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded border">
              <h3 className="font-bold text-sm text-gray-500 uppercase">Tipo de Organización</h3>
              <p>{empleo.tipo_organizacion}</p>
            </div>
          </section>

          {/* Botón de Acción */}
          <div className="pt-6 border-t mt-8 flex justify-end">
            <a 
              href={empleo.enlace_aplicacion} 
              target="_blank"
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded shadow-lg transition-transform transform hover:scale-105"
            >
              APLICAR AHORA 🚀
            </a>
          </div>

        </div>
      </div>
      
      <div className="text-center mt-8">
        <a href="/jobs" className="text-blue-600 hover:underline">← Volver a la lista</a>
      </div>
    </div>
  );
}
