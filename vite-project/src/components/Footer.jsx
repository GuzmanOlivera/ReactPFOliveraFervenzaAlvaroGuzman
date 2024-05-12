import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 my-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex flex-col md:flex-row">
          <div className="mr-12">
            <h2 className="text-2xl font-bold mb-4">Enlaces rápidos</h2>
            <ul className="list-none space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-gray-200 transition duration-300">Inicio</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-gray-200 transition duration-300">Sobre Nosotros</Link>
              </li>
              <li>
                <Link to="/location" className="text-gray-400 hover:text-gray-200 transition duration-300">Ubicación</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Contacto</h2>
            <ul className="list-none space-y-2">
              <li>
                <span className="text-gray-400">Dirección:</span> Av. de les Corts Valencianes, 52, Benicalap, 46015 València, España
              </li>
              <li>
                <span className="text-gray-400">Teléfono:</span> +34 612 34 56 78
              </li>
              <li>
                <span className="text-gray-400">Correo electrónico:</span> info@codebookemporium.com
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 md:mt-0 text-center md:text-right">
          <p className="text-gray-400">© 2024 CodeBook Emporium. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
