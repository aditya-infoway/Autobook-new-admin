import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const integration: NavigationTree = {
  ...baseNavigationObj["integration"],
  childs: [
    {
      id: "integration.marketing",
      type: "item",
      path: "/integration/marketing",
      title: "Marketing",
      icon: "integration.marketing",
    },
  ],
};
