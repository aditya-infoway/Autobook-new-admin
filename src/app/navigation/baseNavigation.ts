import { NavigationTree } from "@/@types/navigation";
import { followup } from "./segments/followup";

/**
 * Object containing the base navigation items for the application.
 * This object serves as a centralized configuration for main navigation elements.
 */
export const baseNavigationObj: Record<string, NavigationTree> = {
  dashboards: {
    id: "dashboards",
    type: "item",
    path: "/dashboards",
    title: "Dashboard",
    transKey: "nav.dashboards.dashboards",
    icon: "dashboards",
  },

  master: {
    id: "master",
    type: "collapse",
    path: "/master",
    title: "Master",
    transKey: "nav.master.master",
    icon: "master",
  },

  accessoriesMaster: {
    id: "accessoriesMaster",
    type: "collapse",
    path: "/accessoriesMaster",
    title: "Accessories Master",
    transKey: "Accessories Master",
    icon: "accessoriesMaster",
  },
    leadMaster: {
    id: "leadMaster",
    type: "collapse", 
    path: "/lead-master",
    title: "Lead Master",
    icon: "leadMaster",
  },



  accountingMaster: {
    id: "accountingMaster",
    type: "collapse",
    path: "/accounting-master",
    title: "Accounting Master",
    icon: "accountingMaster",
  },
  purchaseMaster: {
    id: "purchaseMaster",
    type: "collapse",
    path: "/purchase-master",
    title: "Purchase Master",
    icon: "purchaseMaster",
  },
   salesMaster: {
    id: "salesMaster",
    type: "collapse",
    path: "/sales-master",
    title: "Sales Master",
    icon: "salesMaster",
  },
  stockReport: {
    id: "stockReport",
    type: "collapse",
    path: "/stock-report",
    title: "Reporting",
    icon: "stockReport",
  },
  userMaster: {
    id: "userMaster",
    type: "collapse",
    path: "/user-master",
    title: "User Master",
    icon: "userMaster",
  },

   brokerMaster: {
    id: "brokerMaster",
    type: "collapse",
    path: "/broker-master",
    title: "Broker Master",
    icon: "brokerMaster",
  },

   followup: {
    id: "followup",
    type: "collapse",
    path: "/followup",
    title: "Follow-up",
    icon: "followup",
  },

    integration: {
    id: "integration",
    type: "collapse",
    path: "/integration",
    title: "Integration",
    icon: "integration",
  },

  logout: {
    id: "logout",
    type: "item",
    path: "/login",
    title: "Logout",
    transKey: "nav.logout",
    icon: "logout",
  },
};

/**
 * Array of navigation items derived from baseNavigationObj.
 * This array format is used for rendering the navigation menu in the application.
 */
export const baseNavigation: NavigationTree[] = Array.from(
  Object.values(baseNavigationObj),
);