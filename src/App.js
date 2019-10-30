import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
const pizzaUrl = 'http://localhost:3000/'
class App extends Component {
  constructor() {
    super()
    this.state = {
      pizzas: [],
      pizzaToEdit: {},
    }
  }

  componentDidMount () {
    fetch(pizzaUrl + 'pizzas')
    .then(r => r.json())
    .then(pizzaData => this.setState({ pizzas: pizzaData }))
  }

  editPizza =(pizza)=> {
    console.log('I hit the button!', pizza)
    this.setState({ pizzaToEdit: pizza })
  }

  changeTopping =(topping)=> {
    this.setState({ pizzaToEdit: {...this.state.pizzaToEdit, topping: topping }})
  }

  changeSize =(size)=> {
    this.setState({ pizzaToEdit: {...this.state.pizzaToEdit, size: size }})
  }

  changeVegie =(vegie)=> {
    this.setState({ pizzaToEdit: {...this.state.pizzaToEdit, vegetarian: vegie }})
  }

  changePizza =(newPizza)=> {
    fetch(pizzaUrl + `pizzas/${newPizza.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newPizza)
    })
    .then(r => r.json())
    .then(data => {
      let changedPizzas = this.state.pizzas.map( pizza => {
        if (pizza.id === data.id)
          return data
        else
          return pizza
      })
      this.setState({ pizzas: changedPizzas })
    })
  }


  render() {
    const pizzas = this.state.pizzas
    console.log("The pizzas:", pizzas)
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
          pizza={this.state.pizzaToEdit}
          changeTopping={this.changeTopping}
          changeSize={this.changeSize}
          changeVegie={this.changeVegie}
          changePizza={this.changePizza}
          />
        <PizzaList pizzas={this.state.pizzas} edit={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
