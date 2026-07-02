import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useState } from "react";
import DataTable from "../components/DataTable";



interface AlertState {
  type: "success" | "error" | "warning" | "info";
  message: string;
}

interface Item {
  id: number;
  itemname: string;
  availableqty: number;
  totalqty: number;
  unit: string;
  purchaseprice: number;
}

function Porder(){

    const [alert, setAlert] = useState<AlertState | null>(null);

    const [items, setItems] = useState<Item[]>([]);

    const [isEditing, setIsEditing] = useState(false);



    const [item, setItem] = useState<{
    id: number | null;
    itemname: string;
    availableqty: string;
    totalqty: string;
    unit: string;
    purchaseprice: string;
   
  }>({
    id: null,
    itemname: "",
    availableqty: "",
    totalqty: "",
    unit: "",
    purchaseprice: "",
  });

     const columns = [
    { title: "Item Name", property: "itemname" },
    { title: "Available Qty", property: "availableqty" },
    { title: "Total Qty", property: "totalqty" },
    { title: "Unit", property: "unit" },
    { title: "Purchase Price", property: "purchaseprice" },
  ];

  const handleEdit = (item: Item) => {

  }

    
  const deleteCustomer = (id: number) => {

  }

  const onUpdate = () => {
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
                  Purchase Order Form
                </button>
              </h2>
              <div
                id="panelsStayOpen-collapseOne"
                className="accordion-collapse collapse"
              >
                <div className="accordion-body">
                  <form>
                    <div className="row">
                      {/*supplier*/}
                      <div className="col-lg-4 col-12">
                        <label htmlFor="selectSupplier" className="form-label">
                          Supplier` Name
                        </label>
                        <select id="selectSupplier" className="form-control"></select>
                      </div>

                      {/*item name*/}
                      <div className="col-lg-4 col-12">
                        <label htmlFor="txtItemName" className="form-label">
                          Item Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                    
                          name="itemname"
                      
                          
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
                         
                          /* in here use onblur*/
                          /*When you type the 10th digit, your state may still not have
                                                    updated in time (React state updates are async), so the regex test happens with 9 digits.
                                                     Then when you type the 11th, it finally has the full 10 digits.*/
                          /*Validate on blur (when user leaves the field)*/

                          name="totalqty"
                          id="txTotalQty"
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
                          Update the Porder
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          Add New Porder
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
                  Porder List
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
    )


}

export default Porder;


