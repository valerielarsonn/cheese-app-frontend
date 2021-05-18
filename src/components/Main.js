import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show" 


function Main(props){
    const [cheese, setCheese] = useState(null);

    const URL = "https://stringcheese.herokuapp.com/cheese/";

    const getCheese = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setCheese(data);
    };

    const createCheese = async (chez) => {
        await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(chez),
        });
        getCheese();
    };

    const updateCheese = async (cheese, id) => {
        // Make put request to update cheese
        await fetch(URL + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cheese),
        })
        // Update list of cheeses
        getCheese()
    }

    const deleteCheese = async id => {
        // Make delete request 
        await fetch(URL + id, {
            method: "delete",
        })
        //Update list
        getCheese()
    }

    useEffect(() => getCheese(), []);

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index cheese={cheese} createCheese={createCheese}/>
                </Route>
                <Route
                    path="/cheese/:id"
                    render={(rp) => (
                        <Show
                            cheese={cheese}
                            updateCheese={updateCheese}
                            deleteCheese={deleteCheese}
                            {...rp}
                        />
                    )}
                />
            </Switch>
        </main>
    );
}; 
  
export default Main;