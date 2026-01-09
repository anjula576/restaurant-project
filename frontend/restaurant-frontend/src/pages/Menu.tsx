
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
    <div className='row'>
        <div className='col-8'>
             <h2>Menu items</h2>
        </div>
        <div className='col-4 d-flex justify-content-end'>
            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Add Menu Item</button>
        </div>
    </div>
   
        <div className="row">
            <div className="col-12 menu-first-row">
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

            {/* start of menu adding model */}
              <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">x
    {/* <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16.6"><defs><style andiallelmwithtext="42" tuafontsizes="42">.cls-1{fill:#00425c;}</style></defs><path class="cls-1" d="M323.5,420.36l7.17-7.45a.5.5,0,0,0-.72-.7l-7.14,7.43-7.14-7.43a.5.5,0,1,0-.72.7l7.17,7.45L315,427.82a.5.5,0,0,0,.36.84.51.51,0,0,0,.36-.15l7.14-7.43,7.14,7.43a.51.51,0,0,0,.36.15.47.47,0,0,0,.35-.14.49.49,0,0,0,0-.7Z" transform="translate(-314.81 -412.06)"></path></svg> */}
</button>
        </div>
        <div className="modal-body">
         
          <div className="modal-body_subtitle">Add new menu item</div>
          <div className="contact-form">
            <div className="input-box">
              <input placeholder="Your Name" value="" type="text" name="Menu name"/>
            </div>
            <div className="input-box">
              <input placeholder="Your Phone" value="" type="tel" name="your-phone"/>
            </div>
            <div className="input-box">
              <textarea placeholder="Enter Your Message" name="your-message"></textarea>
            </div>
            <div className="input-box text-center">
                <button className="btn btn-primary" type="button">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
            {/* end of  menu adding model */}

            {/* <div className="col-4 bg-dark menu-scnd-row">

            </div> */}
        </div>


    </>
}

export default Menu;