import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';
import { MdAddShoppingCart } from 'react-icons/md'

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

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id)
  }
  
  render(){
    const { products } = this.state;
    const { amount } = this.props;

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
  
          <button type="button" onClick={() => this.handleAddProduct(product.id)}>
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