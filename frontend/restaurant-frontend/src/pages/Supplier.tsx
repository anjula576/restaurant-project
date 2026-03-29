import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";


function Supplier(){

    const [supplier, setSupplier] = useState<any[]>([])


 
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

