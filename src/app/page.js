'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [empleosDestacados, setEmpleosDestacados] = useState([]);

  // Cargar solo 3 empleos para la sección "Destacados"
  useEffect(() => {
    async function cargarDestacados() {
      const { data } = await supabase.from('empleos').select('*').limit(3);
      if(data) setEmpleosDestacados(data);
    }
    cargarDestacados();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/jobs?q=${keyword}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* 1. HERO SECTION (Azul Institucional con toques de bandera) */}
      <header className="bg-blue-900 border-b-4 border-yellow-500 pb-20 pt-8 relative overflow-hidden">
        
        {/* Barra superior */}
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center mb-16 relative z-10">
          <div className="text-2xl font-bold tracking-wider text-white">
            EMPLEOS <span className="text-yellow-400">ACOLFÍSICA</span>
          </div>
          <div className="text-sm font-semibold space-x-6 text-white">
             <a href="#" className="hover:text-yellow-400 transition-colors">EMPLEADORES</a>
             <a href="#" className="hover:text-yellow-400 transition-colors">INICIAR SESIÓN</a>
          </div>
        </div>

        {/* Área Principal de Búsqueda */}
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white shadow-sm">
            Conectando la Física en Colombia y el Mundo
          </h1>
          <p className="text-blue-100 mb-10 text-lg">
            La plataforma oficial para físicos, ingenieros y científicos en la academia y la industria.
          </p>
          
          <form onSubmit={handleSearch} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl flex flex-col md:flex-row gap-3 max-w-4xl mx-auto border border-blue-700">
            <input 
              type="text" 
              placeholder="Palabra clave (ej. Profesor, Datos, Física...)" 
              className="flex-1 p-4 rounded-lg text-gray-900 outline-none focus:ring-4 focus:ring-yellow-400/50 placeholder-gray-500"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Ubicación (ej. Bogotá, Remoto)" 
              className="flex-1 p-4 rounded-lg text-gray-900 outline-none focus:ring-4 focus:ring-yellow-400/50 placeholder-gray-500"
            />
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-extrabold px-10 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1">
              BUSCAR
            </button>
          </form>
        </div>

        {/* Decoración de fondo (Sutil) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full blur-3xl opacity-50 -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900 rounded-full blur-3xl opacity-30 -ml-16 -mb-16"></div>
      </header>

      {/* 2. CUERPO (Dos columnas) */}
      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 -mt-10 relative z-20">
        
        {/* Izquierda: Categorías (Fondo Blanco limpio) */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
           <div className="border-b-2 border-red-600 pb-2 mb-6 inline-block">
             <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Explorar por Categoría</h2>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
             <ul className="space-y-3">
               <li><a href="/jobs" className="flex items-center hover:text-blue-700 font-medium group"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 group-hover:bg-blue-600"></span>Física Teórica y Experimental</a></li>
               <li><a href="/jobs" className="flex items-center hover:text-blue-700 font-medium group"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 group-hover:bg-blue-600"></span>Ingeniería y Materiales</a></li>
               <li><a href="/jobs" className="flex items-center hover:text-blue-700 font-medium group"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 group-hover:bg-blue-600"></span>Ciencia de Datos e IA</a></li>
             </ul>
             <ul className="space-y-3">
               <li><a href="/jobs" className="flex items-center hover:text-blue-700 font-medium group"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 group-hover:bg-blue-600"></span>Geociencias y Astronomía</a></li>
               <li><a href="/jobs" className="flex items-center hover:text-blue-700 font-medium group"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 group-hover:bg-blue-600"></span>Docencia y Educación</a></li>
               <li><a href="/jobs" className="flex items-center hover:text-blue-700 font-medium group"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 group-hover:bg-blue-600"></span>Becas y Posgrados</a></li>
             </ul>
           </div>
        </div>

        {/* Derecha: Destacados (Caja Roja/Azul para resaltar) */}
        <div className="md:col-span-1 bg-gradient-to-br from-red-700 to-red-900 text-white p-6 rounded-xl shadow-xl border border-red-800">
          <div className="flex justify-between items-center mb-6 border-b border-red-500 pb-3">
             <h3 className="font-bold text-lg flex items-center">
               <span className="mr-2">🔥</span> EMPLEOS DESTACADOS
             </h3>
             <a href="/jobs" className="text-xs font-semibold bg-red-800 px-2 py-1 rounded hover:bg-red-600 transition-colors">Ver todos</a>
          </div>
          
          <div className="space-y-5">
            {empleosDestacados.map(job => (
              <div key={job.id} className="group cursor-pointer bg-white/5 p-3 rounded hover:bg-white/10 transition-colors">
                <a href={job.enlace_aplicacion} target="_blank" className="font-bold text-white group-hover:text-yellow-300 transition-colors block mb-1">
                  {job.titulo}
                </a>
                <p className="text-xs text-red-100 font-medium bg-red-950/30 inline-block px-2 py-1 rounded mb-1 border border-red-800/50">
                  {job.organizacion}
                </p>
                <div className="flex justify-between text-xs text-red-200 mt-1">
                   <span>{job.ciudad}</span>
                   <span className="font-mono text-yellow-400">{job.rango_salarial}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>&copy; 2026 Capítulo Estudiantil Acolfísica - Universidad Distrital</p>
      </footer>
    </div>
  );
}
