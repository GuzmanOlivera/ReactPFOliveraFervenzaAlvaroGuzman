import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartProvider';
import { Link } from 'react-router-dom';

const CartWidget = () => {
    const { items } = useCart();
    
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <Link to="/cart" className="flex items-center justify-end">
            <ShoppingCartOutlined style={{ fontSize: '24px' }} />
            <span className="mr-1">{totalItems}</span>
        </Link>
    );
};

export default CartWidget;
