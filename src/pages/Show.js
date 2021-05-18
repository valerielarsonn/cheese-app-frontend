import { useState } from "react";

function Show(props){
    const id = props.match.params.id
    const cheese = props.cheese
    const chez = cheese.find( p => p._id === id)

    // State for form
    const [editForm, setEditForm] = useState(chez)

    // handleChange function for form
    const handleChange = event => {
        setEditForm({...setEditForm, [event.target.name]: event.target.value})
    }

    //handleSubmit for form
    const handleSubmit = event => {
        event.preventDefault()
        props.updateCheese(editForm, chez._id)
        //Redirect cheese back to index
        props.history.push("/")
    }

    const removeChez = () => {
        props.deleteCheese(chez._id)
        props.history.push("/")
    }

    return (
        <div className="chez">
            <h1>{chez.name}</h1>
            <h2>{chez.countryOfOrigin}</h2>
            <img src={chez.image} alt={chez.name}/>
            <button id="delete" onClick={removeChez}>
                DELETE
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={editForm.name}
                    name="name"
                    placeholder="name"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={editForm.countryOfOrigin}
                    name="countryOfOrigin"
                    placeholder="country of origin"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={editForm.image}
                    name="image"
                    placeholder="image URL"
                    onChange={handleChange}
                />
                <input type="submit" value="UPDATE CHEESE" />
            </form>
        </div>
    )
}; 
  
export default Show