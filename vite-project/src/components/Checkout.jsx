import React, { useState } from 'react';
import { useCart } from '../context/CartProvider';
import { createSale } from '../utils';
import { toast } from "react-toastify";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    repeatEmail: '',
  });

  const { items, clearCart } = useCart();
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (formData.email !== formData.repeatEmail) {
        throw new Error("Los correos electrónicos no coinciden");
      }

      const orderId = await createSale(items, formData, calculateTotal(items));
      toast.success("Orden de compra creada con ID: " + orderId);
      setPurchaseCompleted(true);
      clearCart();
    } catch (error) {
      toast.error('Error al crear la orden de compra: ' + error.message);
    }
  };

  const calculateTotal = items => {
    return items.reduce((total, item) => total + item.quantity * item.book.saleInfo.listPrice.amount, 0);
  };

  const groupedItems = items.reduce((acc, item) => {
    const title = item.book.volumeInfo.title;
    acc[title] = (acc[title] || 0) + item.quantity;
    return acc;
  }, {});

    if (items.length === 0 && !purchaseCompleted) {
      toast.error("No puedes realizar una compra vacía.");
      return (
        <div className="flex justify-center items-center my-5">
          <p className="italic text-center">No hay libros en el carrito.  No puedes usar esta página</p>
        </div>
      );
    }

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-xl w-full mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Checkout</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Ítems:</h3>
            {Object.entries(groupedItems).map(([title, quantity, saleInfo]) => (
              <div key={title} className="flex">
                <span>{quantity}x</span>
                <span>{title}</span>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Total de la orden:</h3>
            <span>${calculateTotal(items).toFixed(2)}</span>
          </div>

          <form onSubmit={handleSubmit} disabled={purchaseCompleted}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1" htmlFor="firstName">Nombre</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border rounded-md p-2" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1" htmlFor="lastName">Apellido</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border rounded-md p-2" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1" htmlFor="phoneNumber">Teléfono</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full border rounded-md p-2" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1" htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border rounded-md p-2" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1" htmlFor="repeatEmail">Repetir correo electrónico</label>
              <input type="email" id="repeatEmail" name="repeatEmail" value={formData.repeatEmail} onChange={handleInputChange} className="w-full border rounded-md p-2" required />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Realizar compra</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
