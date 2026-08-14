import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const accessoriesMaster: NavigationTree = {
  ...baseNavigationObj["accessoriesMaster"],
  childs: [
    {
      id: "accessoriesMaster.accessoriesitem",
      type: "item",
      path: "/accessoriesMaster/accessoriesitem",
      title: "Accessories Item",
      transKey: "Accessories Item",
      icon: "accessoriesitem", 
    },
    {
      id: "accessoriesMaster.barcodemanager",
      type: "item",
      path: "/accessoriesMaster/barcodemanager",
      title: "Barcode Manager",
      icon: "barcodemanager", 
    },
    {
      id: "accessoriesMaster.purchaseaccessories",
      type: "item",
      path: "/accessoriesMaster/purchaseaccessories",
      title: "Purchase Accessories",
      icon: "purchaseaccessories", 
    },
    {
      id: "accessoriesMaster.accessoriesstockreport",
      type: "item",
      path: "/accessoriesMaster/accessoriesstockreport",
      title: "Accessories Stock Report ",
      icon: "accessoriesstockreport ", 
    },
  ],
};
