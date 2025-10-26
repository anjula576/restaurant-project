import {Alert} from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import DataTable from "../components/DataTable.tsx";
import React, {useState} from "react";
import '../assets/css/Order.scss'


function Order(){

    const [orders, setOrders] = useState([]);

    // this is changed when edit button pressed.
    const [isEditing, setIsEditing] = useState(false);

    const [menuItems, setMenuItems] = useState([]);

    //  this function contain the logics about add to cart
    const addToCart = (item) => {
        console.log("Add to cart:", item);
        // TODO: Add to cart state logic
    };

    // should pass the alert color to alert (can't pass the string type,becuase alert type expect a colour among 4 colours
    // like(success,info,warning,error).any string not valid in here.)
    // when import alert  as import ,sometime it doesn't work
    //  this tells initially type can be those 4 types and message contain string or sometimes can be set null(because use ir fate to mention them)
    // but now set null as  the initial value.
    const [alert, setAlert] = useState<{
        type: "success" | "error" | "warning" | "info";
        message: string
    } | null>(null);


    const [order, setOrder] = useState({
        id:null,
        totalamount: "",
        orderdate: "",
        paymentstatus: "",
        status: "",
        ordertype:"",
    })

    // this is used to get menu items

    const getMenuItems = () => {
        fetch("http://localhost:8080/api/menuitems")
            .then((res) => res.json())
            .then((data) => {

                setMenuItems(data);

            })
    }




    return(
        <>
            <div className="container-fluid">
                <h2>Order Form</h2>
                <div className="row">
                    {/*    first column*/}
                    <div className="col-8 bg-success">
                        <h2>asad</h2>
                        <div className="menu-column">
                            <div className="food-card">as</div>

                            {/*{menuItems.map(item => (*/}
                            {/*    <div className="food-card" key={item.id}>*/}
                            {/*        <img src={item.imageUrl} alt={item.name} className="food-image"/>*/}
                            {/*        <div className="food-details">*/}
                            {/*            <h4>{item.name}</h4>*/}
                            {/*            <p>Portion: {item.portion}</p>*/}
                            {/*            <p>Rs. {item.price}</p>*/}
                            {/*            <button onClick={() => addToCart(item)}>Add to Cart</button>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*))}*/}
                        </div>
                    </div>
                    {/*     second column*/}
                    <div className="col-4 bg-primary">
                        <h2>sdsd</h2>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Order;