import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';
import { MdAddShoppingCart } from 'react-icons/md'

function Home ({ addToCartRequest, amount }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function handleProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }))
  
      setProducts(data);
    })();
    
  }, []);

  function handleAddProduct (id) {
    addToCartRequest(id)
  }
  

    return (
      <ProductList>
        {products.map(product => (
          <li key={product.id}>
          <img
            src={product.image}  
            alt="Tênis"
           />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
  
          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />
               {amount[product.id]  || 0}
            </div>
  
  
            <span>ADICIONAR NO CARRINHO</span>
          </button>
        </li>
        ))}
      </ProductList>
    )
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
}, {})
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);