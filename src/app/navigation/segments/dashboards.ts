import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const dashboards: NavigationTree = {
  ...baseNavigationObj["dashboards"],
  childs: [
    {
      id: "dashboards",
      type: "item",
      path: "/dashboards/home",
      title: "Dashboard ",
      icon: "enquiry.list",
    },
    {
      id: "inventory",
      type: "item",
      path: "/dashboards/inventory",
      title: "Inventory",
    },
    {
      id: "employee",
      type: "item",
      path: "/dashboards/employee",
      title: "Employee",
    },
 
  ],
};
