import { useState } from 'react';
import './App.css';
import products from './assets/products.json';

const sortMethods = {
  default: { method: (a,b) => null },
  name: { method: (a, b) => a.name.localeCompare(b.name) },
  price: { method: (a, b) => a.price - b.price },
}

function App() {
  const [list, setList] = useState(products);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [style, setStyle] = useState('hide');

  const handleChange = (option) => {
    setList(products.slice().sort(sortMethods[option].method));
  }

  const chanegStyle = () => {
    if (style === 'hide') setStyle('show');
    else setStyle('hide');
  }

  const handleClick = (product) => {
    cart.push(product);
    setCart(cart);
    setCount(cart.length);
    setTotal(cart.reduce((acc, curr) => acc + curr.price, 0));
  }

  const removeItem = (item) => {
    cart.splice(item, 1);
    setCart(cart);
    setCount(cart.length);
    setTotal(cart.reduce((acc, curr) => acc + curr.price, 0));
  }

  return (
    <>
      <header>
        <div id='shopping-cart'>
          <img src='https://cdn-icons-png.flaticon.com/512/1413/1413908.png' onClick={() => chanegStyle()} />
          <span>{ count }</span>
        </div>
      </header>

      <main>
        <div id='cart-container' className={style}>
          <h2>Shopping Cart</h2>
          {cart.map((item, index) => (
            <div className='cart-item'>
              <button className='del-button' value={index} onClick={(e) => removeItem(e.target.value)}>-</button>
              <span>{ item.name }</span>
              <span>{ item.price }</span>
            </div>
          ))}
          <p id='total-price'>Total: { total }</p>
        </div>

        <h2>Products</h2>
        <div id='sort-container'>
          <span>Sort by: </span>
          <select id='options' name='options' defaultValue='default' onChange={(e) => handleChange(e.target.value)}>
            <option value='default'>None</option>
            <option value='name'>Name</option>
            <option value='price'>Price</option>
          </select>
        </div>
        <div id='products-container'>
          {list.map((product) => (
            <div className='product'>
              <img src={product.image} className='product-image' />
              <div>
                <p>{ product.name }</p>
                <p>Price: <strong>{ product.price }</strong></p>
              </div>
              <button onClick={() => handleClick(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default App
