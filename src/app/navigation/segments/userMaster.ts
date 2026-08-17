import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const userMaster: NavigationTree = {
    ...baseNavigationObj["userMaster"],
    childs: [
        {
            id: "user_master.account",
            type: "item",
            path: "/user-master/account",
            title: "Create Account",
            icon: "user_master.createAccount",
        },
        {
            id: "user_master.createEmployee",
            type: "item",
            path: "/user-master/createemployee",
            title: "Create Employee",
            icon: "user_master.createEmployee",
        },
         {
            id: "user_master.warehouse",
            type: "item",
            path: "/user-master/warehouse",
            title: "Warehouse",
            icon: "user_master.warehouse",
        },
       
    ],
};