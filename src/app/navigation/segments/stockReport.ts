import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const stockReport: NavigationTree = {
  ...baseNavigationObj["stockReport"],
  childs: [
    {
      id: "stock_report.dynamicreport",
      type: "item",
      path: "/stock-report/dynamicreport",
      title: "Dynamic Report",
      icon: "stock_report.dynamicreport",
    },
    {
      id: "stock_report.insurance",
      type: "collapse",
      path: "/stock-report/insurance",
      title: "Insurance",
      transKey: "Insurance",
      icon: "stock_report.insurance",
      childs: [
        {
          id: "stock_report.insurance.dueinsurance",
          type: "item",
          path: "/stock-report/insurance/dueinsurance",
          title: "Due Insurance",
          transKey: "Due Insurance",
        },
      ],
    },

    {
      id: "stock_report.report",
      type: "collapse",
      path: "/stock-report/report",
      title: "Report",
      transKey: "Report",
      icon: "stock_report.report",
      childs: [
        {
          id: "stock_report.report.enquirysource",
          type: "item",
          path: "/stock-report/report/enquirysource",
          title: "Enquiry Source",
          transKey: "Enquiry Source",
        },
        {
          id: "stock_report.report.enquirystatus",
          type: "item",
          path: "/stock-report/report/enquirystatus",
          title: "Enquiry Status",
          transKey: "Enquiry Status",
        },
        {
          id: "stock_report.report.birthdayreport",
          type: "item",
          path: "/stock-report/report/birthdayreport",
          title: "Birthday Report",
          transKey: "Birthday Report",
        },
      ],
    },

    {
      id: "stock_report.analysis",
      type: "collapse",
      path: "/stock-report/analysis",
      title: "Analysis",
      transKey: "Analysis",
      icon: "stock_report.analysis",
      childs: [
        {
          id: "stock_report.analysis.feedbackactivity",
          type: "item",
          path: "/stock-report/analysis/feedbackactivity",
          title: "FeedBack Activity ",
          transKey: "FeedBack Activity ",
        },
        {
          id: "stock_report.analysis.hypothicationreport",
          type: "item",
          path: "/stock-report/analysis/hypothicationreport",
          title: "Hypothication Report",
          transKey: "Hypothication Report",
        },
        {
          id: "stock_report.analysis.insurancereport",
          type: "item",
          path: "/stock-report/analysis/insurancereport",
          title: "Insurance Report",
          transKey: "Insurance Report",
        },
         {
          id: "stock_report.analysis.exchangereport",
          type: "item",
          path: "/stock-report/analysis/exchangereport",
          title: "ExchangeReport",
          transKey: "Exchange Report",
        },
         {
          id: "stock_report.analysis.duepaymentreport",
          type: "item",
          path: "/stock-report/analysis/duepaymentreport",
          title: "Due Payment Report",
          transKey: "Due Payment Report",
        },
           {
          id: "stock_report.analysis.schemeregister",
          type: "item",
          path: "/stock-report/analysis/schemeregister",
          title: "Scheme Register",
          transKey: "Scheme Register",
        },
           {
          id: "stock_report.analysis.customertracking",
          type: "item",
          path: "/stock-report/analysis/customertracking",
          title: "Customer Tracking",
          transKey: "Customer Tracking",
        },
         {
          id: "stock_report.analysis.deliveryregister",
          type: "item",
          path: "/stock-report/analysis/deliveryregister",
          title: "Delivery Register ",
          transKey: "Delivery Register ",
        },
         {
          id: "stock_report.analysis.vehicleserialregister",
          type: "item",
          path: "/stock-report/analysis/vehicleserialregister",
          title: "Vehicle Serial Register",
          transKey: "Vehicle Serial Register",
        },
         {
          id: "stock_report.analysis.paymentregister",
          type: "item",
          path: "/stock-report/analysis/paymentregister",
          title: "Payment Register",
          transKey: "Payment Register",
        },
      ],
    },
  ],
};
