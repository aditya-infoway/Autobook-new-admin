import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const master: NavigationTree = {
  ...baseNavigationObj["master"],
  childs: [
    {
      id: "master.category",
      type: "item",
      path: "/master/category",
      title: "Category",
      transKey: "nav.master.category",
      icon: "master.category",
    },
     {
      id: "master.model",
      type: "item",
      path: "/master/model",
      title: "Model",
      icon: "master.model",
    },
    {
      id: "master.variant",
      type: "item",
      path: "/master/variant",
      title: "Variant",
      icon: "master.variant",
    },
    {
      id: "master.variantprice",
      type: "item",
      path: "/master/variantprice",
      title: "Variant Price",
      icon: "master.variantprice",
    },
    {
      id: "master.colour",
      type: "item",
      path: "/master/colour",
      title: "Colour",
      icon: "master.colour",
    },
    {
      id: "master.createitem",
      type: "item",
      path: "/master/createitem",
      title: "Create Item",
      icon: "master.createitem",
    },
    {
      id: "master.schemetype",
      type: "item",
      path: "/master/schemetype",
      title: "Scheme Type",
      icon: "master.schemetype",
    },
    {
      id: "master.scheme",
      type: "item",
      path: "/master/scheme",
      title: "Scheme",
      icon: "master.scheme",
    },
    {
      id: "master.service",
      type: "item",
      path: "/master/service",
      title: "Service",
      icon: "master.service",
    },
    {
      id: "master.exchangebonus",
      type: "item",
      path: "/master/exchangebonus",
      title: "Exchange Bonus",
      icon: "master.service",
    },
    // {
    //   id: "master.feedbackstatus",
    //   type: "item",
    //   path: "/master/feedbackstatus",
    //   title: "Feedback Status",
    //   icon: "master.service",
    // },
    {
      id: "master.city",
      type: "item",
      path: "/master/city",
      title: "City",
      icon: "master.city",
    },

      {
      id: "master.enquirysetting",
      type: "collapse",
      path: "/master/enquirysetting",
      title: "Enquiry Setting",
      transKey: "Enquiry Setting",
      icon: "master.enquirysetting",
      childs: [
        {
          id: "master.enquirysetting.enquirytype",
          type: "item",
          path: "/master/enquirysetting/enquirytype",
          title: "Enquiry Type",
          transKey: "Enquiry Type",
        },
        {
          id: "master.enquirysetting.enquirysource",
          type: "item",
          path: "/master/enquirysetting/enquirysource",
          title: " Enquiry Source",
          transKey: "Enquiry Source",
        },
        {
          id: "master.enquirysetting.profession",
          type: "item",
          path: "/master/enquirysetting/profession",
          title: "Profession",
          transKey: "Profession",
        },
        {
          id: "master.enquirysetting.banker",
          type: "item",
          path: "/master/enquirysetting/banker",
          title: "Banker",
          transKey: "Banker",
        },
         {
          id: "master.enquirysetting.finance",
          type: "item",
          path: "/master/enquirysetting/finance",
          title: "Finance",
          transKey: "Finance",
        },
      ],
    },
  
  
   
  ],
};
