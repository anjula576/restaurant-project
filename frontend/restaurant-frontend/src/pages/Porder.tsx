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
                  {/* Purchase Order Form Content */}
                  <div className="row">
                    <div className="col-6">main form

                      <form>
                        <div className="row">
                          <div className="col-6">
                             <label className="form-label">supplier Name</label>
                          <input
                            type="text"
                            className="form-control"/>

                          </div>
                          <div className="col-6">
                            <label htmlFor="">Porder code</label>
                            <input
                              type="text"
                              className="form-control"
                            />
                          </div>

                      
                          <div className="col-6">

                            <label htmlFor="">Required Date</label>
                            <input
                              type="date"
                              className="form-control"
                            />

                          </div>

                          <div className="col-6">

                            <label>Note</label>

                            <textarea className="form-control"></textarea>
                            </div>

                            <div className="col-6">
                              <label htmlFor="">status</label>
                              <select className="form-select">
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </div>

                            <div className="col-6">
                              <label htmlFor="">Total</label>
                              <input className="form-control" type="text" />
                            </div>
                         
                        </div>


                      </form>


                    </div>
                    <div className="col-6">second form</div>
                  </div>
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


