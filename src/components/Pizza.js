import React from "react"

const Pizza = (props) => {
  const p = props.pizza
  return(
    <tr>
      <td>{p.topping}</td>
      <td>{p.size}</td>
      <td>{p.vegetarian? "Yes":"No"}</td>
      <td><button type="button" className="btn btn-primary" onClick={()=> props.editPizza(p)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
