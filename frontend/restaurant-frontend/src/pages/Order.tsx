
import '../assets/css/Menu.scss'
import {useEffect, useState} from "react";
import {PersonStanding} from "lucide-react";
import {CircleX} from "lucide-react";
import item from "./Item.tsx";


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

interface CartItem {
    id: number;
    name: string;
    qty:number;
    price: number;
    // imageUrl: string;
}



function Order(){

    // store the menu items
    const [menuItems,setMenuItems]=useState<MenuItem[] >([]);

    //to store cart items
    const [cartItems,setCartItems]=useState<CartItem[]>([])
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

    //  function to delete the the item
    const handleDlt =(dltItemId:number)=>{
        setCartItems(prevItems =>prevItems?.filter(prevItem =>prevItem.id !==dltItemId));
    };

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

                            <div className="col-12 ms-2 d-flex align-content-center justify-content-start">

                                <h4 className="d-flex justify-content-center"
                                    style={{fontSize: "17px"}}>{item.name}</h4>
                            </div>



                        </div>
                        <div className="row ms-1">
                            <div className="col-6 d-flex justify-content-start">
                                <h4 style={{color: "#2c3e50", fontSize: "17px"}}
                                    className="d-flex">Rs. {item.price}</h4>

                            </div>

                            <div className="col-6">Soups</div>

                        </div>

                        <div className="row ms-2">

                                <input className="col-6" type="text" placeholder=""/>



                            <div className="col-6">
                                <button
                                    className="btn btn-sm btn-primary d-flex"
                                    style={{width: "60%", marginBottm: "20px"}}

                                    // onClick={() => setCartItems(prev => [...(prev || []), item])
                                    onClick={
                                        ()=>setCartItems( prev=>{
                                            // check if item already exists in cart
                                           
                                        }
                                      )
                                    }

                                    }
                                >Order
                                </button>
                            </div>


                            {/*<div className="col-4">*/}
                            {/*    <input type="text" className="form-control"/>*/}
                            {/*</div>*/}


                        </div>
                    </div>
                ))}

            </div>
            <div className="col-4 d-flex justify-content-center bg-white menu-scnd-row">

                <div className="cart-prooduct-list">
                {/* get cart  items one by one and create cards*/}
                    {cartItems?.map((cartItem) => (
                        <div key={cartItem.id} className="row mb-4 single-cart-item" style={{
                            width: "250px",
                            height: "120px",
                            backgroundColor: "red",
                            marginBottom: "10px",
                            borderRadius: "30px"
                        }}>
                            {/* close button */}
                            <div className='d-flex pt-2'style={{height:28}} ><CircleX  onClick={()=>handleDlt(cartItem.id)} /></div>
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