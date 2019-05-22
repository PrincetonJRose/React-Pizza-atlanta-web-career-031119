import React, { Component } from "react"

export default class PizzaForm extends Component {
  constructor() {
    super()
    this.state = { 
      pizza: {},
      vegie: null
    }
  }

  componentWillReceiveProps(props) {
    this.setState({ 
      pizza: props.editPizza,
      vegie: props.editPizza.vegetarian})
  }

  changeVegie =()=> {
    this.setState({ 
      vegie: !this.state.vegie
    })
  }

  render() {
    return(
      <form onSubmit={(e)=>this.props.handleSubmit(e, this.state)}>
        <div className="form-row">
          <div className="col-5">
              <input type="text" className="form-control" placeholder="Pizza Topping" defaultValue={
                this.state.pizza.topping
              }/>
          </div>
          <div className="col">
            <select defaultValue={this.state.pizza.size} className="form-control">
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Vegetarian" checked={this.state.vegie} onChange={this.changeVegie}/>
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Not Vegetarian" checked={!this.state.vegie} onChange={this.changeVegie}/>
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-success" >Submit</button>
          </div>
        </div>
      </form>
    )
  }
}
