import React from "react";


// this is common file to generate the table module
//  should pass the columns and data when add this component

function DataTable( {columns=[],data=[],onEdit}){

    return(
<table className="table table-active">
         <thead>
     <tr>
       {columns.map((col, index) => (
                 <th
                   key={index}
                  scope="col"
                 >
                     {col.title} </th>
             ))}

         <th>Actions</th>
         </tr>
         </thead>
    <tbody>
        {data && data.length > 0 ? (
                 data.map((row, rowIndex) => (
                     <tr key={rowIndex} className="hover:bg-gray-50">
                         {columns.map((col, colIndex) => (
                             <td key={colIndex}>

                                 {/*check if property name same to status .that means get true or false.if true return active if not return inactive*/}
                                 {/*get row data according to col property*/}

                                 {col.property ==="status"?(row[col.property]? "Active" :"Inactive"):row[col.property]}

                             </td>

                         ))}
                         <td>
                             {/*when use call back functions like that in the react should call like that
                             without that react restrict the function calling*/}
                             <button className="btn btn-primary" onClick={()=>onEdit(row)}>Edit</button>
                         </td>
                     </tr>
                 ))
             ) : (
                 <tr>
                     <td colSpan={columns.length}>

                No data available

                     </td>
                 </tr>
             )}

             </tbody>

</table>

    )

}

export default DataTable;