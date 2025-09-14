import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";




const Layout:React.FC<{children:React.ReactNode}>=({children})=>{

    return(
        <div className="d-flex">
            <Sidebar/>
            <div className="flex-grow-1">
                <Navbar/>
               <Content>
                   {children}

               </Content>
            </div>
        </div>
    )
}

// function Layout (){
//
//     return(
//         <>
//             <Navbar/>
//             <Sidebar/>
//         </>
//
//     )
// }

export default Layout;
