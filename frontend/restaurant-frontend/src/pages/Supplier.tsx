import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import axios from "axios";


function Supplier(){

    const [isEditing, setIsEditing] = useState(false);
    const [alert, setAlert] = useState<{type: string, message: string} | null>(null);
    const[suppliers,setSuppliers] = useState([]);

    // this is usedstate function
    // this is used to store the form data when add new supplier or edit the supplier
    //  speciality in here is mentied the initial values of the form fields in the useState function
        const [supplier, setSupplier] = useState<{
            id: number | null;
            name: string;
            email: string;
            mobileno: string;
            address:string;
            status: string | boolean;
        }>({
            id:null,
            name: "",
            email: "",
            mobileno: "",
            address: "",
            status: "",
        })

//  form field validations -----------------------------------------

    const [nameValid, setNameValid] = useState<String | null>(null);
    const [emailValid, setEmailValid] = useState<String | null>(null);
    const [mobileValid, setMobileValid] = useState<String | null>(null);
    const [addressValid, setAddressValid] = useState<String | null>(null);


    // The first / means start of regex literal.
    // The last / means end of regex literal.
    //  + means “one or more times”. (This is a quantifier in regex.)

    const namePatrn = /^[A-Za-z\s]{3,15}$/;
    const mobilePatrn = /^[0-9]{10}$/;

    // w - means Shorthand for word characters → [A-Za-z0-9_] (letters, digits, underscore).

    const emailPatrn = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    //  end of form validation----------------------------------------------

 
    // get all suppliers from backend
    const getSuppliers = () => {
        try {
            fetch("http://localhost:8080/api/suppliers")
            .then((response) => response.json())
            .then((data) => {
                setSupplier(data);
                console.log("Suppliers fetched successfully:"+data);
            })
            .catch((error) => {
                console.error("Error fetching suppliers:", error);
            });
            

        }
        catch (error) {
            console.error("Error fetching suppliers:", error);
        }

    }

    const columns = [
           
            {title: "Supplier Name", property: "name"},
            {title: "Email", property: "email"},
            {title: "Address", property: "address"},
        ];


        const formErrors = () => {
            let errors = "";

            if(supplier.name === ""){
                errors += "Supplier name is required. ";
            }

            if(supplier.email === ""){
               errors += "Email is required. ";
            }
            if(supplier.address === ""){
                errors += "Address is required. ";
            }

            return errors;
        }

        // handle form data

        const handleSupplierName = (e: any) => {
            console.log(supplier);
            console.log(e.target.value);
            
            setSupplier({...supplier, name: e.target.value});
        }

        const handleSupplierEmail = (e: any) => {
                        console.log(supplier);

            setSupplier({...supplier, email: e.target.value});
        }

        const handleSupplierAddress = (e: any) => {
                        console.log(supplier);

            setSupplier({...supplier, address: e.target.value});
        }

        // fields validations

        //  in here if pattern is matched return null (null means no error) otherwise return the error message
        const validateSupplierName = () => {
            setNameValid(supplier.name === "" ? "Supplier name is required" : (namePatrn.test(supplier.name) ? null : "Supplier name must be 3-15 characters and contain only letters and spaces"));
        }

        const validateSupplierEmail = () => {
            setEmailValid(supplier.email === "" ? "Email is required" : (emailPatrn.test(supplier.email) ? null : "Invalid email format"));
        }

        const validateSupplierAddress = () => {
            setAddressValid(supplier.address === "" ? "Address is required" : null);
        }


        // function to handle form submission
        const submitSupplier = async (e: any) => {

    

            if(formErrors() !== ""){
                window.alert(formErrors());
                return;
            }

            try {
                const res = await axios.post("http://localhost:8080/api/suppliers", supplier);

                console.log("Supplier added successfully:", res.data);

                getSuppliers(); // Refresh the supplier list
            } catch (error) {
                console.error("Error adding supplier:", error);
            }
        }

        //  update supplier function
        const updateSupplier = async (e: any) => {

            // prevent the default form submission behavior
             e.preventDefault();




        }


        const editBtn = (id: any) => {
            console.log("Edit supplier:", id);
        }

        const deleteBtn = (id: any) => {
            console.log("Delete supplier:", id);
        }

    const handleEdit = (id: any) => {
        // TODO: Implement edit functionality
        console.log("Edit supplier:", id);
    }

    const handleDelete = (id: any) => {
        // TODO: Implement delete functionality
        console.log("Delete supplier:", id);
    }


       useEffect(() => {   

        getSuppliers();
    }, [])


    return (
        <div>
            <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
       Supplier Form
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body">
{/* Supplier Form */}
        <form>
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="supplierName" className="form-label">Supplier Name</label>
                    <input type="text"onChange={handleSupplierName} onBlur={validateSupplierName} className={`form-control  ${nameValid==null ?"" :nameValid ?'is-valid' : 'is-invalid'}`} id="supplierName" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="supplierEmail" className="form-label">Email</label>
                    <input type="email" onChange={handleSupplierEmail} onBlur={validateSupplierEmail} className={`form-control ${emailValid==null ?"" :emailValid ?'is-valid' : 'is-invalid'}`} id="supplierEmail" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <label htmlFor="supplierAddress"  className={`form-label `}>Address</label>
                    <input type="text" onChange={handleSupplierAddress} onBlur={validateSupplierAddress} className={`form-control ${addressValid==null ?"" :addressValid ?'is-valid' : 'is-invalid'}`} id="supplierAddress" />
                </div>
            </div>

              <div className="row">

                {/* conditional button */}
                {isEditing ? (<button type="button" className="btn btn-secondary" onClick={() => updateSupplier}>Edit the Supplier</button>) 
                : (<button type="button" className="btn btn-primary" onClick={() => submitSupplier}>Add the Supplier</button>)}

              </div>
           
        </form>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Supplier List
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
 <DataTable key={supplier.length} columns={columns} data={supplier}
                                                       onEdit={(row) => handleEdit(row)} onDelete={(id)=>handleDelete(id)}/>

      </div>
    </div>
  </div>
</div>
        </div>
    )
}

export default Supplier;

