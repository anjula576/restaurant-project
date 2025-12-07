
import '../assets/css/Menu.scss'
import {useEffect, useState} from "react";
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



function Order(){

    // store the menu items
    const [menuItems,setMenuItems]=useState<MenuItem[] >([]);

    //to store cart items
    const [cartItems,setCartItems]=useState<MenuItem[]|null>([])
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
        <h2>Order </h2>
        <div className="row">
            <div className="col-8 menu-first-row">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            width: "230px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            margin: "5px",
                            padding: "10px",
                            textAlign: "center",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            height: "250px"
                        }}
                        className="singleFood"
                    >
                        <img
                            src="https://rasamalaysia.com/wp-content/uploads/2019/06/chinese-fried-rice-thumb.jpg"
                            style={{width: "90%", height: "60%", borderRadius: "10px"}} alt=""
                        />

                        <div className="row mt-2">

                            <div className="col-6 d-flex align-content-center justify-content-start">

                                <h4 className="d-flex justify-content-center"
                                    style={{fontSize: "17px"}}>{item.name}</h4>
                            </div>

                            <div className="col-6 d-flex justify-content-end">
                                <h5 style={{color: "#2c3e50", fontSize: "17px"}}
                                    className="d-flex justify-content-end">Rs. {item.price}</h5>

                            </div>

                        </div>

                        <div className="row">
                            <div className="col-8 d-flex justify-content-end m-0 p-0">
                                <p style={{
                                    fontSize: "12px",
                                    padding: "0px",
                                    margin: "5px 0px",
                                    color: "#555"
                                }}>{item.description}</p>

                            </div>
                            <div className="col-6 d-flex align-content-center justify-content-end">
                                {/*<span className="d-flex justify-content-center align-content-center p-1" style={{*/}
                                {/*    width: "55px",*/}
                                {/*    backgroundColor: "red",*/}
                                {/*    borderRadius: "50px"*/}
                                {/*}}><PersonStanding/>10</span>*/}
                                <span className="bg-succss"></span>
                            </div>
                            <div className="row d-flex justify-content-center align-content-center">
                                <div className="col-9">
                                    <button
                                        className="btn btn-sm btn-primary d-flex justify-content-center align-content-center"
                                        style={{width: "60%", marginBottm: "20px"}}

                                        onClick={() => setCartItems(prev => [...(prev || []), item])

                                        }
                                    >Order
                                    </button>
                                </div>
                                {/*<div className="col-4">*/}
                                {/*    <input type="text" className="form-control"/>*/}
                                {/*</div>*/}

                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className="col-4 d-flex justify-content-center bg-white menu-scnd-row">

                <div className="cart-prooduct-list">
                    {/* get cart  items one by one and create cards*/}
                    {cartItems?.map((cartItem) => (
                        <div className="row single-cart-item" style={{
                            width: "250px",
                            height: "100px",
                            backgroundColor: "red",
                            marginBottom: "10px",
                            borderRadius: "20px"
                        }}>
                            <div className="col-6"
                                 style={{
                                     display: "flex",
                                     flexDirection: "row",
                                     justifyContent: "Center",
                                     alignItems: "center"
                                 }}
                            >
                                <img
                                    src="https://rasamalaysia.com/wp-content/uploads/2019/06/chinese-fried-rice-thumb.jpg"
                                    style={{width: "90%", height: "60%", borderRadius: "10px"}}

                                />
                            </div>
                            <div className="col-6 d-inline-block align-content-center justify-content-center ">
                                <div className="row ">
                                    <h5 className="d-flex justify-content-center">{cartItem.name}</h5>
                                </div>
                                <div className="row d-flex">
                                    <h5 className="d-flex justify-content-center">{cartItem.price}</h5>
                                </div>


                            </div>

                        </div>

                    ))}
                </div>



            </div>
        </div>


    </>
}

export default Order;