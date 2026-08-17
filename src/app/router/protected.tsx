import { Navigate, RouteObject } from "react-router";

import AuthGuard from "@/middleware/AuthGuard";
import { DynamicLayout } from "../layouts/DynamicLayout";
import { AppLayout } from "../layouts/AppLayout";

/**
 * Protected routes configuration
 * These routes require authentication to access
 * Uses AuthGuard middleware to verify user authentication
 */
const protectedRoutes: RouteObject = {
  id: "protected",
  Component: AuthGuard,
  children: [
    // The dynamic layout supports both the main layout and the sideblock.
    {
      Component: DynamicLayout,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboards/home" />,
        },
        {
          path: "dashboards",
          children: [
            {
              index: true,
              element: <Navigate to="/dashboards/home" />,
            },
            {
              path: "home",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/dashboards/home/dashboard")
                ).default,
              }),
            },
            {
              path: "dashboard",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/dashboards/home/dashboard")
                ).default,
              }),
            },
            {
              path: "inventory",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/dashboards/home/inventory")
                ).default,
              }),
            },
            {
              path: "employee",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/dashboards/home/employee")
                ).default,
              }),
            },
            {
              path: "employee-lead", // Add this route
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/dashboards/home/EmployeeLead")
                ).default,
              }),
            },
          ],
        },

        {
          path: "master",
          children: [
            {
              index: true,
              element: <Navigate to="/master/category" replace />,
            },
            {
              path: "category",
              lazy: async () => ({
                Component: (await import("@/app/pages/master/category"))
                  .default,
              }),
            },
            {
              path: "model",
              lazy: async () => ({
                Component: (await import("@/app/pages/master/model")).default,
              }),
            },
            {
              path: "variant",
              lazy: async () => ({
                Component: (await import("@/app/pages/master/variant")).default,
              }),
            },
            {
              path: "variantprice",
              lazy: async () => ({
                Component: (await import("@/app/pages/master/variantprice"))
                  .default,
              }),
            },
            {
              path: "colour",
              lazy: async () => ({
                Component: (await import("@/app/pages/master/colour")).default,
              }),
            },
            {
              path: "createitem",
              lazy: async () => ({
                Component: (await import("@/app/pages/master/createitem"))
                  .default,
              }),
            },
            {
              path: "schemetype",
              lazy: async () => ({
                Component: (await import("@/app/pages/master/schemetype"))
                  .default,
              }),
            },
            {
              path: "scheme",
              lazy: async () => ({
                Component: (await import("@/app/pages/master/scheme")).default,
              }),
            },
            {
              path: "service",
              lazy: async () => ({
                Component: (await import("@/app/pages/master/service")).default,
              }),
            },
            {
              path: "exchangebonus",
              lazy: async () => ({
                Component: (await import("@/app/pages/master/exchangebonus"))
                  .default,
              }),
            },
            {
              path: "city",
              lazy: async () => ({
                Component: (await import("@/app/pages/master/city")).default,
              }),
            },

            // ===========================
            // Enquiry Setting
            // ===========================
            {
              path: "enquirysetting",
              children: [
                {
                  index: true,
                  element: <Navigate to="enquirytype" replace />,
                },
                {
                  path: "enquirytype",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/master/enquirysetting/enquirytype")
                    ).default,
                  }),
                },
                {
                  path: "enquirysource",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/master/enquirysetting/enquirysource")
                    ).default,
                  }),
                },
                {
                  path: "profession",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/master/enquirysetting/profession")
                    ).default,
                  }),
                },
                {
                  path: "banker",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/master/enquirysetting/banker")
                    ).default,
                  }),
                },
                {
                  path: "finance",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/master/enquirysetting/finance")
                    ).default,
                  }),
                },
              ],
            },
          ],
        },

        {
          path: "accessoriesmaster",
          children: [
            {
              index: true,
              element: (
                <Navigate to="/accessoriesmaster/accessoriesitem" replace />
              ),
            },

            {
              path: "accessoriesitem",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accessoriesmaster/accessoriesitem")
                ).default,
              }),
            },

            {
              path: "barcodemanager",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accessoriesmaster/barcodemanager")
                ).default,
              }),
            },

            {
              path: "purchaseaccessories",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accessoriesmaster/purchaseaccessories")
                ).default,
              }),
            },

            {
              path: "addpurchasebill",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accessoriesmaster/addpurchasebill")
                ).default,
              }),
            },

            {
              path: "accessoriespurchaseitem",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accessoriesmaster/accessoriespurchaseitem")
                ).default,
              }),
            },

            {
              path: "accessoriesstockreport",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accessoriesmaster/accessoriesstockreport")
                ).default,
              }),
            },

            {
              path: "stockreport/:id",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accessoriesmaster/stockreport")
                ).default,
              }),
            },
            {
              path: "fullstock/:id",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accessoriesmaster/fullstock")
                ).default,
              }),
            },
          ],
        },
        {
          path: "accounting-master",
          children: [
            {
              index: true,
              element: <Navigate to="/accounting-master/debit-note" replace />,
            },

            {
              path: "debit-note",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accounting-master/debit-note")
                ).default,
              }),
            },

            {
              path: "credit-note",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accounting-master/credit-note")
                ).default,
              }),
            },

            {
              path: "cashpayment",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accounting-master/cashpayment")
                ).default,
              }),
            },

            {
              path: "bankpayment",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accounting-master/bankpayment")
                ).default,
              }),
            },

            {
              path: "cashreceipt",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accounting-master/cashreceipt")
                ).default,
              }),
            },

            {
              path: "bankreceipt",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accounting-master/bankreceipt")
                ).default,
              }),
            },

            {
              path: "contra",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accounting-master/contra")
                ).default,
              }),
            },

            {
              path: "journalentries",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/accounting-master/journalentries")
                ).default,
              }),
            },
            {
              path: "cash-bankregister",
              children: [
                {
                  index: true,
                  element: <Navigate to="cashbook" replace />,
                },
                {
                  path: "cashbook",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/accounting-master/cash-bankregister/cashbook")
                    ).default,
                  }),
                },
                {
                  path: "bankbook",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/accounting-master/cash-bankregister/bankbook")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "booking",
              children: [
                {
                  index: true,
                  element: <Navigate to="bookingbalance" replace />,
                },
                {
                  path: "bookingbalance",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/accounting-master/booking/bookingbalance")
                    ).default,
                  }),
                },
                {
                  path: "paymenthistory/:id",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/accounting-master/booking/paymenthistory")
                    ).default,
                  }),
                },
              ],
            },

            {
              path: "ledger",
              children: [
                {
                  index: true,
                  element: <Navigate to="ledgerreport" replace />,
                },
                {
                  path: "ledgerreport",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/accounting-master/ledger/ledgerreport")
                    ).default,
                  }),
                },
                {
                  path: "ledgerdetail",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/accounting-master/ledger/ledgerdetail")
                    ).default,
                  }),
                },
              ],
            },
          ],
        },

        {
          path: "followup",
          children: [
            {
              index: true,
              element: <Navigate to="/followup/todayfollowup" replace />,
            },
            {
              path: "todayfollowup",
              lazy: async () => ({
                Component: (await import("@/app/pages/followup/todayfollowup"))
                  .default,
              }),
            },
            {
              path: "followuphistory/:id",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/followup/followuphistory")
                ).default,
              }),
            },
            {
              path: "follow-up/:id",
              lazy: async () => ({
                Component: (await import("@/app/pages/followup/follow-up"))
                  .default,
              }),
            },
          ],
        },

        {
          path: "purchase-master",
          children: [
            {
              index: true,
              element: (
                <Navigate to="/purchase-master/purchaseregister" replace />
              ),
            },

            {
              path: "purchaseregister",
              children: [
                {
                  index: true,
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/purchase-master/purchaseregister")
                    ).default,
                  }),
                },
                {
                  path: "addpurchaseregister",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/purchase-master/addpurchaseregister")
                    ).default,
                  }),
                },
                {
                  path: "purchaseitem/:id",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/purchase-master/purchaseitem")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "purchaseorder",
              children: [
                {
                  index: true,
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/purchase-master/purchaseorder")
                    ).default,
                  }),
                },
                {
                  path: "purchaseorderlist/:id",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/purchase-master/purchaseorderlist")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "purchaseimport",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/purchase-master/purchaseimport")
                ).default,
              }),
            },

            {
              path: "goodscontrol",
              children: [
                {
                  index: true,
                  element: <Navigate to="inventory" replace />,
                },
                {
                  path: "inventory",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/purchase-master/goodscontrol/inventory")
                    ).default,
                  }),
                },
                {
                  path: "allotedinventory",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/purchase-master/goodscontrol/allotedinventory")
                    ).default,
                  }),
                },
                {
                  path: "soldoutstock",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/purchase-master/goodscontrol/soldoutstock")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "stocktransfer",
              children: [
                {
                  index: true,
                  element: <Navigate to="vehiclestocktransfer" replace />,
                },
                {
                  path: "vehiclestocktransfer",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/purchase-master/stocktransfer/vehiclestocktransfer")
                    ).default,
                  }),
                },
                {
                  path: "addvehiclestocktransfer",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/purchase-master/stocktransfer/addvehiclestocktransfer")
                    ).default,
                  }),
                },
              ],
            },
          ],
        },
        {
          path: "sales-master",
          children: [
            {
              index: true,
              element: <Navigate to="/sales-master/salesregister" replace />,
            },

            {
              path: "salesregister",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/sales-master/salesregister")
                ).default,
              }),
            },

            {
              path: "salesregisterdeatil/:id",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/sales-master/salesregisterdeatil")
                ).default,
              }),
            },

            {
              path: "accessoriessales",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/sales-master/accessoriessales")
                ).default,
              }),
            },
          ],
        },
        {
          path: "stock-report",
          children: [
            {
              index: true,
              element: <Navigate to="/stock-report/dynamicreport" replace />,
            },
            {
              path: "dynamicreport",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/stock-report/dynamicreport")
                ).default,
              }),
            },
            {
              path: "totalenquiry/:id",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/stock-report/totalenquiry")
                ).default,
              }),
            },
            {
              path: "pending/:id",
              lazy: async () => ({
                Component: (await import("@/app/pages/stock-report/pending"))
                  .default,
              }),
            },
            {
              path: "lost/:id",
              lazy: async () => ({
                Component: (await import("@/app/pages/stock-report/lost"))
                  .default,
              }),
            },
            {
              path: "alloted/:id",
              lazy: async () => ({
                Component: (await import("@/app/pages/stock-report/alloted"))
                  .default,
              }),
            },
            {
              path: "sold/:id",
              lazy: async () => ({
                Component: (await import("@/app/pages/stock-report/sold"))
                  .default,
              }),
            },
            {
              path: "regiprocess/:id",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/stock-report/regiprocess")
                ).default,
              }),
            },

            {
              path: "insurance",
              children: [
                {
                  index: true,
                  element: (
                    <Navigate
                      to="/stock-report/insurance/dueinsurance"
                      replace
                    />
                  ),
                },
                {
                  path: "dueinsurance",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/insurance/dueinsurance")
                    ).default,
                  }),
                },
              ],
            },

            {
              path: "report",
              children: [
                {
                  index: true,
                  element: (
                    <Navigate to="/stock-report/report/enquirysource" replace />
                  ),
                },
                {
                  path: "enquirysource",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/report/enquirysource")
                    ).default,
                  }),
                },
                {
                  path: "enquirystatus",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/report/enquirystatus")
                    ).default,
                  }),
                },
                {
                  path: "birthdayreport",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/report/birthdayreport")
                    ).default,
                  }),
                },
              ],
            },

            {
              path: "analysis",
              children: [
                {
                  index: true,
                  element: (
                    <Navigate
                      to="/stock-report/analysis/feedbackactivity "
                      replace
                    />
                  ),
                },
                {
                  path: "feedbackactivity",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/analysis/feedbackactivity")
                    ).default,
                  }),
                },
                {
                  path: "hypothicationreport",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/analysis/hypothicationreport")
                    ).default,
                  }),
                },
                {
                  path: "insurancereport",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/analysis/insurancereport")
                    ).default,
                  }),
                },
                {
                  path: "exchangereport",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/analysis/exchangereport")
                    ).default,
                  }),
                },
                {
                  path: "duepaymentreport",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/analysis/duepaymentreport")
                    ).default,
                  }),
                },
                {
                  path: "schemeregister",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/analysis/schemeregister")
                    ).default,
                  }),
                },
                {
                  path: "customertracking",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/analysis/customertracking")
                    ).default,
                  }),
                },
                {
                  path: "trackingdetails/:id",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/analysis/trackingdetails")
                    ).default,
                  }),
                },
                {
                  path: "deliveryregister",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/analysis/deliveryregister")
                    ).default,
                  }),
                },
                {
                  path: "vehicleserialregister",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/analysis/vehicleserialregister")
                    ).default,
                  }),
                },
                {
                  path: "paymentregister",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/stock-report/analysis/paymentregister")
                    ).default,
                  }),
                },
              ],
            },
          ],
        },
        // In your route configuration file
        {
          path: "user-master",
          children: [
            {
              index: true,
              element: <Navigate to="/user-master/account" replace />,
            },
            {
              path: "account",
              lazy: async () => ({
                Component: (await import("@/app/pages/user-master/account"))
                  .default,
              }),
            },
            {
              path: "createaccount",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/user-master/createaccount")
                ).default,
              }),
            },
            {
              path: "createemployee",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/user-master/createemployee")
                ).default,
              }),
            },
            {
              path: "warehouse",
              lazy: async () => ({
                Component: (await import("@/app/pages/user-master/warehouse"))
                  .default,
              }),
            },
          ],
        },
        {
          path: "broker-master",
          children: [
            {
              index: true,
              element: <Navigate to="/broker-master/broker" replace />,
            },
            {
              path: "broker",
              lazy: async () => ({
                Component: (await import("@/app/pages/broker-master/broker"))
                  .default,
              }),
            },
            {
              path: "stocktransfer",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/broker-master/stocktransfer")
                ).default,
              }),
            },
            {
              path: "addstocktransfer",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/broker-master/addstocktransfer")
                ).default,
              }),
            },
          ],
        },
        {
          path: "integration",
          children: [
            {
              index: true,
              element: <Navigate to="/integration-master/marketing" replace />,
            },
            {
              path: "marketing",
              lazy: async () => ({
                Component: (await import("@/app/pages/integration/marketing"))
                  .default,
              }),
            },
             {
              path: "templateeditor",
              lazy: async () => ({
                Component: (await import("@/app/pages/integration/templateeditor"))
                  .default,
              }),
            },
          ],
        },
        {
          path: "lead-master",
          children: [
            {
              index: true,
              element: <Navigate to="/lead-master/leadbuilder" replace />,
            },
            {
              path: "leadbuilder",
              lazy: async () => ({
                Component: (await import("@/app/pages/lead-master/leadbuilder"))
                  .default,
              }),
            },
            {
              path: "follow-up/:id",
              lazy: async () => ({
                Component: (await import("@/app/pages/lead-master/follow-up"))
                  .default,
              }),
            },
            {
              path: "createorder/:id",
              lazy: async () => ({
                Component: (await import("@/app/pages/lead-master/createorder"))
                  .default,
              }),
            },
            {
              path: "leadbookingreport",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/lead-master/leadbookingreport")
                ).default,
              }),
            },
            {
              path: "bookingrefund",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/lead-master/bookingrefund")
                ).default,
              }),
            },
            {
              path: "oldquoterecord",
              children: [
                {
                  index: true,
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/lead-master/oldquoterecord")
                    ).default,
                  }),
                },
                {
                  path: "oldquotehistory/:id",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/lead-master/oldquotehistory")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "testdrive",
              children: [
                {
                  index: true,
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/lead-master/testdrive")
                    ).default,
                  }),
                },
                {
                  path: "testdrivedetails/:id",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/lead-master/testdrivedetails")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "eventmaster",
              children: [
                {
                  index: true,
                  element: <Navigate to="createevent" replace />,
                },
                {
                  path: "createevent",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/lead-master/eventmaster/createevent")
                    ).default,
                  }),
                },
                {
                  path: "eventregister",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/lead-master/eventmaster/eventregister")
                    ).default,
                  }),
                },
                {
                  path: "eventregisterdetails/:id",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/lead-master/eventmaster/eventregisterdetails")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "allot",
              children: [
                {
                  index: true,
                  element: <Navigate to="vehicleincharge" replace />,
                },
                {
                  path: "vehicleincharge",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/lead-master/allot/vehicleincharge")
                    ).default,
                  }),
                },

                {
                  path: "accessoriesallot",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/lead-master/allot/accessoriesallot")
                    ).default,
                  }),
                },

                {
                  path: "accessoriesallotdetail/:id",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/lead-master/allot/accessoriesallotdetail")
                    ).default,
                  }),
                },
                {
                  path: "vehicleverify",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/lead-master/allot/vehicleverify")
                    ).default,
                  }),
                },
              ],
            },

            {
              path: "delivery",
              children: [
                {
                  index: true,
                  element: <Navigate to="deliveryreport" replace />,
                },
                {
                  path: "deliveryreport",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/lead-master/delivery/deliveryreport")
                    ).default,
                  }),
                },
              ],
            },
          ],
        },
      ],
    },
    // The app layout supports only the main layout. Avoid using it for other layouts.
    {
      Component: AppLayout,
      children: [
        {
          path: "settings",
          lazy: async () => ({
            Component: (await import("@/app/pages/settings/Layout")).default,
          }),
          children: [ 
            {
              index: true,
              element: <Navigate to="/settings/general" />,
            },
            {
              path: "general",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/settings/sections/General")
                ).default,
              }),
            },
            {
              path: "appearance",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/settings/sections/Appearance")
                ).default,
              }),
            },
          ],
        },
      ],
    },
  ],
};

export { protectedRoutes };
