import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const salesMaster: NavigationTree = {
    ...baseNavigationObj["salesMaster"],
    childs: [
        {
            id: "salesMaster.salesregister",
            type: "item",
            path: "/sales-master/salesregister",
            title: "Sales Register",
            icon: "salesMaster.salesregister",
        },
        {
            id: "salesMaster.accessoriessales",
            type: "item",
            path: "/sales-master/accessoriessales",
            title: "Accessories Sales Register",
            icon: "salesMaster.accessoriessales",
        },
    ],
};