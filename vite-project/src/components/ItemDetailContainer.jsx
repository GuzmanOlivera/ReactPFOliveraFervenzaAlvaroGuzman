import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookDetail } from '../utils';
import { useCart } from '../context/CartProvider';
import { toast } from "react-toastify";

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); 
    const { addItemToCart, items } = useCart(); 

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const bookDetail = await getBookDetail(id);
                setBook(bookDetail);
                setLoading(false);
            } catch (error) {
                toast.error("Error al recuperar detalles del libro: " + error)
                setLoading(false);
            }
        };

        if (id) {
            fetchBookDetail();
        } 

    }, [id]);

    const handleAddToCart = () => {
        addItemToCart({ book, quantity }); 
        toast.success("¡Libro añadido al carrito!");        
    };

    const handleQuantityChange = (amount) => {
        setQuantity(prevQuantity => Math.max(prevQuantity + amount, 1)); 
    };

    if (loading) {
        return <div className="py-4 text-center">Cargando...</div>;
    }

    return (
        <div className="py-4">
            {book ? (
                <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <img className="block mx-auto" src={book.volumeInfo.imageLinks?.thumbnail} alt="Portada del libro" />
                    <div className="p-4">
                        <h1 className="text-2xl font-bold mb-2">{book.volumeInfo.title}</h1>
                        <p className="text-gray-700 mb-2">Autor(es): {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Desconocido'}</p>
                        <p className="text-gray-700 mb-2">Descripción: {book.volumeInfo.description ? book.volumeInfo.description : 'No disponible'}</p>
                        <div className="text-center">
                             <p className="text-gray-700 mb-2">
                                Stock: {book.stock ? `${book.stock} unidades` : 'No disponible'}
                            </p>
                            <p className="text-gray-700 mb-2">
                                Precio: <span className="font-bold">{book.saleInfo && book.saleInfo.listPrice ? `${book.saleInfo.listPrice.amount} ${book.saleInfo.listPrice.currencyCode}` : 'No disponible'}</span>
                            </p>
                            <div className="flex items-center justify-center mb-4">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l" onClick={() => handleQuantityChange(-1)}>-</button>
                                <span className="px-4">{quantity}</span>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r" onClick={() => handleQuantityChange(1)}>+</button>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddToCart}>Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-red-500">Error al cargar los datos del libro. Inténtalo de nuevo más tarde.</div>
            )}
            {items.length > 0 && (
                <div className="text-center mt-4">
                    <Link to="/cart" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Terminar compra</Link>
                </div>
            )}
        </div>
    );
};

export default ItemDetailContainer;
