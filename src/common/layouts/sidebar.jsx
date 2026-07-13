
import { SidebarContent } from "../components/sidebar/sidebar-content";

export function SideBar({onClose}){
    return(
       <SidebarContent onClose={onClose} />
    );
}