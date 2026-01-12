
import '../assets/css/Menu.scss'
import {useEffect, useState} from "react";
import foodimage from "../assets/rice mini.jpg"
import {PersonStanding} from "lucide-react";
import axios from 'axios';
import type { height } from '@mui/system';


//  this interface is used to mention the type of "menuItems" array
//without mentioning this can't assign values to that menuItems
// interfaces in react used to mention what type of data handle by an array
interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}



function Menu(){

    // store the menu items
    const[itemName,setName]=useState<string>("");
    const[description,setDescription]=useState<string>("");
    const[price,setPrice]=useState<string>("");
    const[imageUrl,setImageUrl]=useState<File | null>(null);

const [menuItems,setMenuItems]=useState<MenuItem[] >([]);
    useEffect(() => {

        fetch("http://localhost:8080/api/menuitems")
            .then((res)=>res.json())
            .then((data) => {

                setMenuItems(data);
                console.log(data);
                

            })
            .catch(
                (error)=>{
                    console.log( "Can't load the menu items",error)
                }
            )
    }, []);

    // delete menu item by id
    const deleteMenuItem=async(id:number)=>{    

        const confirmDelete=window.confirm("Are you sure you want to delete this menu item?");

        if(!confirmDelete){
            return;
        }else{
            try{
               return await axios.delete(`http://localhost:8080/api/menuitems/${id}`);
        }catch(error){
            console.error("Error deleting menu item:",error);
            alert("Failed to delete menu item. Please try again.");
        }

        // return await axios.delete(`http://localhost:8080/api/menuitems/${id}`)
    }

    // uplaoding the menu items
    const handleSubmit=async (e:any)=>{

        //  this is used to prevent the default behaviour of the form(usually page refresh)
        e.preventDefault();

        alert("Submitting the form");

        //  validation-----------------------------------------------

        //  check after trimming the name is empty or not (if empty show the alert)
        if(!itemName.trim()){
            alert("Please enter the menu item name");
            return;
        }

        if(!description.trim()){
            alert("Please enter the description");
            return;
        }
        if(Number(price)<=0){
            alert("Please enter valid price");
            return;
        }
        if(!imageUrl){
            alert("Please select an image");
            return;
        }

        // if the selected file is not an image.
        // startsWith() method determines whether a string begins with the characters of a specified string, returning true or false as appropriate.
        if(!imageUrl.type.startsWith("image/")){

            alert("Please select a valid image file");
            return;
        }


        // formData object is used to send form data, especially when dealing with file uploads.   
        const formData=new FormData();

        // append method is used to add key/value pairs to the FormData object.
        formData.append("name",itemName);
        formData.append("description",description);
        formData.append("price",price.toString());
        formData.append("status","true");
        formData.append("image",imageUrl);

        try{
            const response=await axios.post("http://localhost:8080/api/menuitems",formData,{

                // headers to inform the server about the type of data being sent.
                // multipart/form-data is used when the form includes files, allowing binary data to be sent.
                headers:{
                    "Content-Type":"multipart/form-data"
                    
                }
            });
            
            console.log("Menu item added successfully:",response.data);
            alert("Menu item added successfully");

            //  reset the form fields after successful submission
            setName("");
            setDescription("");
            setPrice("0");
            setImageUrl(null);

        }catch(error){  

            console.error("Error adding menu item:",error);
            alert("Failed to add menu item. Please try again.");
        }

        
    }


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
                            // src="https://rasamalaysia.com/wp-content/uploads/2019/06/chinese-fried-rice-thumb.jpg"
                            // this is the method to load the images from the backend server
                            src={item.image ? `http://localhost:8080${item.image}` : foodimage}
                            style={{ width: "90%",height:"100px", borderRadius: "10px" }} 
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
              <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">x
    {/* <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16.6"><defs><style andiallelmwithtext="42" tuafontsizes="42">.cls-1{fill:#00425c;}</style></defs><path class="cls-1" d="M323.5,420.36l7.17-7.45a.5.5,0,0,0-.72-.7l-7.14,7.43-7.14-7.43a.5.5,0,1,0-.72.7l7.17,7.45L315,427.82a.5.5,0,0,0,.36.84.51.51,0,0,0,.36-.15l7.14-7.43,7.14,7.43a.51.51,0,0,0,.36.15.47.47,0,0,0,.35-.14.49.49,0,0,0,0-.7Z" transform="translate(-314.81 -412.06)"></path></svg> */}
</button>
        </div>
        <div className="modal-body">
         
          <div className="modal-body_subtitle">Add new menu item</div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-box">
              <input placeholder="Menu Item Name" value={itemName} type="text" name="your-name" onChange={(e)=>setName(e.target.value)}required/>
            </div>
            <div className="input-box">
              <input placeholder="Description" value={description} type="text" name="your-phone" onChange={(e)=>setDescription(e.target.value)}required/>
            </div>
            <div className="input-box">
              <input placeholder="Price" type='text' value={price} name="your-message" onChange={(e)=>setPrice(e.target.value)}required/>
            </div>
           <div className="input-box">
            {/* in here, if there is image value then return image's 0 th position value,if not set null */}
            {/*  this is error free method */}
              <input placeholder="Menu Item Image" accept='image/*' type='file' onChange={(e)=>setImageUrl(e.target.files ? e.target.files[0] : null)} required/>
            </div>

             <div className="input-box">
                {/* in here,use the conditional rendering */}
                {/*in conditional rendering render the relevant conponent if available.without that can cause to crashing the app  */}
                {/* ex:- true && file -->then render  / false && file --> null */}
                {imageUrl && <img  src={URL.createObjectURL(imageUrl)} style={{width:60,height:60}} className='image-preview'></img>}
            </div>
                
            <div className="text-center">
                <button className="btn btn-primary">Send</button>
            </div>
          </form>
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
}

export default Menu;