import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartProvider';

const Cart = () => {
    const { items, clearCart } = useCart();

    const groupedItems = items.reduce((acc, item) => {
        const { id } = item.book;
        if (acc[id]) {
            acc[id].quantity += item.quantity;
        } else {
            acc[id] = { ...item };
        }
        return acc;
    }, {});

    const groupedCartItems = Object.values(groupedItems);

    const total = groupedCartItems.reduce((acc, item) => {
        return acc + item.quantity * item.book.saleInfo.listPrice.amount;
    }, 0);

    return (
        <div className="container mx-auto p-4 bg-gray-100 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 text-center">Carrito de compras</h2>
            {groupedCartItems.length === 0 ? (
                <p className="italic text-center">No hay libros en el carrito.</p>
            ) : (
                <div>
                    <ul className="divide-y divide-gray-200">
                        {groupedCartItems.map(item => (
                            <li key={item.id} className="py-4">
                                <div className="flex justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.book.volumeInfo.title}</h3>
                                        <p>Cantidad: {item.quantity}</p>
                                        <p>Precio unitario: ${item.book.saleInfo.listPrice.amount}</p>
                                        <p>Subtotal: ${(item.quantity * item.book.saleInfo.listPrice.amount).toFixed(2)}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 text-center">
                        <p className="font-semibold">Total: ${total.toFixed(2)}</p>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-4">Limpiar carrito</button>
                        <Link to="/checkout">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Ir al checkout</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
