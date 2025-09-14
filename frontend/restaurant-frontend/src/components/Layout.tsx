import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";



// in here, to children get any jsx element(anj html element or jsx files.children is just a react node)
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


export default Layout;
