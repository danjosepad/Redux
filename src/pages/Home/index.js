import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md'
import { formatPrice } from '../../util/format';
import { ProductList } from './styles';

import api from '../../services/api';

class Home extends Component {
  constructor(){
    super()
    this.state = {
      products: [],
    }
  }

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }))

    this.setState({ products: data })
  }

  handleAddProduct = product => {
    const { dispatch } = this.props;

    dispatch({
      type: 'ADD_TO_CART',
      product
    })
  }
  render(){
    const { products } = this.state;

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
  
          <button type="button" onClick={() => this.handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> 3
            </div>
  
  
            <span>ADICIONAR NO CARRINHO</span>
          </button>
        </li>
        ))}
        
      </ProductList>
    )
  }
}

export default connect()(Home);