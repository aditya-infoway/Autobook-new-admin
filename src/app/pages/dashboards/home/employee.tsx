import React from "react";
import { Calendar, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { DatePicker } from "@/components/shared/form/Datepicker";

// ============================================================
// INTERFACES
// ============================================================

interface PerformanceItem {
  id: number;
  eName: string;
  role: string;
  lead?: number;
  bookingLead?: number;
  invoice?: number;
  sales?: number;
  booking?: number;
}

interface TopEmployee {
  id: number;
  employeeName: string;
  role: string;
  totalLead: number;
  hot: number;
  booking: number;
  sales: number;
  delivery: number;
  lost: number;
}

// ============================================================
// DUMMY DATA
// ============================================================

const topLeadPerformanceData: PerformanceItem[] = [
  { id: 1, eName: "Ankita Ghavanalkar", role: "Sales Executive", lead: 51 },
  { id: 2, eName: "Rohit Parab", role: "Sales Executive", lead: 40 },
  { id: 3, eName: "Rakesh Naik", role: "Sales Executive", lead: 31 },
];

const bookingPerformanceData: PerformanceItem[] = [
  {
    id: 1,
    eName: "Ankita Ghavanalkar",
    role: "Sales Executive",
    bookingLead: 27,
  },
  { id: 2, eName: "Rakesh Naik", role: "Sales Executive", bookingLead: 17 },
  { id: 3, eName: "Rohit Parab", role: "Sales Executive", bookingLead: 9 },
];

const topSalesPerformanceData: PerformanceItem[] = [
  {
    id: 1,
    eName: "Ankita Ghavanalkar",
    role: "Sales Executive",
    lead: 51,
    invoice: 19,
  },
  {
    id: 2,
    eName: "Rohit Parab",
    role: "Sales Executive",
    lead: 40,
    invoice: 3,
  },
  {
    id: 3,
    eName: "Rakesh Naik",
    role: "Sales Executive",
    lead: 31,
    invoice: 13,
  },
];

const topPerformanceData: PerformanceItem[] = [
  {
    id: 1,
    eName: "Ankita Ghavanalkar",
    role: "Sales Executive",
    sales: 19,
    booking: 27,
    lead: 51,
  },
  {
    id: 2,
    eName: "Rakesh Naik",
    role: "Sales Executive",
    sales: 13,
    booking: 17,
    lead: 31,
  },
  {
    id: 3,
    eName: "Rohit Parab",
    role: "Sales Executive",
    sales: 3,
    booking: 9,
    lead: 40,
  },
];

const topEmployeeData: TopEmployee[] = [
  {
    id: 1,
    employeeName: "Ankita Ghavanalkar",
    role: "Sales Executive",
    totalLead: 51,
    hot: 0,
    booking: 27,
    sales: 19,
    delivery: 0,
    lost: 0,
  },
  {
    id: 2,
    employeeName: "Rohit Parab",
    role: "Sales Executive",
    totalLead: 40,
    hot: 10,
    booking: 9,
    sales: 3,
    delivery: 0,
    lost: 1,
  },
  {
    id: 3,
    employeeName: "Rakesh Naik",
    role: "Sales Executive",
    totalLead: 31,
    hot: 1,
    booking: 17,
    sales: 13,
    delivery: 0,
    lost: 1,
  },
  {
    id: 4,
    employeeName: "tanisha kadam",
    role: "Sales Executive",
    totalLead: 17,
    hot: 2,
    booking: 4,
    sales: 4,
    delivery: 0,
    lost: 0,
  },
  {
    id: 5,
    employeeName: "mamta samant",
    role: "Sales Executive",
    totalLead: 12,
    hot: 0,
    booking: 6,
    sales: 5,
    delivery: 0,
    lost: 0,
  },
  {
    id: 6,
    employeeName: "Prakash Kudtarkar",
    role: "Sales Executive",
    totalLead: 8,
    hot: 0,
    booking: 1,
    sales: 1,
    delivery: 0,
    lost: 0,
  },
  {
    id: 7,
    employeeName: "SACHIN PARAB",
    role: "Sales Executive",
    totalLead: 5,
    hot: 0,
    booking: 3,
    sales: 3,
    delivery: 0,
    lost: 0,
  },
  {
    id: 8,
    employeeName: "Shri Vinayak Corporate",
    role: "Sales Executive",
    totalLead: 3,
    hot: 2,
    booking: 0,
    sales: 0,
    delivery: 0,
    lost: 0,
  },
  {
    id: 9,
    employeeName: "yash bidikar",
    role: "Sales Executive",
    totalLead: 1,
    hot: 0,
    booking: 0,
    sales: 0,
    delivery: 0,
    lost: 0,
  },
];

// ============================================================
// REUSABLE SMALL TABLE CARD COMPONENT
// ============================================================

interface TableCardProps {
  title: string;
  columns: string[];
  children: React.ReactNode;
}

const TableCard: React.FC<TableCardProps> = ({ title, columns, children }) => {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200/80 dark:border-dark-500 bg-white dark:bg-dark-700 shadow-2xs">
      {/* Header Bar */}
      <div className="bg-primary-600 dark:bg-primary-700 px-4 py-2.5">
        <h3 className="text-xs font-bold tracking-wide text-white uppercase">
          {title}
        </h3>
      </div>

      {/* Table Content */}
      <div className="min-h-[190px] overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs">
          <thead className="bg-gray-500/20 dark:bg-dark-600 text-black dark:text-gray-200">
            <tr className="border-b border-gray-300 dark:border-dark-500 font-bold tracking-wider uppercase">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`border-r border-gray-300 dark:border-dark-500 px-4 py-2 text-center ${
                    idx === columns.length - 1 ? "border-r-0" : ""
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            {React.Children.map(children, (child, rowIndex) => (
              <tr
                className={`border-b border-gray-200 dark:border-dark-600 hover:bg-gray-50/50 dark:hover:bg-dark-600/50 ${
                  rowIndex === React.Children.count(children) - 1
                    ? "border-b-0"
                    : ""
                }`}
              >
                {React.Children.map(
                  (child as any).props.children,
                  (cell, cellIndex) => (
                    <td
                      className={`border-r border-gray-200 dark:border-dark-600 px-4 py-2.5 text-center ${
                        cellIndex === (child as any).props.children.length - 1
                          ? "border-r-0"
                          : ""
                      }`}
                    >
                      {cell.props.children}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================
// MAIN EMPLOYEE DASHBOARD COMPONENT
// ============================================================

const Employee: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F4F6F9] dark:bg-dark-800 p-4 font-sans text-xs text-gray-800 dark:text-gray-100 md:p-6">
      {/* Header Bar */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-lg font-bold text-[#003399] dark:text-primary-400">
            Employee Dashboard
          </h1>
          <div className="mt-1 h-[2px] w-12 bg-[#003399] dark:bg-primary-400"></div>
        </div>

        {/* Date Filter Badge */}
      
 
  <DatePicker
    options={{
      mode: "range",
      dateFormat: "d-m-Y",
      defaultDate: ["2026-01-07", "2026-07-28"],
    }}
    placeholder="Select date range..."
    className="w-54"
  />

      </div>

      {/* ===== 2x2 GRID SMALL TABLES ===== */}
      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Top Lead Performance */}
        <TableCard title="Top Lead Performance" columns={["E Name", "Lead"]}>
          {topLeadPerformanceData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-600/50">
              <td className="px-4 py-2.5 text-center">
                <div className="font-medium text-gray-800 dark:text-gray-200">{item.eName}</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500">({item.role})</div>
              </td>
              <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                {item.lead}
              </td>
            </tr>
          ))}
        </TableCard>

        {/* Booking Performance */}
        <TableCard
          title="Booking Performance"
          columns={["E Name", "Booking Lead"]}
        >
          {bookingPerformanceData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-600/50">
              <td className="px-4 py-2.5 text-center">
                <div className="font-medium text-gray-800 dark:text-gray-200">{item.eName}</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500">({item.role})</div>
              </td>
              <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                {item.bookingLead}
              </td>
            </tr>
          ))}
        </TableCard>

        {/* Top Sales Performance */}
        <TableCard
          title="Top Sales Performance"
          columns={["E Name", "Lead", "Invoice"]}
        >
          {topSalesPerformanceData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-600/50">
              <td className="px-4 py-2.5 text-center">
                <div className="font-medium text-gray-800 dark:text-gray-200">{item.eName}</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500">({item.role})</div>
              </td>
              <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                {item.lead}
              </td>
              <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                {item.invoice}
              </td>
            </tr>
          ))}
        </TableCard>

        {/* Top Performance */}
        <TableCard
          title="Top Performance"
          columns={["E Name", "Sales", "Booking", "Lead"]}
        >
          {topPerformanceData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-600/50">
              <td className="px-4 py-2.5 text-center">
                <div className="font-medium text-gray-800 dark:text-gray-200">{item.eName}</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500">({item.role})</div>
              </td>
              <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                {item.sales}
              </td>
              <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                {item.booking}
              </td>
              <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                {item.lead}
              </td>
            </tr>
          ))}
        </TableCard>
      </div>

      {/* ===== FULL WIDTH TOP EMPLOYEE TABLE ===== */}
      <div className="overflow-hidden rounded-md border border-gray-200/80 dark:border-dark-500 bg-white dark:bg-dark-700 shadow-2xs">
        {/* Header Bar */}
        <div className="bg-primary-600 dark:bg-primary-700 px-4 py-2.5">
          <h3 className="text-xs font-bold tracking-wide text-white uppercase">
            Top Employee
          </h3>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead className="bg-gray-500/20 dark:bg-dark-600 text-gray-800 dark:text-gray-200">
              <tr className="border-b border-gray-300 dark:border-dark-500 font-bold whitespace-nowrap">
                <th className="border-r border-gray-300 dark:border-dark-500 px-4 py-2.5">
                  Employee Name
                </th>
                <th className="border-r border-gray-300 dark:border-dark-500 px-4 py-2.5">Role</th>
                <th className="border-r border-gray-300 dark:border-dark-500 px-4 py-2.5 text-center">
                  Total Lead
                </th>
                <th className="border-r border-gray-300 dark:border-dark-500 px-4 py-2.5 text-center">
                  Hot
                </th>
                <th className="border-r border-gray-300 dark:border-dark-500 px-4 py-2.5 text-center">
                  Booking
                </th>
                <th className="border-r border-gray-300 dark:border-dark-500 px-4 py-2.5 text-center">
                  Sales
                </th>
                <th className="border-r border-gray-300 dark:border-dark-500 px-4 py-2.5 text-center">
                  Delivery
                </th>
                <th className="border-r border-gray-300 dark:border-dark-500 px-4 py-2.5 text-center">
                  Lost
                </th>
                <th className="px-4 py-2.5 text-center">View</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {topEmployeeData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`whitespace-nowrap transition-colors hover:bg-gray-50/50 dark:hover:bg-dark-600/50 ${
                    index < topEmployeeData.length - 1
                      ? "border-b border-gray-200 dark:border-dark-600"
                      : ""
                  }`}
                >
                  <td className="border-r border-gray-200 dark:border-dark-600 px-4 py-2.5 font-medium text-gray-800 dark:text-gray-200">
                    {item.employeeName}
                  </td>
                  <td className="border-r border-gray-200 dark:border-dark-600 px-4 py-2.5 text-gray-600 dark:text-gray-400">
                    {item.role}
                  </td>
                  <td className="border-r border-gray-200 dark:border-dark-600 px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                    {item.totalLead}
                  </td>
                  <td className="border-r border-gray-200 dark:border-dark-600 px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                    {item.hot}
                  </td>
                  <td className="border-r border-gray-200 dark:border-dark-600 px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                    {item.booking}
                  </td>
                  <td className="border-r border-gray-200 dark:border-dark-600 px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                    {item.sales}
                  </td>
                  <td className="border-r border-gray-200 dark:border-dark-600 px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                    {item.delivery}
                  </td>
                  <td className="border-r border-gray-200 dark:border-dark-600 px-4 py-2.5 text-center text-gray-600 dark:text-gray-400">
                    {item.lost}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <button
                      type="button"
                      onClick={() => navigate("/dashboards/employee-lead")}
                      className="inline-flex h-9 w-12 cursor-pointer items-center justify-center rounded-md border border-gray-200 dark:border-dark-500 bg-white dark:bg-dark-600 shadow-2xs transition-colors hover:bg-gray-50 dark:hover:bg-dark-500 focus:outline-hidden"
                    >
                      <Eye className="h-5 w-5 text-gray-900 dark:text-gray-200" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;