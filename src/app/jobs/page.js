'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

function SearchContent() {
  const searchParams = useSearchParams();
  const queryInicial = searchParams.get('q') || "";
  
  const [empleos, setEmpleos] = useState([]);
  const [busqueda, setBusqueda] = useState(queryInicial);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarEmpleos() {
      let { data, error } = await supabase.from('empleos').select('*');
      if (!error) setEmpleos(data);
      setCargando(false);
    }
    cargarEmpleos();
  }, []);

  const empleosFiltrados = empleos.filter(empleo => 
    !busqueda || 
    empleo.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    empleo.organizacion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Navbar Interno */}
      <nav className="bg-blue-900 border-b-4 border-yellow-500 px-6 py-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-white tracking-wider">
            EMPLEOS <span className="text-yellow-400">ACOLFÍSICA</span>
          </a>
          <a href="/" className="text-sm font-bold text-blue-100 hover:text-white flex items-center gap-1">
             ← VOLVER AL INICIO
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* SIDEBAR (Filtros) */}
        <aside className="md:col-span-1 hidden md:block">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-6">
            <h2 className="font-bold text-lg mb-4 text-blue-900 border-b pb-2">Refinar búsqueda</h2>
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Palabra Clave</label>
              <input 
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm focus:border-blue-500 outline-none"
                placeholder="Ej: Docente..."
              />
              <button className="w-full mt-3 bg-blue-800 hover:bg-blue-900 text-white text-sm font-bold py-2 rounded transition-colors">
                ACTUALIZAR
              </button>
            </div>
          </div>

          {/* Acordeones Simples */}
          <div className="space-y-1">
             {['Disciplina', 'Ubicación', 'Tipo de Rol', 'Nivel Educativo'].map((filtro) => (
              <div key={filtro} className="bg-white border border-gray-200 rounded px-4 py-3 cursor-pointer hover:bg-gray-50 flex justify-between items-center group">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">{filtro}</span>
                <span className="text-gray-400 text-xs">▼</span>
              </div>
             ))}
          </div>
        </aside>

        {/* RESULTADOS */}
        <section className="md:col-span-3">
          <div className="mb-6 flex justify-between items-end border-b border-gray-300 pb-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {empleosFiltrados.length} <span className="text-gray-500 text-lg font-normal">resultados encontrados</span>
            </h1>
            <span className="text-sm text-gray-500">Ordenar por: <span className="font-bold text-gray-800">Relevancia</span></span>
          </div>

          <div className="space-y-4">
            {cargando ? (
              <div className="text-center py-10 text-gray-500">Cargando ofertas...</div>
            ) : empleosFiltrados.length > 0 ? (
              empleosFiltrados.map((empleo) => (
                <div key={empleo.id} className="bg-white p-5 border-l-4 border-l-blue-600 border-y border-r border-gray-200 rounded-r-lg shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start gap-4 group">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-800 group-hover:text-blue-600 cursor-pointer mb-1">
                      <a href={empleo.enlace_aplicacion} target="_blank">{empleo.titulo}</a>
                    </h3>
                    <div className="font-bold text-gray-900 flex items-center gap-2">
                        {empleo.organizacion} 
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-normal border">{empleo.tipo_organizacion}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 space-y-1">
                      <p className="flex items-center gap-1">📍 {empleo.ciudad}, {empleo.pais}</p>
                      <p className="flex items-center gap-1">🎓 {empleo.nivel_educativo} • 💰 {empleo.rango_salarial || "A convenir"}</p>
                    </div>
                  </div>
                  
                  <div className="text-right flex flex-col items-end gap-3">
                     <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded border border-green-100">
                        {empleo.modalidad}
                     </span>
                     <Link href={`/jobs/${empleo.id}`} target="_blank" className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 text-sm font-bold px-5 py-2 rounded shadow-sm transition-colors whitespace-nowrap">
                       Ver detalles
                     </Link>
                     <span className="text-xs text-gray-400">Publicado recientemente</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-8 text-center rounded border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No se encontraron empleos con esa palabra.</p>
                <button onClick={() => setBusqueda("")} className="text-blue-600 font-bold hover:underline mt-2">
                    Ver todos los empleos
                </button>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={<div>Cargando buscador...</div>}>
      <SearchContent />
    </Suspense>
  );
}
