import React from 'react';

// Componente completo de ejemplos con su propio layout
export const FontExamples = () => {
  return (
    <div className="p-8 bg-pixela-dark text-pixela-light">
      <h1 className="text-pixela-accent mb-6">Ejemplos de Fuentes</h1>
      
      {/* Ejemplos con Pixela Outfit */}
      <div className="mb-8">
        <h2 className="text-xl mb-4">Fuente Outfit</h2>
        <p className="font-pixela-outfit-xs mb-2">font-pixela-outfit-xs (12px)</p>
        <p className="font-pixela-outfit-sm mb-2">font-pixela-outfit-sm (14px)</p>
        <p className="font-pixela-outfit-base mb-2">font-pixela-outfit-base (16px)</p>
        <p className="font-pixela-outfit-lg mb-2">font-pixela-outfit-lg (18px)</p>
        <p className="font-pixela-outfit-xl mb-2">font-pixela-outfit-xl (20px)</p>
        <p className="font-pixela-outfit-2xl mb-2">font-pixela-outfit-2xl (24px)</p>
      </div>
      
      {/* Ejemplos con Pixela Roboto */}
      <div className="mb-8">
        <h2 className="text-xl mb-4">Fuente Roboto</h2>
        <p className="font-pixela-roboto-xs mb-2">font-pixela-roboto-xs (12px)</p>
        <p className="font-pixela-roboto-sm mb-2">font-pixela-roboto-sm (14px)</p>
        <p className="font-pixela-roboto-base mb-2">font-pixela-roboto-base (16px)</p>
        <p className="font-pixela-roboto-lg mb-2">font-pixela-roboto-lg (18px)</p>
        <p className="font-pixela-roboto-xl mb-2">font-pixela-roboto-xl (20px)</p>
        <p className="font-pixela-roboto-2xl mb-2">font-pixela-roboto-2xl (24px)</p>
      </div>
      
      {/* Ejemplos de Colores */}
      <div className="mb-8">
        <h2 className="text-xl mb-4">Colores del Tema</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="p-4 bg-pixela-dark border border-pixela-accent rounded transition-all duration-300 hover:shadow-lg hover:shadow-pixela-accent/30 hover:scale-105 cursor-pointer">
            <p className="font-pixela-sans-base">bg-pixela-dark</p>
          </div>
          <div className="p-4 bg-pixela-light text-pixela-dark border border-pixela-accent rounded transition-all duration-300 hover:shadow-lg hover:shadow-pixela-accent/30 hover:scale-105 cursor-pointer">
            <p className="font-pixela-sans-base">bg-pixela-light</p>
          </div>
          <div className="p-4 bg-pixela-accent text-pixela-dark border rounded transition-all duration-300 hover:shadow-lg hover:shadow-pixela-accent/30 hover:scale-105 cursor-pointer">
            <p className="font-pixela-sans-base">bg-pixela-accent</p>
          </div>
        </div>
      </div>
      
      {/* Ejemplos de Hover */}
      <div className="mb-8">
        <h2 className="text-xl mb-4">Efectos Hover</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="p-4 bg-pixela-dark border border-pixela-accent rounded hover:bg-pixela-accent hover:text-pixela-dark transition-colors duration-300 cursor-pointer">
            <p className="font-pixela-sans-base">hover:bg-pixela-accent</p>
          </div>
          <div className="p-4 bg-pixela-dark border border-pixela-accent rounded hover:bg-pixela-accent hover:text-pixela-light transition-colors duration-300 cursor-pointer">
            <p className="font-pixela-sans-base">hover:text-pixela-light</p>
          </div>
        </div>
      </div>
      
      {/* Ejemplo de uso real en componentes */}
      <div className="border border-pixela-accent p-6 rounded-lg">
        <h3 className="font-pixela-outfit-xl mb-4">Ejemplo de Componente</h3>
        <p className="font-pixela-roboto-base mb-4">Este es un texto normal en Roboto (16px).</p>
        <div className="flex flex-wrap gap-3">
          <button className="bg-pixela-accent text-pixela-dark font-pixela-outfit-sm px-4 py-2 rounded hover:bg-pixela-dark hover:text-pixela-accent transition-colors duration-300">
            Botón con Outfit (14px)
          </button>
          <button className="bg-pixela-primary text-pixela-light font-pixela-outfit-sm px-4 py-2 rounded hover:bg-pixela-light hover:text-pixela-dark hover:border-pixela-primary hover:border transition-all duration-300">
            Botón Primario
          </button>
          <button className="bg-pixela-secondary text-pixela-light font-pixela-outfit-sm px-4 py-2 rounded hover:brightness-110 hover:scale-105 transition-all duration-300">
            Botón Secundario
          </button>
          <button className="bg-pixela-dark border border-pixela-accent text-pixela-accent font-pixela-outfit-sm px-4 py-2 rounded hover:bg-pixela-accent hover:text-pixela-dark transition-colors duration-300">
            Botón Outline
          </button>
        </div>
      </div>
    </div>
  );
};

export default FontExamples; 