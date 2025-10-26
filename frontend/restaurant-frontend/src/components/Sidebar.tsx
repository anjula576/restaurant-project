import React, { useState } from "react";
import {
    BookUser,
    House,
    PackageSearch,
    ShoppingCart,
    SquareMenu,
    TicketPercent,
    Users,
    UtensilsCrossed
} from "lucide-react"; // example icons
import SidebarMenuItem from "./SidebarMenuItem";




const Sidebar: React.FC = () => {

    const [expanded, setExpanded] = useState(false);

    return (



            <div
                className={`bg-light border-end ${expanded ? "sidebar-expanded" : "sidebar-collapsed"}`}
                style={{minHeight: "100vh", width: expanded ? "200px" : "60px"}}
            >

                <button
                    className="btn btn-sm btn-outline-primary m-2"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "<" : ">"}
                </button>

                <SidebarMenuItem icon={<House/>} label="Dashboard" path="/" expanded={expanded}/>
                <SidebarMenuItem icon={<Users/>} label="Customers" path="/customer" expanded={expanded}/>
                <SidebarMenuItem icon={<TicketPercent />} label="Reservation" path="/reservation" expanded={expanded}/>
                <SidebarMenuItem icon={<ShoppingCart/>} label="Orders" path="/order" expanded={expanded}/>
                <SidebarMenuItem icon={<UtensilsCrossed />} label="Menu" path="/menu" expanded={expanded}/>
                <SidebarMenuItem icon={<PackageSearch />} label="Item" path="/item" expanded={expanded}/>
                <SidebarMenuItem icon={<BookUser />} label="Suppliers" path="/supplier" expanded={expanded}/>


            </div>


    );
};


export default Sidebar;
