import { MenuOutlined } from '@ant-design/icons';
import CartWidget from './CartWidget';
import logo from '../img/logo.jpg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <header className="nav-bar z-50">
            <h1 id="title" className="text-4xl font-bold">
                <Link to="/">CodeBook Emporium</Link>
            </h1>
            <Link to="/" className="logo-container"> 
                <img src={logo} alt="Logo" className="logo-img" />
            </Link>
            <nav className="nav-menu flex items-center">
                <div className="desktop-menu hidden">
                    <Link to="/">Todos los libros</Link>
                    <Link to="/category/programming">Programación</Link>
                    <Link to="/category/database">Bases de datos</Link>
                </div>
                <MenuOutlined className="mobile-menu md:hidden text-gray-700 hover:text-gray-900" onClick={toggleMobileMenu} />
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-16  bg-black rounded-md border border-gray-200 shadow-md z-50">
                        <Link className="mobile-menu-link" to="/">Todos los libros</Link>
                        <Link className="mobile-menu-link" to="/category/programming">Programación</Link>
                        <Link className="mobile-menu-link" to="/category/database">Bases de datos</Link>
                    </div>
                )}

            </nav>
            <div className="z-50">
                <CartWidget />
            </div>
        </header>
    );
};

export default NavBar;
