'use client';

import { Calendar, Clock, MapPin, Music, Ticket } from 'lucide-react';

function App() {
  const ticketUrl = 'https://cheers.com.br/evento/mushadelic-winter-festival-20865';

  const handleBuyTickets = () => {
    window.open(ticketUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div
        className="h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: `url("/musha.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-4">
          <h1 className="hidden md:block text-6xl md:text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 drop-shadow-lg">
            MUSHADELIC
          </h1>
          <p className="hidden md:block text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-lg">
            Winter Festival
          </p>
          <p className="hidden md:block text-xl md:text-2xl mb-8 text-gray-300 drop-shadow-lg">
            O Festival mais querido de Curitiba está de volta e melhor do que nunca
          </p>
          <button
            onClick={handleBuyTickets}
            className="animate-pulse bg-gradient-to-r from-indigo-600 to-teal-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-indigo-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 drop-shadow-lg"
          >
            <Ticket className="inline-block mr-2 h-6 w-6" />
            Garantir Meu Ingresso
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm">
          <Calendar className="mx-auto h-8 w-8 text-teal-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Data</h3>
          <p className="text-gray-400">07 de Junho, 2025</p>
        </div>
        <div className="text-center p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm">
          <Clock className="mx-auto h-8 w-8 text-teal-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Duração</h3>
          <p className="text-gray-400">24 horas de festa</p>
          <p className="text-sm text-gray-500">16:00 - 16:00</p>
        </div>
        <div className="text-center p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm">
          <MapPin className="mx-auto h-8 w-8 text-teal-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Local</h3>
          <p className="text-gray-400">Sítio Vale Encantado</p>
          <p className="text-sm text-gray-500">Campo Largo - PR</p>
        </div>
        <div className="text-center p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm">
          <Music className="mx-auto h-8 w-8 text-teal-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Line-up</h3>
          <p className="text-gray-400">Em Breve</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-300">
          Serão 24 horas de festa, em meio a natureza, com um line-up montado com todo amor e carinho para nosso
          público.
        </p>
      </div>

      {/* CTA Section */}
      <div className="text-center py-16 px-4 bg-gradient-to-b from-transparent to-indigo-900/20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Não perca o festival mais querido de Curitiba!</h2>
        <button
          onClick={handleBuyTickets}
          className="bg-white text-indigo-900 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
        >
          <Ticket className="inline-block mr-2 h-6 w-6" />
          Comprar Ingresso Agora
        </button>
      </div>
    </div>
  );
}

export default App;
