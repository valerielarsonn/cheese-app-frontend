import { useState } from "react";
import {Link} from "react-router-dom";

function Index(props){
    // State to hold formData
    const [newForm, setNewForm] = useState({
        name:"",
        countryOfOrigin: "",
        image: "",
    });

    //handleChange function for form
    const handleChange = (event) => {
        setNewForm({...newForm, [event.target.name]: event.target.value});
    };

    //handleSubmit function for form
    const handleSubmit = (event) => {
        event.preventDefault();
        props.createCheese(newForm);
        setNewForm({
            name:"",
            countryOfOrigin: "",
            image: "",
        });
    };

    //Loaded function    
    const loaded = () => {
        return props.cheese.map((cheese) => (
            <div key={cheese._id} className="cheese">
                <Link to={`/cheese/${cheese._id}`}><h1>{cheese.name}</h1></Link>
                <img src={cheese.image} alt={cheese.name} />
                <h3>{cheese.countryOfOrigin}</h3>
            </div>
        ));
    };

    const loading = () => {
        return <h1>Loading...</h1>;
    };
    return (
       <section>
           <form onSubmit={handleSubmit}>
               <input
                    type="text"
                    value={newForm.name}
                    name="name"
                    placeholder="NAME"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.countryOfOrigin}
                    name="countryOfOrigin"
                    placeholder="ORIGIN"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.image}
                    name="image"
                    placeholder="IMAGE URL"
                    onChange={handleChange}
                />
                <input type="submit" value="CREATE CHEESE"/>
            </form>
            {props.cheese ? loaded() : loading()}
       </section> 
    ); 
}; 
  
export default Index