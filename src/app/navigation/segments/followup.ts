import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const followup: NavigationTree = {
    ...baseNavigationObj["followup"],
    childs: [
        {
            id: "followup.account",
            type: "item",
            path: "/followup/todayfollowup",
            title: "Today Follow-up",
            icon: "followup.todayfollowup",
        },
        
    ],
};