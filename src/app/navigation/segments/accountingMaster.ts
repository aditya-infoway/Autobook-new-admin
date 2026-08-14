import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

export const accountingMaster: NavigationTree = {
  ...baseNavigationObj["accountingMaster"],
  childs: [
    {
      id: "accounting_master.debitNote",
      type: "item",
      path: "/accounting-master/debit-note",
      title: "Debit Note",
      icon: "accounting_master.debitNote",
    },
    {
      id: "accounting_master.creditNote",
      type: "item",
      path: "/accounting-master/credit-note",
      title: "Credit Note",
      icon: "accounting_master.creditNote",
    },
    {
      id: "accounting_master.cashPayment",
      type: "item",
      path: "/accounting-master/cashpayment",
      title: "Cash Payment",
      icon: "accounting_master.cashPayment",
    },
    {
      id: "accounting_master.bankPayment",
      type: "item",
      path: "/accounting-master/bankpayment",
      title: "Bank Payment",
      icon: "accounting_master.bankPayment",
    },
    {
      id: "accounting_master.cashReceipt",
      type: "item",
      path: "/accounting-master/cashreceipt",
      title: "Cash Receipt",
      icon: "accounting_master.cashReceipt",
    },
    {
      id: "accounting_master.bankReceipt",
      type: "item",
      path: "/accounting-master/bankreceipt",
      title: "Bank Receipt",
      icon: "accounting_master.bankReceipt",
    },
    {
      id: "accounting_master.contra",
      type: "item",
      path: "/accounting-master/contra",
      title: "Contra",
      icon: "accounting_master.contra",
    },
    {
      id: "accounting_master.journalentries",
      type: "item",
      path: "/accounting-master/journalentries",
      title: "Journal Entries",
      icon: "accounting_master.journalentries",
    },

    {
      id: "accounting_master.cash-bankregister",
      type: "collapse",
      path: "/accounting-master/cash-bankregister",
      title: "Cash/Bank Register",
      transKey: "Cash/Bank Register",
      icon: "accounting_master.cash-bankregister",
      childs: [
        {
          id: "accounting_master.cash-bankregister.cashbook",
          type: "item",
          path: "/accounting-master/cash-bankregister/cashbook",
          title: "Cash Book",
          transKey: "Cash Book",
        },
        {
          id: "accounting_master.eventmaster.bankbook",
          type: "item",
          path: "/accounting-master/cash-bankregister/bankbook",
          title: "Bank Book",
          transKey: "Bank Book",
        },
      ],
    },

    {
      id: "accounting_master.booking",
      type: "collapse",
      path: "/accounting-master/booking",
      title: "Booking Register",
      transKey: "Booking Register",
      icon: "accounting_master.booking",
      childs: [
        {
          id: "accounting_master.booking.bookingbalance",
          type: "item",
          path: "/accounting-master/booking/bookingbalance",
          title: "Booking Balance",
          transKey: "BookingB alance",
        },
      ],
    },

    {
      id: "accounting_master.ledger",
      type: "collapse",
      path: "/accounting-master/ledger",
      title: "Ledger",
      transKey: "Ledger",
      icon: "accounting_master.ledger",
      childs: [
        {
          id: "accounting_master.ledger.ledgerreport",
          type: "item",
          path: "/accounting-master/ledger/ledgerreport",
          title: "Ledger Report",
          transKey: "Ledger Report",
        },
      ],
    },
  ],
};
