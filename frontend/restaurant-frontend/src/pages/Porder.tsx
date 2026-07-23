import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useEffect, useState } from "react";
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
 interface Porder {
  id: number;
  suppliername: string;
  pordercode: string;
  requireddate: string;
  note: string;
  status: boolean;
  total: number;

}

interface Supplier {
  id: number;
  name: string;
  mobileno: number;
  email: string;
  address: string;
}


function Porder() {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const [porders, setPorders] = useState<Porder[]>([]);

  const [porder,setPorder] =useState<Porder | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

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

  const columns =[
    {title:"Porder Code",property:"pordercode"},
    {title:"Required Date",property:"requireddate"},
    {title:"Note",property:"note"},
    {title:"Status",property:"status"},
    {title:"Total",property:"total"}
  ]

  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format  

  const maxDateObj = new Date(currentDate);
  maxDateObj.setMonth(maxDateObj.getMonth() + 3); // Add 3 months to the current date
  const maxDate = maxDateObj.toISOString().split("T")[0]; // Get max date in YYYY-MM-DD format


  const loadSuppliers =()=>{
    fetch("http://localhost:8080/api/suppliers")
    .then((response) => response.json())
    .then((data) => {
      setSuppliers(data);
    })
    .catch((error) => {
      console.error("Error fetching suppliers:", error);
    });
  };

  const loadPorders =()=>{
    fetch("http://localhost:8080/api/porders")
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched porders:", data);
      setPorders(data);
    }
  )
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }

  const handleEdit = (item: Item) => {};

  const deleteCustomer = (id: number) => {};

  const onUpdate = () => {};

   useEffect(() => {
      loadPorders();
      loadSuppliers();
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
                    <div className="col-6">
                      main form
                      <form>
                        <div className="row">
                          <div className="col-6">
                            <label className="form-label" htmlFor="sltSupplier">
                              supplier Name
                            </label>
                            <select className="form-select" id="sltSupplier">
                              <option value="" disabled selected>
                                Select a supplier
                              </option>
                              {suppliers.map((supplier) => (
                                <option key={supplier.id} value={supplier.id}>
                                  {supplier.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-6">
                            <label htmlFor="txtPorderCode">Porder code</label>
                            <input type="text" className="form-control" id="txtPorderCode" onBlur={} onChange={} />
                          </div>

                          <div className="col-6">
                            <label htmlFor="txtRequiredDate">Required Date</label>
                            <input type="date" className="form-control" id="txtRequiredDate" onChange={} min={currentDate} max={maxDate} />
                          </div>

                          <div className="col-6">
                            <label htmlFor="txtNote">Note</label>
                            <textarea className="form-control" id="txtNote"></textarea>
                          </div>

                          <div className="col-6">
                            <label htmlFor="sltStatus">status</label>
                            <select className="form-select" id="sltStatus">
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-6 bg-secondary p-3 rounded-2">
                      second form
                      <form>
                        <div className="row">
                          <div className="col-6">
                            <label htmlFor="">Item Name</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="col-6">
                            <label htmlFor="">Purchase Price</label>
                            <input type="text" className="form-control" />
                          </div>

                          <div className="col-6">
                            <label htmlFor="">Quantity</label>
                            <input type="text" className="form-control" />
                          </div>

                          <div className="col-6">
                            <label htmlFor="">Line Price</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="row">
                            <div className="col-6">
                              
                                <button className="btn btn-primary mt-4 me-2">
                                  Add Item
                                </button>
                            
                              
                                <button className="btn btn-primary mt-4">
                                  Clear Item
                                </button>
                              
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    
                  </div>
                  <div className="row bg-body-secondary p-3 rounded-2 mt-4">
                     <table className="table table-bordered mt-4">
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Purchase Price</th>
                          <th>Quantity</th>
                          <th>Line Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Item 1</td>
                          <td>$10.00</td>
                          <td>5</td>
                          <td>$50.00</td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                    <button className="btn btn-primary mt-4">Submit Order</button>  
                    <button className="btn btn-secondary mt-4 ms-2">Clear Order</button>
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
                    key={porders.length}
                    columns={columns}
                    data={porders}
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

export default Porder;
