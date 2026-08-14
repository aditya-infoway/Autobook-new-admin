import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const leadMaster: NavigationTree = {
  ...baseNavigationObj["leadMaster"],
  childs: [
    {
      id: "leadMaster.leadbuilder",
      type: "item",
      path: "/lead-master/leadbuilder",
      title: "Lead Builder ",
      icon: "leadbuilder",
    },
    {
      id: "leadMaster.leadbookingreport",
      type: "item",
      path: "/lead-master/leadbookingreport",
      title: "Lead Booking Report ",
      icon: "leadbookingreport",
    },
    {
      id: "leadMaster.bookingrefund",
      type: "item",
      path: "/lead-master/bookingrefund",
      title: "Booking Refund",
      icon: "bookingrefund",
    },
    {
      id: "leadMaster.oldquoterecord",
      type: "item",
      path: "/lead-master/oldquoterecord",
      title: "Old Quote Record ",
      icon: "oldquoterecord",
    },
    {
      id: "leadMaster.testdrive",
      type: "item",
      path: "/lead-master/testdrive",
      title: "Test Drive ",
      icon: "testdrive",
    },

    {
      id: "leadMaster.eventmaster",
      type: "collapse",
      path: "/master/eventmaster",
      title: "Event Master",
      transKey: "Event Master",
      icon: "leadmaster.eventmaster",
      childs: [
        {
          id: "leadMaster.eventmaster.createevent",
          type: "item",
          path: "/lead-master/eventmaster/createevent",
          title: "Create Event",
          transKey: "Create Event",
        },
        {
          id: "leadMaster.eventmaster.eventregister",
          type: "item",
          path: "/lead-master/eventmaster/eventregister",
          title: "Event Register",
          transKey: "Event Register",
        },
      ],
    },

    {
      id: "leadMaster.allot",
      type: "collapse",
      path: "//lead-master/allot",
      title: "Allot",
      transKey: "Allot",
      icon: "leadmaster.allot",
      childs: [
        {
          id: "leadMaster.allot.vehicleincharge",
          type: "item",
          path: "/lead-master/allot/vehicleincharge",
          title: "Vehicle Incharge",
          transKey: "Vehicle Incharge",
        },
        {
          id: "leadMaster.allot.accessoriesallot",
          type: "item",
          path: "/lead-master/allot/accessoriesallot",
          title: "Accessories Allot",
          transKey: "Accessories Allot",
        },
        {
          id: "leadMaster.allot.vehicleverify",
          type: "item",
          path: "/lead-master/allot/vehicleverify",
          title: "Vehicle Verify",
          transKey: "Vehicle Verify",
        },
      ],
    },

    {
      id: "leadMaster.delivery",
      type: "collapse",
      path: "/master/delivery",
      title: "Delivery",
      transKey: "Delivery",
      icon: "leadmaster.delivery",
      childs: [
        {
          id: "leadMaster.delivery.deliveryreport",
          type: "item",
          path: "/lead-master/delivery/deliveryreport",
          title: "Delivery Report",
          transKey: "Delivery Report",
        },
      ],
    },
  ],
};
