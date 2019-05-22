import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
const localUrl = `http://localhost:3000/`

class App extends Component {
  constructor() {
    super()
    this.state = {
      pizzas: [],
      editPizza: {}
    }
  }

  componentDidMount () {
    fetch(localUrl + `pizzas`)
    .then(res => res.json())
    .then(pizzasData => {
      this.setState({
        pizzas: pizzasData
      })
    })
  }

  handleSubmit =(e, data)=> {
    e.preventDefault()
    console.log(e.target[0].value)
    console.log(e.target[1].value)
    console.log(data.vegie, data.pizza)
    let editedPizza = {}

    let changePizza = this.state.pizzas.map( pizza => {
      if (pizza.id === data.pizza.id) {
        pizza.topping = e.target[0].value
        pizza.size = e.target[1].value
        pizza.vegetarian = data.vegie
        editedPizza = pizza
        return pizza
      } else {
        return pizza
      }
    })

    console.log(editedPizza)

    e.target.reset()

    fetch(localUrl + `pizzas/${data.pizza.id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        topping: editedPizza.topping,
        size: editedPizza.size,
        vegetarian: editedPizza.vegetarian
      })
    })
    .then(res => res.json())
    .then(Yay => {
      this.setState({
        pizzas: changePizza
      })
    })
    .catch(err => console.log("Errors:", err))
  }

  handleClick =(pizza)=> {
    this.setState({
      editPizza: pizza
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm editPizza={this.state.editPizza} handleSubmit={this.handleSubmit}/>
        <PizzaList pizzas={this.state.pizzas} handleClick={this.handleClick}/>
      </Fragment>
    );
  }
}

export default App;
