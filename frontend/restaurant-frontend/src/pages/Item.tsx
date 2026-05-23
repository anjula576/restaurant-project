import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import DataTable from "../components/DataTable.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

interface Supplier {
  id: number;
  name: string;
  mobileno: number;
  email: string;
  address: string;
}

interface Item {
  id: number;
  itemname: string;
  availableqty: number;
  totalqty: number;
  unit: string;
  purchaseprice: number;
}

interface AlertState {
  type: "success" | "error" | "warning" | "info";
  message: string;
}

function Item() {
  const [suppliers, setSuppliers] = useState<Supplier[] | null>([]);

  const [items, setItems] = useState<Item[]>([]);

  const [alert, setAlert] = useState<AlertState | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  // this is used to store the form data when add new customer or edit the customer
      //  speciality in here is mentied the initial values of the form fields in the useState function
      const [item, setItem] = useState<{
          id: number | null;
          itemname: string;
          availableqty: string;
          totalqty: string;
          unit:string;
          purchaseprice: string;
// this is used to store the suppliers list when add new item or edit the item
// when add new item or edit the item we need to show the suppliers list in the dropdown. so we need to store the suppliers list in the state
          suppliers:{
            id:string;
          }[];
      }>({
          id:null,
          itemname: "",
          availableqty: "",
          totalqty: "",
          unit: "",
          purchaseprice: "",

          suppliers:[],
      })

  const columns = [
    { title: "Item Name", property:"itemname"},
     { title: "Available Qty", property:"availableqty"},
     { title: "Total Qty", property:"totalqty"},
     { title: "Unit", property:"unit"},
     { title: "Purchase Price", property:"purchaseprice"},
]

useEffect(() => {
  fetch("http://localhost:8080/api/suppliers")
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the fetched data to the console
      setSuppliers(data); // Update the state with the fetched suppliers
    })
    .catch((error) => {
      console.error("Error fetching suppliers:", error);
    });


    fetch("http://localhost:8080/api/items")
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the fetched data to the console
      setItems(data); // Update the state with the fetched items
    })
    .catch((error) => {
      console.error("Error fetching items:", error);
    });
  // Add your effect logic here
}, []);

//function for edit items
const handleEdit = (row: Item) => {
  console.log("Edit item with ID:", row.id);
  //   your edit logic here, such as opening a modal with the item details
}

const handleSupplier =(e:any)=>{

  const {name,value} = e.target;
  if (suppliers) {
    setItem({ ...item, suppliers: [{ id: value }] });
  }

}

//function for handle the change of the form fields when add new customer or edit the customer
const itemNameHandle =(e:any)=>{

  setItem({...item, itemname: e.target.value});


}

const availableQtyHandle =(e:any)=>{

  setItem({...item, availableqty: e.target.value});

}

const totalQtyHandle =(e:any)=>{

  setItem({...item, totalqty: e.target.value});


}

const purchasePriceHandle =(e:any)=>{

  setItem({...item, purchaseprice: e.target.value});

}


const handleUnit =(e:any)=>{

setItem({...item, unit: e.target.value});

}
const submitItem = async (e: React.FormEvent<HTMLFormElement>) => {  


  e.preventDefault(); // Prevent the default form submission behavior
  console.log("item submit button pressed");
  
  try{
    // your submit logic here, such as sending a POST request to the server with the form data
    // if the submission is successful, you can set the alert state to show a success message

    const backendResponse =  await axios.post("http://localhost:8080/api/items", item);
    console.log("item"+item);
    console.log(backendResponse.data);

    if(backendResponse.data =="ok"){
 
       setAlert({ type: "success", message: "Item submitted successfully!" });

       console.log("item 2"+item);
    console.log(backendResponse.data);
    }
   
  }catch(error){
    console.log("item wasn't save.this is an error");
    console.error("Error submitting item:", error);
    setAlert({ type: "error", message: "Failed to submit item. Please try again." });

  }
} 

//function for update items
const onUpdate = () => {
}

// function for delete items
const deleteCustomer = (id: number) => {
  console.log("Delete item with ID:", id);
  // Implement your delete logic here, such as showing a confirmation dialog and making an API call to delete the item
}

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
          <div
            className="accordion ms-2 me-2"
            id="accordionPanelsStayOpenExample"
          >
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseOne"
                  aria-expanded="true"
                  aria-controls="panelsStayOpen-collapseOne"
                >
                  Item Form
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  <form onSubmit={submitItem}>
                    <div className="row">
                      {/*supplier*/}
                      <div className="col-lg-4 col-12">
                        <label htmlFor="selectSupplier" className="form-label">
                          Supplier` Name
                        </label>
                        <select className="form-select" id="selectSupplier" onChange={handleSupplier}>
                          <option value="">Select Supplier</option>

                          {/* create options for each supplier */}
                          {suppliers?.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                              {supplier.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/*item name*/}
                      <div className="col-lg-4 col-12">
                        <label htmlFor="txtItemName" className="form-label">
                          Item Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="itemname" onChange={itemNameHandle}
                          //  (`)-It’s called a backtick.On most keyboards it’s just under the Esc key (top left).
                          // Backticks are used for template literals.
                          //to use template literals in JavaScript for embedding variables, expressions, or writing multi-line strings.
                          // and in here uses the nested if

                          id="txtItemName"
                        />
                      </div>

                      {/*total qty*/}
                      <div className="col-lg-2 col-12">
                        <label htmlFor="txTotalQty" className="form-label" >
                          Total Quantity
                        </label>
                        <input
                          type="text"
                          className="form-control" onChange={totalQtyHandle}
                          /* in here use onblur*/
                          /*When you type the 10th digit, your state may still not have
                                                    updated in time (React state updates are async), so the regex test happens with 9 digits.
                                                     Then when you type the 11th, it finally has the full 10 digits.*/
                          /*Validate on blur (when user leaves the field)*/

                          name="totalquantity"
                          id="txTotalQty"
                        />
                      </div>

                      {/*available qty*/}
                      <div className="col-lg-2 col-12">
                        <label htmlFor="txtAvailableQty" className="form-label" >
                          Available Quantity
                        </label>
                        <input
                          type="text"
                          className="form-control" onChange={availableQtyHandle}
                          name="itemqty"  
                          id="txtAvailableQty"
                        />
                      </div>
                    </div>

                    <br />
                    <div className="row">
                      <div className="col-lg-4 col-12">
                        {/*unit*/}

                        <label htmlFor="selectUnit" className="form-label">
                          Unit
                        </label>
                        <select className="form-select" onChange={handleUnit}>
                          <option>g</option>
                          <option>Kg</option>
                          <option>Items</option>
                          <option>Packets</option>
                        </select>
                      </div>
                      {/*Purchase Price*/}

                      <br />

                      <div className="col-lg-4 col-12">
                        <label
                          htmlFor="txtPurchasePrice"
                          className="form-label"
                        >
                          Purchase Price
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="purchaseprice"
                          id="txtPurchasePrice"
                          onChange={purchasePriceHandle}
                        />
                      </div>

                
                    </div>
                    

                    <br />
                     <div className="row">
                    
                                                                        {/* check isEditing is true. if true show the update button ,if false show the submit button*/}
                                                                        {isEditing ? (<button type="button" onClick={() => {
                                                                            onUpdate();
                                                                        }} className="btn btn-primary">Update the Item</button>) : (
                                                                            <button type="submit" className="btn btn-primary"
                                                                            >Add New
                                                                                Item</button>)}
                    
                                                                        {/*this is conditional reading.div show only if alert is not null*/}
                                                                        {alert && (
                                                                            //  this div style is used to change the position of the alert
                                                                            <div className="col-4" style={{
                                                                                position: "fixed",
                                                                                top: "20px",
                                                                                right: "20px",
                                                                                zIndex: 9999,
                                                                                minWidth: "300px"
                                                                            }}>
                                                                                <Alert variant="filled" severity={alert.type} onClose={() => setAlert(null)}>
                                                                                    <AlertTitle>Success</AlertTitle>
                                                                                    {alert.message}
                                                                                </Alert>
                                                                            </div>
                                                                        )}
                                                                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  Items List
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  {/*use key when need to update a component when change the count*/}
                  {/* in here when change the customer count automatically unmount the datatable component
                                        and remount.this is an easier way to update component when list an list updates*/}
                  <DataTable key={items.length} columns={columns} data={items}
                            onEdit={(row) => handleEdit(row)} onDelete={(id)=>deleteCustomer(id)}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
