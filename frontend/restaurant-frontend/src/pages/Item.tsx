import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import DataTable from "../components/DataTable.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface Supplier {
  id: number;
  name: string;
  mobileno: number;
  email: string;
  address: string;
}

interface Item {
  suppliers: Supplier[];
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
    unit: string;
    purchaseprice: string;
    // this is used to store the suppliers list when add new item or edit the item
    // when add new item or edit the item we need to show the suppliers list in the dropdown. so we need to store the suppliers list in the state
    suppliers:number[];
  }>({
    id: null,
    itemname: "",
    availableqty: "",
    totalqty: "",
    unit: "",
    purchaseprice: "",

    suppliers: [],
  });

  const columns = [
    { title: "Item Name", property: "itemname" },
    { title: "Available Qty", property: "availableqty" },
    { title: "Total Qty", property: "totalqty" },
    { title: "Unit", property: "unit" },
    { title: "Purchase Price", property: "purchaseprice" },
  ];

  // use state for validate the form fields when add new item or edit the item
  const [itemNamevalid, setItemNameValid] = useState<boolean | null>(false);
  const [availableQtyValid, setAvailableQtyValid] = useState<boolean | null>(
    false,
  );
  const [totalQtyValid, setTotalQtyValid] = useState<boolean | null>(false);
  const [purchasePriceValid, setPurchasePriceValid] = useState<boolean | null>(
    false,
  );
  const [supplierValid, setSupplierValid] = useState<boolean | null>(false);
  const [unitValid, setUnitValid] = useState<boolean | null>(false);

  // regex pattern for validate the form fields

  const itemNamePattern = /^[A-Za-z\s]{3,15}$/;
  const AvailableQtyPattern = /^[0-9]+$/;
  const TotalQtyPattern = /^[0-9]+$/;
  const PurchasePricePattern = /^[0-9]+(\.[0-9]{1,2})?$/;

  const loadSuppliers = () => {
    fetch("http://localhost:8080/api/suppliers")
      .then((response) => response.json())
      .then((data) => {
        setSuppliers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loadItems = () => {
    fetch("http://localhost:8080/api/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // function for validate the form fields when add new item or edit the item

  const validateItemName = (e: any) => {
    const itemName = e.target.value;
    console.log("item"+itemName);
    

    if (itemName == "" || !itemNamePattern.test(itemName)) {
      setItemNameValid(false);
      return;
    }

    setItemNameValid(true);
    return ;
  };

  const validateAvailableQty = (e: any) => {
    const availableQty = e.target.value;
    console.log("validat available qty"+availableQty);
    

    if (availableQty == "" || !AvailableQtyPattern.test(availableQty)) {
      setAvailableQtyValid(false);
      return;
    }

    setAvailableQtyValid(true);
    return ;
  };

  const validateTotalQty = (e: any) => {
    const totalQty = e.target.value;
    console.log("total"+totalQty);
    

    if (totalQty == "" || !TotalQtyPattern.test(totalQty)) {
      setTotalQtyValid(false);
      return;
    }

    setTotalQtyValid(true);
    return;
  };

  const validatePurchasePrice = (e: any) => {
    const purchasePrice = e.target.value;
    console.log("purchase price"+purchasePrice);

    if (purchasePrice == "" || !PurchasePricePattern.test(purchasePrice)) {
      setPurchasePriceValid(false);
      return;
    }

    setPurchasePriceValid(true);
    return;
  };

  const validateSupplier = (selectedOptions: any) => {

    console.log("supplier"+selectedOptions);
    
  if (!selectedOptions || selectedOptions.length === 0) {

    setSupplierValid(false);
    return;

  }

  setSupplierValid(true);
  return;

}

  const validateUnit = (e: any) => {
    const unit = e.target.value;

    console.log("unit"+unit);
    

    if (unit == "" ) {
      setUnitValid(false);
      return;
    }
    setUnitValid(true);
    return;
  };
  //function for edit items
  
 const handleEdit = (row: Item) => {
  console.log("Edit item:", row);

  setIsEditing(true);

  setItem({
    id: row.id,
    itemname: row.itemname,
    availableqty: row.availableqty?.toString() || "",
    totalqty: row.totalqty?.toString() || "",
    unit: row.unit,
    purchaseprice: row.purchaseprice?.toString() || "",

    // in here we need to convert the suppliers list from the database to the 
    // format that is required by the react-select component (react-select got from the external library)

    suppliers: (row.suppliers || []).map((s: any) =>
      typeof s === "object" ? s.id : parseInt(s),
    ),
  });
};


  

  //function for handle the change of the form fields when add new customer or edit the customer
  const itemNameHandle = (e: any) => {
    setItem({ ...item, itemname: e.target.value });
    console.log("item name field"+item.suppliers);
    
  };

  const availableQtyHandle = (e: any) => {
    setItem({ ...item, availableqty: e.target.value });
    console.log("available qty"+item.availableqty);
    console.log(item);
    
  };

  const totalQtyHandle = (e: any) => {
    setItem({ ...item, totalqty: e.target.value });
  };

  const purchasePriceHandle = (e: any) => {
    setItem({ ...item, purchaseprice: e.target.value });
  };

  const handleUnit = (e: any) => {
    setItem({ ...item, unit: e.target.value });
  };

  const handleErrors = () => {
    let errors = [];

    //push the error messages to the errors array if the form fields are not valid
    if (supplierValid === false) {
      errors.push("Supplier is required \n");
    }
    if (itemNamevalid === false) {
      errors.push(
        "Item Name is required and should not contain any special characters \n",
      );
    }
    if (availableQtyValid === false) {
      errors.push(
        "Available Quantity is required and should be a positive number \n",
      );
    }
    if (totalQtyValid === false) {
      errors.push(
        "Total Quantity is required and should be a positive number \n",
      );
    }
    if (purchasePriceValid === false) {
      errors.push(
        "Purchase Price is required and should be a positive number \n",
      );
    }
    if (unitValid === false) {
      errors.push("Unit is required \n");
    }

    return errors;
  };

  // this is used to convert the suppliers list 
  // from the database to the format that is required by the react-select component 
  // (react-select got from the external library)
  const supplierOptions = (suppliers ?? []).map((s) => ({
    value: s.id,
    label: s.name,
  }));

// this is used to convert the suppliers list from the database to the format
// that is required by the react-select component (react-select got from the external library)
const payload = {
  ...item,
  suppliers: item.suppliers.map(id => ({ id }))
};


  const submitItem = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    const formErrors = handleErrors();

    console.log("item"+item);
    console.log("payload"+payload);
    console.log(itemNamevalid,supplierValid,availableQtyValid,totalQtyValid,unitValid,purchasePriceValid);
    

    // if there are any errors, return from the function to prevent the form submission
    if (formErrors.length > 0) {
       console.log("Error part");
      setAlert({ type: "error", message: formErrors.join("\n ") });
      setTimeout(() => {
        setAlert(null);
      }, 9000);
      return;
    }

    try {
      // your submit logic here, such as sending a POST request to the server with the form data
      // if the submission is successful, you can set the alert state to show a success message

     
      
      const backendResponse = await axios.post(
        "http://localhost:8080/api/items",
        payload,
      );

      if (backendResponse.data == "ok") {
        setAlert({ type: "success", message: "Item submitted successfully!" });

        //  destroy the alert after 3 seconds
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to submit item. Please try again.",
      });

      //  destroy the alert after 3 seconds
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  //function for update items
  const onUpdate = async () => {
   


    const formErrors = handleErrors();

    console.log("item"+item);
    console.log("payload"+payload);
    console.log(itemNamevalid,supplierValid,availableQtyValid,totalQtyValid,unitValid,purchasePriceValid);
    

    // if there are any errors, return from the function to prevent the form submission
    if (formErrors.length > 0) {
       console.log("Error part");
      setAlert({ type: "error", message: formErrors.join("\n ") });
      setTimeout(() => {
        setAlert(null);
      }, 9000);
      return;
    }

    try {
      // your submit logic here, such as sending a POST request to the server with the form data
      // if the submission is successful, you can set the alert state to show a success message

     
      
      const backendResponse = await axios.put(
        "http://localhost:8080/api/items",
        payload,
      );

      if (backendResponse.data == "ok") {
        setAlert({ type: "success", message: "Item updated successfully!" });

        //  destroy the alert after 3 seconds
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to update item. Please try again.",
      });

      //  destroy the alert after 3 seconds
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }



  };

  // function for delete items
  const deleteCustomer = (id: number) => {
    console.log("Delete item with ID:", id);
    // Implement your delete logic here, such as showing a confirmation dialog and making an API call to delete the item
  };

  useEffect(() => {
    loadSuppliers();
    loadItems();
  }, []);

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
                        <Select
                          isMulti
                        
                          id="selectSupplier"
                          name="supplier"
                          options={supplierOptions}
                         onChange={(selectedOptions) => {
                          
  setItem({
    
    ...item,
    suppliers: selectedOptions.map((opt) => opt.value),
  });
}}
                          onBlur={validateSupplier}
                          value={supplierOptions.filter((option) =>
                            item.suppliers.some(
                              (s) => s === option.value,
                            ),
                          )}
                        />
                      </div>

                      {/*item name*/}
                      <div className="col-lg-4 col-12">
                        <label htmlFor="txtItemName" className="form-label">
                          Item Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={item.itemname}
                          name="itemname"
                          onChange={itemNameHandle}
                          onBlur={validateItemName}
                          //  (`)-It’s called a backtick.On most keyboards it’s just under the Esc key (top left).
                          // Backticks are used for template literals.
                          //to use template literals in JavaScript for embedding variables, expressions, or writing multi-line strings.
                          // and in here uses the nested if

                          id="txtItemName"
                        />
                      </div>

                      {/*total qty*/}
                      <div className="col-lg-2 col-12">
                        <label htmlFor="txTotalQty" className="form-label">
                          Total Quantity
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={item.totalqty}
                          onChange={totalQtyHandle}
                          onBlur={validateTotalQty}
                          /* in here use onblur*/
                          /*When you type the 10th digit, your state may still not have
                                                    updated in time (React state updates are async), so the regex test happens with 9 digits.
                                                     Then when you type the 11th, it finally has the full 10 digits.*/
                          /*Validate on blur (when user leaves the field)*/

                          name="totalqty"
                          id="txTotalQty"
                        />
                      </div>

                      {/*available qty*/}
                      <div className="col-lg-2 col-12">
                        <label htmlFor="txtAvailableQty" className="form-label">
                          Available Quantity
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={availableQtyHandle}
                          value={item.availableqty}
                          onBlur={validateAvailableQty}
                          name="availableqty"
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
                        <select
                          className="form-select"
                          name="unit"
                          value={item.unit}
                          onChange={handleUnit}
                          onBlur={validateUnit}
                          id="selectUnit"
                        >
                          <option value="" selected>
                            Select Unit
                          </option>
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
                          value={item.purchaseprice}
                          onBlur={validatePurchasePrice}
                        />
                      </div>
                    </div>

                    <br />
                    <div className="row">
                      {/* check isEditing is true. if true show the update button ,if false show the submit button*/}
                      {isEditing ? (
                        <button
                          type="button"
                          onClick={() => {
                            onUpdate();
                          }}
                          className="btn btn-secondary"
                        >
                          Update the Item
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          Add New Item
                        </button>
                      )}

                      {/*this is conditional reading.div show only if alert is not null*/}
                      {alert && (
                        //  this div style is used to change the position of the alert
                        <div
                          className="col-4"
                          style={{
                            position: "fixed",
                            top: "20px",
                            right: "20px",
                            zIndex: 9999,
                            minWidth: "300px",
                          }}
                        >
                          <Alert
                            variant="filled"
                            severity={alert.type}
                            onClose={() => setAlert(null)}
                          >
                            <AlertTitle>Alert</AlertTitle>
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
                  <DataTable
                    key={items.length}
                    columns={columns}
                    data={items}
                    onEdit={(row) => handleEdit(row)}
                    onDelete={(id) => deleteCustomer(id)}
                  />
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
