import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const brokerMaster: NavigationTree = {
  ...baseNavigationObj["brokerMaster"],
  childs: [
    {
      id: "brokerMaster.broker",
      type: "item",
      path: "/broker-master/broker",
      title: "Broker",
      icon: "brokerMaster.broker",
    },
    {
      id: "brokerMaster.stocktransfer",
      type: "item",
      path: "/broker-master/stocktransfer",
      title: "Vehicle Stock Transfer",
      icon: "brokerMaster.stocktransfer",
    },
    
  ],
};
