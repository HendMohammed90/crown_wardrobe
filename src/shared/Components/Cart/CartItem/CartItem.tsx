import './cart-item.styles.scss';


type CartItemProps = {
    imageUrl: string,
    price: number,
    name: string,
    quantity: number
}

const CartItem = ({ imageUrl, price, name, quantity }: CartItemProps) => {
    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>
                    {quantity} x ${price}
                </span>
            </div>
        </div>
    )
}

export default CartItem