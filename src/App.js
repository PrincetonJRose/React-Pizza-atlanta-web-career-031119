import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
const pizzaUrl = `http://localhost:3000/pizzas/`

class App extends Component {
  constructor(){
    super()
    this.state = {
      pizzas: [],
      editPizza: null,
    }
  }

  componentDidMount(){
    fetch(pizzaUrl)
    .then(res => res.json())
    .then(data => 
      this.setState(
        { pizzas: data }, 
        ()=> console.log(this.state.pizzas)
      )
    )
  }

  changeEditPizza =(pizza)=> {
    this.setState(
      {editPizza: pizza},
      ()=> console.log(this.state.editPizza)
    )
  }

    editTopping =(t)=> {
      this.setState({
        editPizza: {...this.state.editPizza, topping: t}
      })
    }

    editSize =(s)=> {
      this.setState({
        editPizza: {...this.state.editPizza, size: s }
      })
    }

    editVege =(v)=> {
      this.setState({
        editPizza: {...this.state.editPizza, vegetarian: v }
      })
    }

    handleSubmit =()=> {
      fetch(pizzaUrl + this.state.editPizza.id,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.state.editPizza)
      })
      .then(res => res.json())
      .then(data => {
        let pizzas = this.state.pizzas.map( p => {
          if (p.id === data.id)
            return data
          else
            return p
        })
        this.setState({ pizzas: pizzas })
      })
      .catch( errors => console.log(errors))
    }

  render() {
    return (
      <Fragment>
        <Header />
        <PizzaForm 
          pizza={this.state.editPizza}
          editTopping={this.editTopping}
          editSize={this.editSize}
          editVege={this.editVege}
          handleSubmit={this.handleSubmit}
        />
        <PizzaList pizzas={this.state.pizzas} editPizza={this.changeEditPizza} />
      </Fragment>
    );
  }
}

export default App;
