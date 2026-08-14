import React, { useState } from "react";
import {
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  PlusCircle,
  List,
  Truck,
  FileText,
  Settings,
  BarChart3,
  CalendarDays,
  PhoneCall,
  AlertCircle,
  CheckSquare,
  Clock as ClockIcon,
  TrendingUp,
  Wrench,
  User as UserIcon,
  Users as UsersIcon2,
  Cog,
  ChartBarIcon,
  CalendarCheck,
  FileSpreadsheet,
  MapPin,
  Share2,
  ShieldAlert,
  MessageSquare,
  Calendar,
  HelpCircle,
  BookOpen,
  Repeat,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface StatusItem {
  title: string;
  value: number;
  icon: React.ElementType;
  color: StatusColor;
}

const statusData: StatusItem[] = [
  { title: "Booked", value: 12, icon: CalendarCheck, color: "blue" },
  { title: "Completed", value: 187, icon: CheckCircle, color: "green" },
  { title: "Pending", value: 23, icon: Clock, color: "yellow" },
  { title: "Rejected", value: 45, icon: XCircle, color: "red" },
];


// Replace the existing colorClasses with this type-safe version
const colorClasses: Record<string, {
  card: string;
  icon: string;
  value: string;
  bar: string;
  track: string;
}> = {
  blue: {
    card: "bg-blue-50 dark:bg-blue-950/30",
    icon: "bg-blue-600 text-white",
    value: "text-blue-600 dark:text-blue-400",
    bar: "bg-blue-600",
    track: "bg-blue-100 dark:bg-blue-900/50",
  },
  yellow: {
    card: "bg-amber-50 dark:bg-amber-950/30",
    icon: "bg-amber-500 text-white",
    value: "text-amber-500 dark:text-amber-400",
    bar: "bg-amber-500",
    track: "bg-amber-100 dark:bg-amber-900/50",
  },
  green: {
    card: "bg-green-50 dark:bg-green-950/30",
    icon: "bg-emerald-500 text-white",
    value: "text-emerald-500 dark:text-emerald-400",
    bar: "bg-emerald-500",
    track: "bg-green-100 dark:bg-green-900/50",
  },
  red: {
    card: "bg-red-50 dark:bg-red-950/30",
    icon: "bg-red-600 text-white",
    value: "text-red-600 dark:text-red-400",
    bar: "bg-red-600",
    track: "bg-red-100 dark:bg-red-900/50",
  },
};

// ============================================================
// DUMMY DATA
// ============================================================

const statData = [
  {
    title: "Total Purchase",
    value: "$500",
    icon: ShoppingCart,
    gradient: "from-info to-info-darker",
    text: "text-sky-100",
    iconBg: "bg-white/20",
  },
  {
    title: "Total Sales",
    value: "$1000",
    icon: DollarSign,
    gradient: "from-amber-400 to-orange-600",
    text: "text-amber-50",
    iconBg: "bg-white/20",
  },
  {
    title: "Total Present Stock",
    value: "1245",
    icon: Package,
    gradient: "from-pink-500 to-rose-500",
    text: "text-pink-100",
    iconBg: "bg-white/20",
  },
  {
    title: "Total Lead",
    value: "482",
    icon: List,
    gradient: "from-violet-500 to-indigo-600", // matches the other three nicely
    text: "text-violet-100",
    iconBg: "bg-white/20",
  },
];

// Follow-up data
const followUpData = [
  {
    title: "Today Follow-Ups",
    value: "0",
    subtitle: "+5 from Yesterday",
    icon: PhoneCall,
    color: "blue",
  },
  {
    title: "Pending",
    value: "0",
    subtitle: "100% of Total",
    icon: ClockIcon,
    color: "yellow",
  },
  {
    title: "Attend",
    value: "0",
    subtitle: "0% Completed",
    icon: CheckSquare,
    color: "green",
  },
  {
    title: "Delay",
    value: "0",
    subtitle: "Needs Attention",
    icon: AlertCircle,
    color: "red",
  },
];

// Mock data reflecting hourly slots as shown in your dashboard image
const salesPurchaseData = [
  { time: "2 am", purchases: 15000, sales: 10000 },
  { time: "4 am", purchases: 20000, sales: 10000 },
  { time: "6 am", purchases: 12000, sales: 8000 },
  { time: "8 am", purchases: 22000, sales: 10000 },
  { time: "10 am", purchases: 25000, sales: 15000 },
  { time: "12 pm", purchases: 20000, sales: 12000 },
  { time: "14 pm", purchases: 12000, sales: 10000 },
  { time: "16 pm", purchases: 20000, sales: 10000 },
  { time: "18 pm", purchases: 40000, sales: 15000 },
  { time: "20 pm", purchases: 10000, sales: 8000 },
  { time: "22 pm", purchases: 30000, sales: 18000 },
  { time: "24 pm", purchases: 20000, sales: 10000 },
];



const quickActions = [
  { title: "Veh. Item", icon: Package },
  { title: "Acc. Item", icon: Package },
  { title: "Lead", icon: FileText },
  { title: "Veh. Purchase", icon: ShoppingCart },
  { title: "Acc. Purchase", icon: Truck },
  { title: "Account", icon: Users },
  { title: "Contra", icon: Repeat },
  { title: "JV", icon: FileSpreadsheet },
  { title: "Dynamic", icon: BarChart3 },
  { title: "Tracking", icon: MapPin },
  { title: "Source", icon: Share2 },
  { title: "Due Insurance", icon: ShieldAlert },
  { title: "Feedback", icon: MessageSquare },
  { title: "Follow Up", icon: Calendar },
  { title: "Enquiry Status", icon: HelpCircle },
  { title: "Ledger", icon: BookOpen },
];

const categoryData = [
  { name: "Electronics", value: 35, percentage: 35 },
  { name: "Agriculture", value: 25, percentage: 25 },
  { name: "Spare Parts", value: 20, percentage: 20 },
  { name: "Implements", value: 10, percentage: 10 },
  { name: "Seeds", value: 5, percentage: 5 },
  { name: "Fertilizers", value: 5, percentage: 5 },
];

const COLORS = [
  "#3b82f6", // primary-500 - Blue
  "#60a5fa", // primary-400 - Light Blue
  "#93c5fd", // primary-300 - Lighter Blue
  "#2563eb", // primary-600 - Dark Blue
  "#1d4ed8", // primary-700 - Darker Blue
  "#818cf8", // indigo-400 - Purple Blue
];

// Service Info data
const serviceData = [
  {
    customer: "Rajesh Kumar",
    number: "+91 98765 43210",
    service: "Engine Repair",
    type: "Major",
    status: "Completed",
  },
  {
    customer: "Priya Sharma",
    number: "+91 87654 32109",
    service: "Oil Change",
    type: "Regular",
    status: "In Progress",
  },
  {
    customer: "Amit Singh",
    number: "+91 76543 21098",
    service: "Brake Replacement",
    type: "Urgent",
    status: "Pending",
  },
];

// Model Enquiry Data
const modelEnquiryData = [
  { name: "Mahindra 265 DI", enquiry: 45, hot: 18 },
  { name: "Swaraj 744 FE", enquiry: 38, hot: 12 },
  { name: "Eicher 380", enquiry: 52, hot: 20 },
  { name: "John Deere 5050", enquiry: 28, hot: 10 },
  { name: "New Holland 3630", enquiry: 33, hot: 15 },
];

// Source Enquiry Data
const sourceEnquiryData = [
  { name: "Website", enquiry: 120, hot: 45 },
  { name: "Showroom", enquiry: 85, hot: 30 },
  { name: "Phone Call", enquiry: 65, hot: 22 },
  { name: "WhatsApp", enquiry: 55, hot: 18 },
  { name: "Social Media", enquiry: 45, hot: 15 },
];

// Follow Ups Reminder Data
const followUpReminderData = [
  {
    leadId: "LEAD-001",
    name: "Rajesh Kumar",
    model: "Mahindra 265 DI",
    callTime: "10:30 AM",
    enquiryStatus: "Hot",
    status: "Pending",
  },
  {
    leadId: "LEAD-002",
    name: "Priya Sharma",
    model: "Swaraj 744 FE",
    callTime: "11:45 AM",
    enquiryStatus: "Warm",
    status: "In Progress",
  },
  {
    leadId: "LEAD-003",
    name: "Amit Singh",
    model: "Eicher 380",
    callTime: "02:15 PM",
    enquiryStatus: "Cold",
    status: "Completed",
  },
  {
    leadId: "LEAD-004",
    name: "Sneha Reddy",
    model: "John Deere 5050",
    callTime: "04:00 PM",
    enquiryStatus: "Hot",
    status: "Pending",
  },
];

// Sales Workshop Spare Team Leader Sales Executive Data
const salesData = [
  {
    name: "Rajesh Kumar",
    refNo: "QT-001",
    amount: "₹45,000",
    type: "Mahindra 265 DI",
  },
  {
    name: "Priya Singh",
    refNo: "QT-002",
    amount: "₹32,000",
    type: "Swaraj 744 FE",
  },
  {
    name: "Amit Patel",
    refNo: "QT-003",
    amount: "₹58,000",
    type: "Eicher 380",
  },
];

const workshopData = [
  {
    name: "Rajesh Kumar",
    refNo: "INV-001",
    amount: "₹5,000",
    type: "Engine Repair",
  },
  {
    name: "Priya Singh",
    refNo: "INV-002",
    amount: "₹3,200",
    type: "Oil Change",
  },
  {
    name: "Amit Patel",
    refNo: "INV-003",
    amount: "₹7,800",
    type: "Brake Service",
  },
];

const spareData = [
  {
    name: "Rajesh Kumar",
    refNo: "SPR-001",
    amount: "₹2,500",
    type: "Engine Oil",
  },
  {
    name: "Priya Singh",
    refNo: "SPR-002",
    amount: "₹1,800",
    type: "Air Filter",
  },
  {
    name: "Amit Patel",
    refNo: "SPR-003",
    amount: "₹3,200",
    type: "Brake Pads",
  },
];

const teamLeaderData = [
  {
    leadNo: "Lead-001",
    customer: "Customer A",
    employee: "Employee X",
    model: "Mahindra 265 DI",
  },
  {
    leadNo: "Lead-002",
    customer: "Customer B",
    employee: "Employee Y",
    model: "Swaraj 744 FE",
  },
  {
    leadNo: "Lead-003",
    customer: "Customer C",
    employee: "Employee Z",
    model: "Eicher 380",
  },
];

const salesExecutiveData = [
  {
    leadNo: "Lead-001",
    customer: "Customer A",
    employee: "Employee X",
    model: "Mahindra 265 DI",
  },
  {
    leadNo: "Lead-002",
    customer: "Customer B",
    employee: "Employee Y",
    model: "Swaraj 744 FE",
  },
  {
    leadNo: "Lead-003",
    customer: "Customer C",
    employee: "Employee Z",
    model: "Eicher 380",
  },
];

// Workshop List Data
const workshopListData = [
  {
    jobCardNo: "JC-001",
    jobCardDate: "2026-07-25",
    customerName: "Rajesh Kumar",
    mobileNo: "+91 98765 43210",
    model: "Mahindra 265 DI",
    serviceType: "Major Repair",
    workStart: "10:00 AM",
    workEnd: "02:30 PM",
    mechanicalWorkStartTime: "10:30 AM", // Add this
    mechanicalWorkEndTime: "02:00 PM", // Add this
    totalAmount: "₹12,500",
    statusReport: "Completed",
    warranty: "Yes",
  },
  {
    jobCardNo: "JC-002",
    jobCardDate: "2026-07-24",
    customerName: "Priya Sharma",
    mobileNo: "+91 87654 32109",
    model: "Swaraj 744 FE",
    serviceType: "Regular Service",
    workStart: "11:30 AM",
    workEnd: "01:45 PM",
    mechanicalWorkStartTime: "11:45 AM", // Add this
    mechanicalWorkEndTime: "01:30 PM", // Add this
    totalAmount: "₹5,200",
    statusReport: "In Progress",
    warranty: "No",
  },
  {
    jobCardNo: "JC-003",
    jobCardDate: "2026-07-24",
    customerName: "Amit Singh",
    mobileNo: "+91 76543 21098",
    model: "Eicher 380",
    serviceType: "Engine Overhaul",
    workStart: "09:00 AM",
    workEnd: "05:00 PM",
    mechanicalWorkStartTime: "09:30 AM", // Add this
    mechanicalWorkEndTime: "04:30 PM", // Add this
    totalAmount: "₹18,750",
    statusReport: "Pending",
    warranty: "Yes",
  },
];

// ============================================================
// STATUS COLOR HELPERS
// ============================================================

const statusColorMap = {
  yellow:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  orange:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  purple:
    "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
} as const;

type StatusColor = keyof typeof statusColorMap;

// ============================================================
// DATA TABLE COMPONENT
// ============================================================

const DataTable = ({
  title,
  icon: Icon,
  columns,
  data,
  showTotal = false,
  totalAmount = "",
  showToday = false,
}: {
  title: string;
  icon: any;
  columns: string[];
  data: any[];
  showTotal?: boolean;
  totalAmount?: string;
  showToday?: boolean;
}) => (
  <div className="flex h-[294px] flex-col overflow-hidden rounded-lg border border-gray-200/80 bg-white shadow-xs dark:border-gray-700 dark:bg-gray-800">
    {/* Blue Header Matching the Image */}
    <div className="flex flex-shrink-0 items-center justify-between bg-primary-600 px-4 py-3 text-white">
      <div className="flex items-center gap-2.5">
        <div className="rounded bg-white/20 p-1.5 text-white">
          <Icon className="size-4 text-white" />
        </div>
        <span className="text-[15px] font-bold tracking-wide">{title}</span>
      </div>
      {showTotal ? (
        <span className="text-sm font-semibold">Total Amt : {totalAmount}</span>
      ) : showToday ? ( // Change this line
        <button className="flex items-center gap-1.5 rounded bg-white px-3 py-1 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50">
          Today <span className="text-[9px]">▼</span>
        </button>
      ) : null}{" "}
      {/* Add this null case */}
    </div>

    {/* Table Area */}
    <div className="flex-1 overflow-y-auto">
      <table className="w-full text-sm">
        {/* Light Gray Table Header Row */}
        <thead className="sticky top-0 z-10 bg-gray-500/20 dark:bg-gray-700">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-3 py-3 text-center text-xs font-bold whitespace-nowrap text-gray-600 dark:text-gray-300"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
          {data.slice(0, 6).map((row, i) => (
            <tr
              key={i}
              className="transition-colors hover:bg-gray-50/80 dark:hover:bg-gray-700/30"
            >
              {Object.values(row).map((val: any, idx) => (
                <td
                  key={idx}
                  className="px-3 py-3.5 text-center text-xs whitespace-nowrap text-gray-600 dark:text-gray-400"
                >
                  {val}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-6 text-center text-sm text-gray-400 dark:text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
// ============================================================
// TOGGLE SWITCH COMPONENT
// ============================================================

const ToggleSwitch = ({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color: string;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-6 w-12 flex-shrink-0 rounded-full transition-all ${
        active ? color : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
          active ? "left-6.5" : "left-0.5"
        }`}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
};

// ============================================================
// SALES & PURCHASE CARD COMPONENT
// ============================================================

export const SalesPurchaseCard: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState("1Y");
  const periods = ["1D", "1W", "1M", "3M", "6M", "1Y"];

  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return `${value}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="bg-primary-600 px-6 py-4">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <div className="rounded-lg bg-white/20 p-2">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Sales & Purchase
            </h3>
          </div>
          <div className="flex max-w-full overflow-x-auto rounded-lg bg-white/10 p-0.5">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setActivePeriod(period)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activePeriod === period
                    ? "bg-white font-semibold text-primary-600 shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-6 pt-4 pb-2">
        <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3 dark:bg-gray-700/50">
          <div className="mb-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-400"></div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Total Purchase
            </span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">3K</p>
        </div>
        <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-3 dark:bg-gray-700/50">
          <div className="mb-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Total Sales
            </span>
          </div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">1K</p>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesPurchaseData}
              margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              barCategoryGap={16}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
                strokeOpacity={0.6}
              />
              <XAxis
                dataKey="time"
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatYAxis}
                domain={[0, 100000]}
                ticks={[0, 20000, 40000, 60000, 80000, 100000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="left"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  fontSize: "12px",
                  fontWeight: 500,
                  paddingLeft: "15px",
                  paddingBottom: "10px",
                }}
              />
              <Bar
                dataKey="sales"
                name="Total Sales"
                fill="#f97316"
                stackId="a"
                maxBarSize={32}
              />
              <Bar
                dataKey="purchases"
                name="Total Purchase"
                fill="#fed7aa"
                stackId="a"
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export const ShortcutCard: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="bg-primary-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/20 p-2">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Shortcut</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={index}
                className="group flex cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-100 bg-white p-3 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/50"
              >
                <div className="rounded-lg p-1.5 text-blue-600 transition-transform group-hover:scale-110 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-2 text-center text-[11px] leading-tight font-medium text-gray-700 dark:text-gray-300">
                  {action.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN DASHBOARD COMPONENT
// ============================================================

const Dashboard: React.FC = () => {
  const [modelToggle, setModelToggle] = useState<string>("hot");
  const [sourceToggle, setSourceToggle] = useState<string>("hot");

  const toggleOptions = [
    { id: "hot", label: "Hot", color: "bg-red-500" },
    { id: "warm", label: "Warm", color: "bg-orange-400" },
    { id: "cold", label: "Cold", color: "bg-blue-400" },
    { id: "booked", label: "Booked", color: "bg-purple-500" },
    { id: "alloted", label: "Alloted", color: "bg-indigo-500" },
    { id: "sold", label: "Sold", color: "bg-green-600" },
    { id: "regin", label: "Reg. Process", color: "bg-cyan-500" },
    { id: "lost", label: "Lost", color: "bg-gray-500" },
  ];

  const getValue = (row: any, toggle: string) => {
    switch (toggle) {
      case "hot":
        return row.hot;
      case "warm":
        return Math.floor(row.hot * 0.7);
      case "cold":
        return Math.floor(row.hot * 0.4);
      case "booked":
        return Math.floor(row.hot * 0.5);
      case "alloted":
        return Math.floor(row.hot * 0.6);
      case "sold":
        return Math.floor(row.hot * 0.3);
      case "regin":
        return Math.floor(row.hot * 0.2);
      case "lost":
        return Math.floor(row.hot * 0.1);
      default:
        return row.hot;
    }
  };

  const getPercentage = (row: any, toggle: string) => {
    const value = getValue(row, toggle);
    return Math.round((value / row.enquiry) * 100);
  };

  const getToggleLabel = (id: string) => {
    return toggleOptions.find((t) => t.id === id)?.label || "Hot";
  };

  const getToggleActiveColor = (id: string) => {
    const colors: Record<string, string> = {
      hot: "bg-red-500",
      warm: "bg-orange-400",
      cold: "bg-blue-400",
      booked: "bg-purple-500",
      alloted: "bg-indigo-500",
      sold: "bg-green-600",
      regin: "bg-cyan-500",
      lost: "bg-gray-500",
    };
    return colors[id] || "bg-gray-500";
  };

  const calculateTotal = (data: any[], toggle: string) => {
    const totalEnquiry = data.reduce((sum, row) => sum + row.enquiry, 0);
    const totalValue = data.reduce(
      (sum, row) => sum + getValue(row, toggle),
      0,
    );
    const totalPercentage = Math.round((totalValue / totalEnquiry) * 100);
    return { totalEnquiry, totalValue, totalPercentage };
  };

  const modelTotal = calculateTotal(modelEnquiryData, modelToggle);
  const sourceTotal = calculateTotal(sourceEnquiryData, sourceToggle);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen space-y-6 bg-gray-50 p-4 md:p-6 dark:bg-gray-900">
      {/* ===== HEADER ===== */}
      <div className="bg-primary-600 dark:from-primary-800 dark:to-primary-900 relative overflow-hidden rounded-2xl bg-gradient-to-r p-4 shadow-lg md:p-5">
        {/* Background decoration */}
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/5 blur-2xl"></div>

        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left Content */}
          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Welcome, Super Admin
            </h1>
          </div>

          {/* Financial Year Card */}
          <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-lg ring-1 ring-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:bg-gray-900">
            <div className="bg-primary-100 dark:bg-primary-900/40 rounded-full p-2">
              <CalendarDays className="text-primary-600 dark:text-primary-400 h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                01 Apr 2026 – 31 Mar 2027
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== STATISTICS CARDS ===== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
        {statData.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.gradient} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="flex items-start justify-between">
                <div className={`${stat.iconBg} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <div className="text-right">
                  <p className={`text-sm font-medium ${stat.text}`}>
                    {stat.title}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white md:text-3xl">
                    {stat.value}
                  </p>
                </div>
              </div>

              {/* Decorative Shape */}
              <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-white/10 blur-sm"></div>
            </div>
          );
        })}
      </div>
      {/* ===== STATUS CARDS ===== */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {statusData.map((status, index) => {
          const Icon = status.icon;
          return (
            <div
              key={index}
              className="rounded-xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {status.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {status.title}
                  </p>
                </div>
                <div
                  className={`rounded-lg p-2 ${statusColorMap[status.color]}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== FOLLOW-UP CARDS ===== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {followUpData.map((item, index) => {
          const Icon = item.icon;
          const colors = colorClasses[item.color];

          return (
            <div
              key={index}
              className={`${colors.card} rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              {/* Header */}
              <div className="mb-8 flex items-start justify-between">
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">
                  {item.title}
                </h3>

                <div className={`${colors.icon} rounded-full p-3 shadow-md`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              {/* Value */}
              <div className="text-center">
                <h2 className={`text-6xl font-bold ${colors.value}`}>
                  {item.value}
                </h2>

                <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                  {item.subtitle}
                </p>
              </div>

              {/* Progress */}
              <div className={`mt-8 h-2 rounded-full ${colors.track}`}>
                <div
                  className={`${colors.bar} h-2 rounded-full`}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== SALES & PURCHASE & SHORTCUT CARDS ===== */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <SalesPurchaseCard />
        <ShortcutCard />
      </div>

      {/* ===== TOP CATEGORIES ===== */}
      {/* ===== TOP CATEGORIES & SERVICE INFO - SIDE BY SIDE ===== */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        {/* Top Categories Card */}
        <div className="h-full overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary-600 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-white/20 p-1.5 text-white">
                <Package className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-white">Top Categories</h3>
            </div>
            <button className="flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50">
              Weekly <span className="text-[9px]">▼</span>
            </button>
          </div>

          {/* Chart + Side Legend */}
          <div className="grid grid-cols-1 items-center gap-4 p-6 sm:grid-cols-12">
            {/* Doughnut Chart */}
            <div className="flex justify-center sm:col-span-7 md:col-span-8">
              <div className="h-60 w-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={4}
                      cornerRadius={0}
                      startAngle={90}
                      endAngle={-270}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Column Stacked Items */}
            <div className="flex flex-col justify-center space-y-4 sm:col-span-5 md:col-span-4">
              {categoryData.slice(0, 3).map((item, index) => (
                <div key={item.name} className="flex flex-col items-start">
                  <div className="mb-0.5 flex items-center gap-1.5">
                    <span
                      className="h-3 w-1 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {item.value}
                    </span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Sales
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Statistics */}
          <div className="px-6 pb-6">
            <h4 className="mb-3 text-xs font-semibold text-gray-700 dark:text-gray-300">
              Category Statistics
            </h4>
            <div className="divide-y divide-gray-100 rounded-lg border border-gray-100 dark:divide-gray-700/60 dark:border-gray-700">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-700"></span>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Total Number Of Categories
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  698
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-orange-600"></span>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Total Number Of Products
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  7899
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Service Info Card */}
        <div className="h-full overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-800">
          {/* Blue Header */}
          <div className="flex items-center gap-3 bg-primary-600 px-5 py-3">
            <div className="rounded-lg bg-white/20 p-2 text-white">
              <Wrench className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-base font-bold text-white">Service Info</h3>
          </div>

          {/* Table Area - Make it fill remaining space */}
          <div
            className="overflow-x-auto"
            style={{ height: "calc(100% - 52px)" }}
          >
            <table className="w-full text-left text-xs">
              {/* Light Gray Header Row */}
              <thead className="bg-gray-500/20 whitespace-nowrap text-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
                <tr>
                  <th className="px-5 py-3 font-semibold">Customer Name</th>
                  <th className="px-5 py-3 font-semibold">Number</th>
                  <th className="px-5 py-3 font-semibold">Service</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {serviceData.map((item, index) => {
                  const statusColors = {
                    Completed: "bg-emerald-500 text-white",
                    "In Progress": "bg-blue-500 text-white",
                    Pending: "bg-[#fbbd23] text-white",
                  };

                  return (
                    <tr
                      key={index}
                      className="whitespace-nowrap transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
                    >
                      <td className="px-5 py-4 font-medium text-gray-800 dark:text-gray-200">
                        {item.customer}
                      </td>
                      <td className="px-5 py-4 text-gray-600 dark:text-gray-400">
                        {item.number}
                      </td>
                      <td className="px-5 py-4 text-gray-600 dark:text-gray-400">
                        {item.service}
                      </td>
                      <td className="px-5 py-4 text-gray-600 uppercase dark:text-gray-400">
                        {item.type}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-semibold shadow-2xs ${
                            statusColors[
                              item.status as keyof typeof statusColors
                            ] || "bg-gray-400 text-white"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* ===== MODEL WISE ENQUIRY & SOURCE WISE ENQUIRY ===== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Model Wise Enquiry */}
        <div className="flex h-[450px] flex-col overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800">
          <div className="flex flex-shrink-0 items-center gap-3 bg-primary-600 px-5 py-3">
            <h3 className="text-base font-bold text-white">Model Enquiries</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-gray-500/20 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2.5 text-center text-xs font-semibold tracking-wider text-black uppercase dark:text-gray-400">
                    Model
                  </th>
                  <th className="px-4 py-2.5 text-center text-xs font-semibold tracking-wider text-black uppercase dark:text-gray-400">
                    Enquiry
                  </th>
                  <th className="px-4 py-2.5 text-center text-xs font-semibold tracking-wider text-black uppercase dark:text-gray-400">
                    {getToggleLabel(modelToggle)} (%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {modelEnquiryData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2.5 text-center font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-300">
                      {item.enquiry}
                    </td>
                    <td className="px-4 py-2.5 text-center font-medium text-blue-600 dark:text-blue-400">
                      {getValue(item, modelToggle)} (
                      {getPercentage(item, modelToggle)}%)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex-shrink-0 border-t border-gray-200 bg-gray-500/20 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-700">
            <div className="grid grid-cols-3 text-center text-sm font-semibold">
              <div className="text-gray-900 dark:text-white">Total</div>
              <div className="text-gray-900 dark:text-white">
                {modelTotal.totalEnquiry}
              </div>
              <div className="text-blue-600 dark:text-blue-400">
                {modelTotal.totalValue} ({modelTotal.totalPercentage}%)
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50 p-2.5 dark:border-gray-700 dark:bg-gray-800">
            <div className="grid grid-cols-4 gap-1 lg:grid-cols-4">
              {toggleOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-center gap-1"
                >
                  <ToggleSwitch
                    active={modelToggle === option.id}
                    onClick={() => setModelToggle(option.id)}
                    label={option.label}
                    color={getToggleActiveColor(option.id)}
                  />
                  <span className="min-w-[20px] text-[9px] font-medium text-gray-700 lg:text-[10px] xl:text-xs dark:text-gray-300">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Source Wise Enquiry */}
        <div className="flex h-[450px] flex-col overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800">
          <div className="flex flex-shrink-0 items-center gap-3 bg-primary-600 px-5 py-3">
            <h3 className="text-base font-bold text-white">Source Enquiry</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-gray-500/20 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2.5 text-center text-xs font-semibold tracking-wider text-black uppercase dark:text-gray-400">
                    Source
                  </th>
                  <th className="px-4 py-2.5 text-center text-xs font-semibold tracking-wider text-black uppercase dark:text-gray-400">
                    Enquiry
                  </th>
                  <th className="px-4 py-2.5 text-center text-xs font-semibold tracking-wider text-black uppercase dark:text-gray-400">
                    {getToggleLabel(sourceToggle)} (%)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sourceEnquiryData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-2.5 text-center font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="px-4 py-2.5 text-center text-gray-600 dark:text-gray-300">
                      {item.enquiry}
                    </td>
                    <td className="px-4 py-2.5 text-center font-medium text-blue-600 dark:text-blue-400">
                      {getValue(item, sourceToggle)} (
                      {getPercentage(item, sourceToggle)}%)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex-shrink-0 border-t border-gray-200 bg-gray-500/20 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-700">
            <div className="grid grid-cols-3 text-center text-sm font-semibold">
              <div className="text-gray-900 dark:text-white">Total</div>
              <div className="text-gray-900 dark:text-white">
                {sourceTotal.totalEnquiry}
              </div>
              <div className="text-blue-600 dark:text-blue-400">
                {sourceTotal.totalValue} ({sourceTotal.totalPercentage}%)
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50 p-2.5 dark:border-gray-700 dark:bg-gray-800">
            <div className="grid grid-cols-4 gap-1 lg:grid-cols-4">
              {toggleOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-center gap-1"
                >
                  <ToggleSwitch
                    active={sourceToggle === option.id}
                    onClick={() => setSourceToggle(option.id)}
                    label={option.label}
                    color={getToggleActiveColor(option.id)}
                  />
                  <span className="min-w-[20px] text-[9px] font-medium text-gray-700 lg:text-[10px] xl:text-xs dark:text-gray-300">
                    {option.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== FOLLOW UPS REMINDER ===== */}
      <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-800">
        {/* Header - Changed to match Service Info style */}
        <div className="flex flex-shrink-0 items-center gap-3 bg-primary-600 px-5 py-3">
          <h3 className="text-base font-bold text-white">
            Follow Ups Reminder
          </h3>
        </div>

        {/* Table Area - Changed header row background */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-500/20 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300">
              <tr>
                <th className="px-5 py-3 font-semibold">Lead ID</th>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Model</th>
                <th className="px-5 py-3 font-semibold">Call Time</th>
                <th className="px-5 py-3 font-semibold">Enquiry Status</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {followUpReminderData.map((item, index) => {
                const enquiryStatusColors = {
                  Hot: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                  Warm: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
                  Cold: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                };
                const statusColors = {
                  Pending:
                    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                  "In Progress":
                    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                  Completed:
                    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                };
                return (
                  <tr
                    key={index}
                    className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-700/30"
                  >
                    <td className="px-5 py-4 font-medium text-gray-800 dark:text-gray-200">
                      {item.leadId}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-400">
                      {item.name}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-400">
                      {item.model}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-400">
                      {item.callTime}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold shadow-2xs ${
                          enquiryStatusColors[
                            item.enquiryStatus as keyof typeof enquiryStatusColors
                          ]
                        }`}
                      >
                        {item.enquiryStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold shadow-2xs ${
                          statusColors[item.status as keyof typeof statusColors]
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== SALES WORKSHOP SPARE TEAM LEADER SALES EXECUTIVE ===== */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DataTable
          title="Sales"
          icon={FileText}
          columns={["Name", "Quotation No", "Amount", "Type"]}
          data={salesData}
          showTotal={true}
          totalAmount="₹1,35,000"
        />
        <DataTable
          title="Workshop"
          icon={Wrench}
          columns={["Name", "Invoice No", "Amount", "Type"]}
          data={workshopData}
          showTotal={true}
          totalAmount="₹16,000"
        />
        <DataTable
          title="Spare"
          icon={Cog}
          columns={["Name", "Invoice No", "Amount", "Type"]}
          data={spareData}
          showToday={true} // Add this
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DataTable
          title="Team Leader"
          icon={UsersIcon2}
          columns={["Lead No", "Customer Name", "Employee Name", "Model"]}
          data={teamLeaderData}
          // No showToday prop needed
        />
        <DataTable
          title="Sales Executive"
          icon={UserIcon}
          columns={["Lead No", "Customer Name", "Employee Name", "Model"]}
          data={salesExecutiveData}
          // No showToday prop needed
        />
      </div>
      {/* ===== WORKSHOP LIST ===== */}
    <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-800">
  {/* Full-width Blue Banner Header */}
  <div className="bg-primary-600 px-6 py-3.5">
    <h3 className="text-base font-bold text-white">
      Workshop List
    </h3>
  </div>

  {/* Table Area */}
  <div className="overflow-x-auto">
    <table className="w-full text-left text-xs">
      {/* Light Gray Header Row */}
      <thead className="bg-gray-500/20 text-gray-800 dark:bg-gray-700/60 dark:text-gray-200">
        <tr className="whitespace-nowrap">
          <th className="px-4 py-3 font-semibold">Job Card No</th>
          <th className="px-4 py-3 font-semibold">Job Card Date</th>
          <th className="px-4 py-3 font-semibold">Customer Name</th>
          <th className="px-4 py-3 font-semibold">Mobile No</th>
          <th className="px-4 py-3 font-semibold">Model</th>
          <th className="px-4 py-3 font-semibold">Service Type</th>
          <th className="px-4 py-3 font-semibold">Mechanical Work Start Time</th>
          <th className="px-4 py-3 font-semibold">Mechanical Work End Time</th>
          <th className="px-4 py-3 font-semibold">Total Amount</th>
          <th className="px-4 py-3 font-semibold">Status Report</th>
          <th className="px-4 py-3 font-semibold">Warranty</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
        {workshopListData.map((item, index) => {
          const statusColors = {
            Completed: "bg-emerald-500 text-white",
            "In Progress": "bg-blue-500 text-white",
            Pending: "bg-[#fbbd23] text-white",
          };

          return (
            <tr
              key={index}
              className="whitespace-nowrap transition-colors hover:bg-gray-50/60 dark:hover:bg-gray-700/30"
            >
              <td className="px-4 py-3 font-normal text-gray-700 dark:text-gray-300">
                {item.jobCardNo}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                {item.jobCardDate}
              </td>
              <td className="px-4 py-3 font-medium uppercase text-gray-800 dark:text-gray-200">
                {item.customerName}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                {item.mobileNo}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                {item.model}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                {item.serviceType}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                {item.mechanicalWorkStartTime || item.workStart}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                {item.mechanicalWorkEndTime || item.workEnd}
              </td>
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                {item.totalAmount}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    statusColors[item.statusReport as keyof typeof statusColors] ||
                    "bg-gray-400 text-white"
                  }`}
                >
                  {item.statusReport}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    item.warranty === "Yes"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {item.warranty}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
};

export default Dashboard;
