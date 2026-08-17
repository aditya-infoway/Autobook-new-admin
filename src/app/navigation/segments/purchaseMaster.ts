import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const purchaseMaster: NavigationTree = {
  ...baseNavigationObj["purchaseMaster"],
  childs: [
    {
      id: "purchase_master.purchaseRegister",
      type: "item",
      path: "/purchase-master/purchaseregister",
      title: "Purchase Register",
      icon: "purchase_master.purchaseRegister",
    },
    {
      id: "purchase_master.purchaseOrder",
      type: "item",
      path: "/purchase-master/purchaseorder",
      title: "Purchase Order",
      icon: "purchase_master.purchaseOrder",
    },
     {
      id: "purchase_master.purchaseimport",
      type: "item",
      path: "/purchase-master/purchaseimport",
      title: "Purchase Import",
      icon: "purchase_master.purchaseimport",
    },


          {
      id: "purchase_master.goodscontrol",
      type: "collapse",
      path: "/purchase-master/goodscontrol",
      title: "Goods Control",
      transKey: "Goods Control",
      icon: "master.goodscontrol",
      childs: [
        {
          id: "purchase_master.goodscontrol.inventory",
          type: "item",
          path: "/purchase-master/goodscontrol/inventory",
          title: "Inventory",
          transKey: "Inventory",
        },
        {
          id: "purchase_master.goodscontrol.allotedinventory",
          type: "item",
          path: "/purchase-master/goodscontrol/allotedinventory",
          title: " Alloted Inventory",
          transKey: "Alloted Inventory",
        },
        {
          id: "purchase_master.goodscontrol.soldoutstock",
          type: "item",
          path: "/purchase-master/goodscontrol/soldoutstock",
          title: "Sold Out Stock",
          transKey: "Sold Out Stock",
        },
        // {
        //   id: "purchase_master.goodscontrol.chassisapprovedrequest",
        //   type: "item",
        //   path: "/purchase-master/goodscontrol/chassisapprovedrequest",
        //   title: "Chassis Approved Request",
        //   transKey: "Chassis Approved Request",
        // },
        
      ],
    },
     {
      id: "purchase_master.stocktransfer",
      type: "collapse",
      path: "/purchase-master/stocktransfer",
      title: "Stock Transfer",
      transKey: "Stock Transfer",
      icon: "master.stocktransfer",
      childs: [
        {
          id: "purchase_master.stocktransfer.vehiclestocktransfer",
          type: "item",
          path: "/purchase-master/stocktransfer/vehiclestocktransfer",
          title: "Vehicle Stock Transfer",
          transKey: "Vehicle Stock Transfer",
        },
       
      ],
    },
  ],
};