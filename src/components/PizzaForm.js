import React from "react"

const PizzaForm = (props) => {
  const p = props.pizza
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control"   placeholder="Pizza Topping" 
              value={ p? p.topping : null }
              onChange={(e)=> props.editTopping(e.target.value)}
            />
        </div>
        <div className="col">
          <select 
            value={ p? p.size : null } className="form-control"
            onChange={(e)=> props.editSize(e.target.value)}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Vegetarian" checked={p? p.vegetarian : null} onChange={(e)=> props.editVege(true)}
            />
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" value="Not Vegetarian" checked={p? !p.vegetarian : null} onChange={(e)=> props.editVege(false)}
            />
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.handleSubmit}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
