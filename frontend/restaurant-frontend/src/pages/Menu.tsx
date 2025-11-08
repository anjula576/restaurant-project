
import '../assets/css/Menu.scss'
import {useEffect, useState} from "react";
import foodimage from "../assets/rice mini.jpg"
import {PersonStanding} from "lucide-react";


//  this interface is used to mention the type of "menuItems" array
//without mentioning this can't assign values to that videos
// interfaces in react used to mention what type of data handle by an array
interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    // imageUrl: string;
}

function PershonStanding() {
    return null;
}

function Menu(){

    // store the menu items
const [menuItems,setMenuItems]=useState<MenuItem[] >([]);
    useEffect(() => {

        fetch("http://localhost:8080/api/menuitems")
            .then((res)=>res.json())
            .then((data) => {

                setMenuItems(data);

            })
            .catch(
                (error)=>{
                    console.log( "Can't load the menu items",error)
                }
            )
    }, []);

    return <>
    <h2>Menu item</h2>
        <div className="row">
            <div className="col-8 menu-first-row">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            width: "220px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            margin:"10px",
                            padding: "15px",
                            textAlign: "center",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            height:"250px"
                        }}
                        className="singleFood"
                    >
                        <img
                            src="https://rasamalaysia.com/wp-content/uploads/2019/06/chinese-fried-rice-thumb.jpg"
                            style={{ width: "80%", borderRadius: "10px" }}
                        />
                        <h4 className="d-flex justify-content-center" style={{fontSize:"15px"}} >{item.name}</h4 >
                        <p style={{ fontSize: "12px",padding:"0px",margin:"5px 0px", color: "#555" }}>{item.description}</p>
                        <div className="row">
                            <div className="col-6 d-flex justify-content-end m-0 p-0">
                                <h5 style={{color: "#2c3e50"}} className="d-flex justify-content-end">Rs. {item.price}</h5>

                            </div>
                            <div className="col-6 d-flex align-content-center justify-content-start">
                                <span className="d-flex justify-content-center align-content-center p-1" style={{width:"55px",backgroundColor:"red",borderRadius:"10px"}}><PersonStanding />10</span>
                                <span className="bg-succss"></span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className="col-4 bg-dark menu-scnd-row">

            </div>
        </div>


    </>
}

export default Menu;