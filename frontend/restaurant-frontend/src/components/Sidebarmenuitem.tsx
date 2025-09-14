import React, {JSX} from "react";
import { Link } from "react-router-dom";

//create prop
interface Props {
    icon: JSX.Element;
    label: string;
    path: string;
    expanded: boolean;
}

const SidebarMenuItem: React.FC<Props> = ({ icon, label, path, expanded }) => {
    return (
        <Link to={path} className="d-flex align-items-center p-2 text-decoration-none text-dark">
            <div style={{ minWidth: "30px" }}>{icon}</div>
            {expanded && <span className="ms-2">{label}</span>}
        </Link>
    );
};

export default SidebarMenuItem;
