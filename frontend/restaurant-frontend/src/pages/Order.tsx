
import '../assets/css/Menu.scss'
import {useEffect, useState} from "react";
import {PersonStanding} from "lucide-react";
import {CircleX} from "lucide-react";
import item from "./Item.tsx";
import axios from 'axios';


//  this interface is used to mention the type of "menuItems" array
//without mentioning this can't assign values to that videos
// interfaces in react used to mention what type of data handle by an array
interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

interface CartItem {
    id: number;
    name: string;
    qty:number;
    price: number;
     imageUrl: string;
}

interface Customer {
    id: number;
    firstname: string;
    lastname: string;
    mobileno: string;
    email: string;
    status: boolean;
}



function Order(){

    //  state to store quantity(from the menu item to cart item)
    const [itemQty,setQty]=useState<number>(1);

    // store the menu items
    const [menuItems,setMenuItems]=useState<MenuItem[] >([]);

    // store the customer details
    const [customers,setCustomers]=useState<Customer[]>([]);

    //to store cart items
    const [cartItems,setCartItems]=useState<CartItem[]>([])

    // store the selected customer id
    const [selectedCustomerId,setSelectedCustomerId]=useState<number | null>(null);

    // store the selected customer object
    const [selectedMobileNo,setMobileNo]=useState<string|null>("");

    useEffect(
      //  this function will run when the component is mounted
      // don't want to call it separately
      () => {

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

            // fetch customers
        fetch("http://localhost:8080/api/customer")
            .then((res)=>res.json())
            .then((data) => {

              setCustomers(data);

            })
            .catch(
              (error)=>{
                console.log("can't load the customers",error);
                
              }
            )

    }, []);


    // function for handle customer selection change
    // changeEvent is used for select, input, textarea elements
    const handleCustomerChange =(e:React.ChangeEvent<HTMLSelectElement>)=>{

        const customerId =Number(e.target.value);

        //  set customer id to the state
        setSelectedCustomerId(customerId);

        //  find the selected customer from the customers array
        const selectedCustomer = customers.find(customer =>customer.id ===customerId);

        // set the mobile number state
        if (selectedCustomer){
            setMobileNo (selectedCustomer.mobileno);
            
        }else{
            setMobileNo (null);
        } 
      }


    //  function for calculate the subtotal (returned value should be a number)
    const calculateSubtotal = ():number => {

        // method 1: using reduce
        // return cartItems.reduce((total, item) => total + item.price * item.qty, 0);

        //  method 2: using for loop
        let subtotal = 0;
        for (const item of cartItems) {
            subtotal += item.price * item.qty;
        }

        return subtotal;

    }
    //  function to delete the the item
    const handleDlt =(dltItemId:number)=>{
        setCartItems(prevItems =>prevItems?.filter(prevItem =>prevItem.id !==dltItemId));
    };


      // delete menu item by id
    const deleteMenuItem=async(id:number)=>{    

        const confirmDelete=window.confirm("Are you sure you want to delete this menu item?");

        if(!confirmDelete){
            return;
        }else{
            try{
                // api call to delete the menu item
               return await axios.delete(`http://localhost:8080/api/menuitems/${id}`);
        }catch(error){
            console.error("Error deleting menu item:",error);
            alert("Failed to delete menu item. Please try again.");
        }
    }

        // return await axios.delete(`http://localhost:8080/api/menuitems/${id}`)
    }

    return <>
        <h2>Order </h2>
        <div className="row">
            <div className="col-12 col-lg-8 menu-first-row">
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
                        key={item.id}
                            src={`http://localhost:8080${item.image}`}
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

                                <input className="col-6" type="text" placeholder=""
                                value={itemQty}
                                // quantity state update
                                // should convert string to number (must)
                                onChange={(e)=>setQty(Number(e.target.value))}
                                />




                            <div className="col-6">
                                <button
                                    className="btn btn-sm btn-primary d-flex"
                                    style={{width: "60%", marginBottom: "20px"}}

                                    // onClick={() => setCartItems(prev => [...(prev || []), item])
                                    onClick={
                                        ()=>setCartItems( prev=>{
                                            // check if item already exists in cart
                                            //  if exists then return previous state
                                            const exists =prev?.some(cartItem =>cartItem.id ===item.id);
                                            if (exists){
                                                return prev.map(cartItem=>cartItem.id ===item.id ?
                                                    {...cartItem,qty:cartItem.qty +itemQty}:
                                                    cartItem
                                                );
                                            }

                                            return[...(prev || []),{item,qty:itemQty,id:item.id,name:item.name,price:item.price,imageUrl:item.image}];
                                            console.log("cart items:",cartItems);
                                            
                                           
                                        }
                                      )
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
            {/* second section */}
            <div className="col-12 col-lg-4 pt-5 pt-lg-0 d-flex justify-content-center bg-white menu-scnd-row">

  <div className="cart-container d-flex flex-column h-100 w-100 col-12 col-lg-4">

    {/* Cart Items - scrollable area */}
    <div className="cart-items-section">
      <h3 className="text-center mb-3">Cart Items</h3>

      <div className="cart-items-list" style={{overflowY:'auto',maxHeight:250}}  >
        {cartItems?.length === 0 ? (
          <div className="text-center py-4 text-muted">
            Your cart is empty
          </div>
        ) : (
          cartItems.map((cartItem) => (
            <div
              key={cartItem.id}
              className="single-cart-item d-flex align-items-center"
            >
              {/* Delete button */}
              <button
                className="btn-close me-2"
                onClick={() => handleDlt(cartItem.id)}
                aria-label="Remove item"
              >
                <CircleX size={20} />
              </button>

              {/* Image */}
              <div className="cart-item-image flex-shrink-0">
                <img
                  src={`http://localhost:8080${cartItem.imageUrl}`}
                  alt={cartItem.name}
                  className="img-fluid rounded"
                  style={{width: '60px', height: '60px', objectFit: 'cover'}}
                />
              </div>

              {/* Details */}
              <div className="cart-item-details flex-grow-1 ms-3">
                <div className="fw-bold">{cartItem.name}</div>
                <div className="text-muted small">
                  LKR {cartItem.price.toFixed(2)} × {cartItem.qty}
                </div>
              </div>

              {/* Total for this item (optional) */}
              <div className="cart-item-subtotal fw-medium">
                LKR {(cartItem.price * cartItem.qty).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    {/* Summary / Checkout area - fixed at bottom */}
    <div className="cart-summary mt-3 pt-3 border-top" style={{maxHeight: '250px'}}>
      <div className="d-flex justify-content-between mb-2">
        <span>Subtotal ({cartItems?.length || 0} items)</span>
        <span>LKR {calculateSubtotal().toFixed(2)}</span>
        
      </div>

  
   {/*  delivery service contain service */}
      <div className="d-flex justify-content-between mb-2">
        <span>Delivery / Service</span>
        <span>LKR 0.00</span> {/* change later */}
      </div>
      <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2 mt-2">
        <span>Total</span>
        <span>LKR {calculateSubtotal().toFixed(2)}</span>
       
      </div>
      

      {/* Customer / Payment info (example) */}
      <div className=" row mt-4">
        <div className="col-4 mb-2">
          <label className='form-label' htmlFor='slctcstmr'>Name:</label> {/* dynamic later */}
        </div>

        <div className='col-8'>
          <select className='form-select' id='slctcstmr' onChange={handleCustomerChange}>
            <option value="">Select Customer</option>

            {/* check cutomer active or not. then create dynamic dropdown from it */}
            {customers.filter(customer=>customer.status===true).map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.firstname} {customer.lastname}
              </option>
            ))}
          </select>
        </div>
        <div className="row pt-2">
        <div className="col-4 mb-2 mt-2">
          <label className='form-label' htmlFor='slctedcstmrMble'>Contact:</label>{/* dynamic later */}
        </div>
        <div className="col-8">
          <input
            type="text"
            className="form-control"
            placeholder="Enter contact number"
            value={selectedMobileNo || ""}
            id='slctedcstmrMble'
            readOnly
          />
        </div>
        </div>
        <div className="mb-2">
          <strong>Payment Method:</strong> Cash on Delivery {/* or card, etc */}
        </div>
      </div>

      <button className="btn btn-primary w-100 mt-3 py-2">
        Proceed to Checkout
      </button>
    </div>
  </div>
</div>

            {/*  end of second section */}
        </div>


    </>
}

export default Order;