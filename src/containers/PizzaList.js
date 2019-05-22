import React, { Component } from 'react';
import Pizza from '../components/Pizza'
class PizzaList extends Component {

  render() {
    return (
      <table className="table table-striped" border="1">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            //render Pizza here
            this.props.pizzas.map(pizza => {
              return <Pizza pizza={pizza} handleClick={this.props.handleClick} />
            })
          }
        </tbody>
      </table>
    );
  }

}

export default PizzaList;
