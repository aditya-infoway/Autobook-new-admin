import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  XMarkIcon,
  CheckIcon,
  PlusIcon,
  ArrowLeftIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { Input, Button } from "@/components/ui";
import { Listbox } from "@/components/shared/form/StyledListbox";
import { DatePicker } from "@/components/shared/form/Datepicker";
import { Combobox } from "@/components/shared/form/Combobox";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import emptyStateImage from "@/assets/not_found.png";
  import { Country, State, City } from "country-state-city";
import Select from "react-select";

// Static Data
const partyOptions = [
  { id: "1", name: "ABC Suppliers", mobile: "9876543210" },
  { id: "2", name: "XYZ Traders", mobile: "8765432109" },
  { id: "3", name: "MNO Enterprises", mobile: "7654321098" },
];

const vehicleOptions = [
  {
    id: 1,
    itemName: "Tractor Model A",
    model: "Model X1",
    itemCode: "TR-001",
    colour: "Red",
    shortName: "TRA",
    hsnCode: "8701",
    taxSlab: "18",
    typeOfFuel: "Diesel",
    fuelCapacity: "50L",
    purchasePriceNoGST: 450000,
    purchasePriceTaxable: 531000,
  },
  {
    id: 2,
    itemName: "Tractor Model B",
    model: "Model X2",
    itemCode: "TR-002",
    colour: "Blue",
    shortName: "TRB",
    hsnCode: "8701",
    taxSlab: "18",
    typeOfFuel: "Diesel",
    fuelCapacity: "60L",
    purchasePriceNoGST: 520000,
    purchasePriceTaxable: 613600,
  },
];

const termsOptions = [
  { label: "Credit", value: "Credit" },
  { label: "Cash", value: "Cash" },
  { label: "Bank", value: "Bank" },
];

const locationOptions = [
  { label: "Main Branch", value: "Main Branch" },
  { label: "North Branch", value: "North Branch" },
  { label: "South Branch", value: "South Branch" },
];

const paymentModeOptions = [
  { value: "NEFT", label: "NEFT" },
  { value: "RTGS", label: "RTGS" },
  { value: "IMPS", label: "IMPS" },
  { value: "CHEQUE", label: "CHEQUE" },
  { value: "UPI", label: "UPI" },
  { value: "CARD", label: "CARD" },
];

const groupOptions = [
  { value: "Supplier", label: "Supplier" },
  { value: "Sundry Creditors", label: "Sundry Creditors" },
  { value: "Sundry Creditor (internal)", label: "Sundry Creditor (internal)" },
];

const drCrOptions = [
  { value: "Dr", label: "Dr" },
  { value: "Cr", label: "Cr" },
];

const bankAccounts = [
  { id: "1", name: "HDFC Bank - Current Account" },
  { id: "2", name: "ICICI Bank - Savings Account" },
  { id: "3", name: "SBI - Current Account" },
];

const cashAccounts = [
  { id: "1", name: "Cash Account - Main" },
  { id: "2", name: "Cash Account - Petty" },
];

export default function AddPurchaseRegister() {
  const navigate = useNavigate();

  // State
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [terms, setTerms] = useState("Credit");
  const [partyId, setPartyId] = useState("");
  const [billNo] = useState("P/26-27/001");
  const [purchaseBillNo, setPurchaseBillNo] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchaseLocation, setPurchaseLocation] = useState("Main Branch");
  const [dueDate, setDueDate] = useState("");
  const [narration, setNarration] = useState("");
  const [cashAccount, setCashAccount] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [draft, setDraft] = useState({
    item: "",
    itemCode: "",
    color: "",
    chassisNo: "",
    engineNo: "",
    qty: 1,
    ratePer: "",
    gstPercent: "18",
    amount: "",
  });
  const [freightCharge, setFreightCharge] = useState("");
  const [insurance, setInsurance] = useState("");
  const [otherCharge, setOtherCharge] = useState("");
  const [roundAmount, setRoundAmount] = useState("");
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [bankDetailsModalOpen, setBankDetailsModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [countryCode, setCountryCode] = useState("");
const [stateCode, setStateCode] = useState("");

  const [bankDetails, setBankDetails] = useState({
    paymentMode: "UPI",
    chequeNo: "",
    chequeDate: "",
    clearDate: "",
    narration: "",
  });

const [accountForm, setAccountForm] = useState({
  accountName: "",
  mobile: "",
  group: "",
  openingBalance: "",
  drCr: "CR",
  country: "",
  countryCode: "", // Keep this for country selection
  state: "",
  stateCode: "", // This is the state ISO code
  district: "",
  city: "",
  address: "",
  gstNo: "",
});


// Add these state variables




// Add state options
// Country options
const countryOptions = useMemo(() => {
  return Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));
}, []);

// State options - uses countryCode
const stateOptions = useMemo(() => {
  if (!accountForm.countryCode) return [];
  return State.getStatesOfCountry(accountForm.countryCode).map((s) => ({
    value: s.isoCode,
    label: s.name,
  }));
}, [accountForm.countryCode]);

// City options - uses countryCode and stateCode
const cityOptions = useMemo(() => {
  if (!accountForm.countryCode || !accountForm.stateCode) return [];
  return City.getCitiesOfState(
    accountForm.countryCode,
    accountForm.stateCode
  ).map((c) => ({
    value: c.name,
    label: c.name,
  }));
}, [accountForm.countryCode, accountForm.stateCode]);

// Add custom react-select styles
const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "transparent",
    borderColor: state.isFocused
      ? "var(--color-primary-600)"
      : "var(--color-gray-300)",
    boxShadow: state.isFocused ? "0 0 0 1px var(--color-primary-600)" : "none",
    minHeight: "42px",
    "&:hover": {
      borderColor: "var(--color-primary-500)",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "var(--color-dark-700)",
    border: "1px solid var(--color-primary-600)",
    borderRadius: "12px",
    overflow: "hidden",
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "var(--color-primary-600)"
      : state.isFocused
        ? "var(--color-primary-500)"
        : "var(--color-dark-700)",
    color: "#fff",
    cursor: "pointer",
  }),
};

  // Derived totals
  const totalQuantity = rows.reduce((sum, r) => sum + Number(r.qty || 0), 0);
  const totalPurchasePrice = rows.reduce(
    (sum, r) => sum + Number(r.ratePer) * Number(r.qty || 1),
    0
  );
  const freightNum = Number(freightCharge) || 0;
  const insuranceNum = Number(insurance) || 0;
  const otherNum = Number(otherCharge) || 0;
  const roundNum = Number(roundAmount) || 0;
  const freightInsuranceOther = freightNum + insuranceNum + otherNum;
  const newTaxableValue = totalPurchasePrice + freightInsuranceOther;
  const grandTotal = newTaxableValue + roundNum;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleAddRow = () => {
    if (!draft.item.trim()) {
      alert("Please enter Item Name");
      return;
    }
    setRows([...rows, { ...draft, id: Date.now().toString(), saved: true }]);
    setDraft({
      item: "",
      itemCode: "",
      color: "",
      chassisNo: "",
      engineNo: "",
      qty: 1,
      ratePer: "",
      gstPercent: "18",
      amount: "",
    });
  };

  const handleRemoveRow = (id: string) => {
    setRows(rows.filter((r) => r.id !== id));
  };

  const handleVehicleSelect = (vehicle: any) => {
    setDraft({
      item: vehicle.itemName,
      itemCode: vehicle.itemCode,
      color: vehicle.colour,
      chassisNo: "",
      engineNo: "",
      qty: 1,
      ratePer: String(vehicle.purchasePriceNoGST),
      gstPercent: vehicle.taxSlab,
      amount: String(vehicle.purchasePriceTaxable),
    });
    setVehicleModalOpen(false);
  };

  const handleSave = () => {
    if (!partyId) {
      alert("Please select Party Name");
      return;
    }
    if (rows.length === 0) {
      alert("Please add at least one item");
      return;
    }
    if (terms === "Cash" && !cashAccount) {
      alert("Please select Cash Account");
      return;
    }
    if (terms === "Bank" && !bankAccount) {
      alert("Please select Bank Account");
      return;
    }
    alert("Purchase saved successfully!");
    navigate("/purchase/tractor");
  };

  const handleBack = () => {
    navigate("/purchase-master/purchaseregister");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 md:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-lg font-bold text-primary-600 dark:text-primary-400">
            Add Purchase Register
          </h1>
          <div className="mt-1 h-[2px] w-12 bg-primary-500" />
        </div>
        <button
          onClick={handleBack}
          className="flex cursor-pointer items-center gap-1.5 rounded bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-primary-700"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>
      </div>

      {/* Form Fields */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Top Fields */}
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date
            </label>
            <DatePicker
              value={date}
              onChange={(selectedDates: Date[]) => {
                const val = selectedDates[0];
                setDate(val?.toISOString()?.split("T")?.[0] || "");
              }}
              placeholder="Select date..."
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Terms
            </label>
            <Listbox
              data={termsOptions}
              value={termsOptions.find((t) => t.value === terms) || termsOptions[0]}
              onChange={(val: any) => setTerms(val.value)}
              displayField="label"
            />
          </div>

          {terms === "Cash" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cash Account
              </label>
              <Combobox
                data={cashAccounts}
                value={cashAccounts.find((acc) => acc.id === cashAccount) || null}
                onChange={(val: any) => setCashAccount(val.id)}
                displayField="name"
                searchFields={["name"]}
                placeholder="Search Cash Account"
              />
            </div>
          )}

          {terms === "Bank" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bank Account
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Combobox
                    data={bankAccounts}
                    value={bankAccounts.find((acc) => acc.id === bankAccount) || null}
                    onChange={(val: any) => setBankAccount(val.id)}
                    displayField="name"
                    searchFields={["name"]}
                    placeholder="Search Bank Account"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setBankDetailsModalOpen(true)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-300 text-blue-600 hover:bg-gray-50 dark:border-gray-600 dark:text-blue-400 dark:hover:bg-gray-700"
                >
                  <BuildingOffice2Icon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Party Name
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Combobox
                  data={partyOptions}
                  value={partyOptions.find((x) => x.id === partyId) || null}
                  onChange={(val: any) => setPartyId(val.id)}
                  displayField="name"
                  searchFields={["name", "mobile"]}
                  placeholder="Search Party"
                />
              </div>
              <button
                type="button"
                onClick={() => setAccountModalOpen(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-300 text-xl text-blue-600 hover:bg-gray-50 dark:border-gray-600 dark:text-blue-400 dark:hover:bg-gray-700"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bill No.
            </label>
            <Input value={billNo} readOnly className="w-full bg-gray-50 dark:bg-gray-700" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Purchase Bill No
            </label>
            <Input
              placeholder="Enter purchase bill no"
              value={purchaseBillNo}
              onChange={(e) => setPurchaseBillNo(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Purchase Date
            </label>
            <DatePicker
              value={purchaseDate}
              onChange={(selectedDates: Date[]) => {
                const val = selectedDates[0];
                setPurchaseDate(val?.toISOString()?.split("T")?.[0] || "");
              }}
              placeholder="Select date..."
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Purchase Location
            </label>
            <Listbox
              data={locationOptions}
              value={locationOptions.find((l) => l.value === purchaseLocation) || locationOptions[0]}
              onChange={(val: any) => setPurchaseLocation(val.value)}
              displayField="label"
            />
          </div>

          {terms === "Credit" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Due Date
              </label>
              <DatePicker
                value={dueDate}
                onChange={(selectedDates: Date[]) => {
                  const val = selectedDates[0];
                  setDueDate(val?.toISOString()?.split("T")?.[0] || "");
                }}
                placeholder="Select date..."
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Narration
            </label>
            <Input
              placeholder="Enter narration"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Items Table */}
        <div className="p-4 pt-0">
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <Table hoverable className="w-full text-left text-sm">
              <THead className="bg-gray-100 dark:bg-gray-700">
                <Tr>
                  <Th className="px-3 py-2 text-center">#</Th>
                  <Th className="px-3 py-2">Item Name</Th>
                  <Th className="px-3 py-2">Item Code</Th>
                  <Th className="px-3 py-2">Colour</Th>
                  <Th className="px-3 py-2">Chassis No</Th>
                  <Th className="px-3 py-2">Engine No</Th>
                  <Th className="px-3 py-2 text-center">Qty</Th>
                  <Th className="px-3 py-2 text-right">Rate</Th>
                  <Th className="px-3 py-2 text-center">GST %</Th>
                  <Th className="px-3 py-2 text-right">Amount</Th>
                  <Th className="px-3 py-2 text-center">Action</Th>
                </Tr>
              </THead>
              <TBody>
                {/* Draft Row */}
                <Tr>
                  <Td className="px-3 py-2 text-center">
                    <button
                      onClick={() => setVehicleModalOpen(true)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded bg-primary-500 text-white hover:bg-primary-600"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </Td>
                  <Td className="px-3 py-2">
                    <Input
                      placeholder="Item Name"
                      value={draft.item}
                      onChange={(e) => setDraft({ ...draft, item: e.target.value })}
                      className="w-full border-0 p-0 text-sm"
                    />
                  </Td>
                  <Td className="px-3 py-2">
                    <Input
                      placeholder="Code"
                      value={draft.itemCode}
                      onChange={(e) => setDraft({ ...draft, itemCode: e.target.value })}
                      className="w-full border-0 p-0 text-sm"
                    />
                  </Td>
                  <Td className="px-3 py-2">
                    <Input
                      placeholder="Colour"
                      value={draft.color}
                      onChange={(e) => setDraft({ ...draft, color: e.target.value })}
                      className="w-full border-0 p-0 text-sm"
                    />
                  </Td>
                  <Td className="px-3 py-2">
                    <Input
                      placeholder="Chassis"
                      value={draft.chassisNo}
                      onChange={(e) => setDraft({ ...draft, chassisNo: e.target.value })}
                      className="w-full border-0 p-0 text-sm"
                    />
                  </Td>
                  <Td className="px-3 py-2">
                    <Input
                      placeholder="Engine"
                      value={draft.engineNo}
                      onChange={(e) => setDraft({ ...draft, engineNo: e.target.value })}
                      className="w-full border-0 p-0 text-sm"
                    />
                  </Td>
                  <Td className="px-3 py-2 text-center">
                    <Input
                      type="number"
                      min={1}
                      value={draft.qty}
                      onChange={(e) => setDraft({ ...draft, qty: Number(e.target.value) })}
                      className="w-16 border-0 p-0 text-center text-sm"
                    />
                  </Td>
                  <Td className="px-3 py-2 text-right">
                    <Input
                      placeholder="Rate"
                      value={draft.ratePer}
                      onChange={(e) => setDraft({ ...draft, ratePer: e.target.value })}
                      className="w-24 border-0 p-0 text-right text-sm"
                    />
                  </Td>
                  <Td className="px-3 py-2 text-center">
                    <Input
                      placeholder="GST"
                      value={draft.gstPercent}
                      onChange={(e) => setDraft({ ...draft, gstPercent: e.target.value })}
                      className="w-16 border-0 p-0 text-center text-sm"
                    />
                  </Td>
                  <Td className="px-3 py-2 text-right">
                    <Input
                      placeholder="Amount"
                      value={draft.amount}
                      onChange={(e) => setDraft({ ...draft, amount: e.target.value })}
                      className="w-24 border-0 p-0 text-right text-sm"
                    />
                  </Td>
                  <Td className="px-3 py-2 text-center">
                    <button
                      onClick={handleAddRow}
                      disabled={!draft.item.trim()}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded ${
                        draft.item.trim()
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "cursor-not-allowed bg-gray-300 text-gray-500"
                      }`}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </button>
                  </Td>
                </Tr>

                {/* Saved Rows */}
                {rows.map((row, index) => (
                  <Tr key={row.id} className="border-t border-gray-200 dark:border-gray-700">
                    <Td className="px-3 py-2 text-center font-medium text-gray-500">
                      {index + 1}
                    </Td>
                    <Td className="px-3 py-2 font-medium text-gray-900 dark:text-white">
                      {row.item}
                    </Td>
                    <Td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                      {row.itemCode}
                    </Td>
                    <Td className="px-3 py-2">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="inline-block h-3 w-3 rounded-full border border-gray-300"
                          style={{ backgroundColor: row.color || "#ccc" }}
                        />
                        {row.color}
                      </span>
                    </Td>
                    <Td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-400">
                      {row.chassisNo}
                    </Td>
                    <Td className="px-3 py-2 font-mono text-gray-600 dark:text-gray-400">
                      {row.engineNo}
                    </Td>
                    <Td className="px-3 py-2 text-center font-semibold text-gray-900 dark:text-white">
                      {row.qty}
                    </Td>
                    <Td className="px-3 py-2 text-right text-gray-700 dark:text-gray-300">
                      ₹{Number(row.ratePer).toLocaleString()}
                    </Td>
                    <Td className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">
                      {row.gstPercent}%
                    </Td>
                    <Td className="px-3 py-2 text-right font-semibold text-gray-900 dark:text-white">
                      ₹{Number(row.ratePer * row.qty).toLocaleString()}
                    </Td>
                    <Td className="px-3 py-2 text-center">
                      <button
                        onClick={() => handleRemoveRow(row.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </Td>
                  </Tr>
                ))}

                {rows.length === 0 && (
                  <Tr>
                    <Td colSpan={11} className="py-8 text-center text-gray-400 dark:text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <img
                          src={emptyStateImage}
                          alt="No items added"
                          className="max-h-32 w-auto opacity-60"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              const emoji = document.createElement("div");
                              emoji.className = "text-5xl opacity-60";
                              emoji.textContent = "📦";
                              parent.insertBefore(emoji, parent.firstChild);
                            }
                          }}
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          No items added yet. Click{" "}
                          <span className="font-semibold text-primary-600">+</span> to add items.
                        </span>
                      </div>
                    </Td>
                  </Tr>
                )}
              </TBody>
            </Table>
          </div>

          {/* Totals */}
          <div className="mt-3 flex flex-wrap justify-between gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <span>
              Total Quantity:{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                {totalQuantity}
              </span>
            </span>
            <span>
              Total Amount:{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalPurchasePrice)}
              </span>
            </span>
          </div>
        </div>

        {/* Charges & Summary */}
        <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-5">
          {/* Charges */}
          <div className="space-y-3 lg:col-span-3">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Additional Charges
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
                    Freight Charge
                  </label>
                  <Input
                    placeholder="Enter freight"
                    value={freightCharge}
                    onChange={(e) => setFreightCharge(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
                    Insurance
                  </label>
                  <Input
                    placeholder="Enter insurance"
                    value={insurance}
                    onChange={(e) => setInsurance(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
                    Other Charge
                  </label>
                  <Input
                    placeholder="Enter other charge"
                    value={otherCharge}
                    onChange={(e) => setOtherCharge(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">
                    Round Amount
                  </label>
                  <Input
                    placeholder="Enter round amount"
                    value={roundAmount}
                    onChange={(e) => setRoundAmount(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-800/50">
              <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Bill Summary
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-gray-200/60 pb-2 dark:border-gray-700/60">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Value</span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {formatCurrency(totalPurchasePrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200/60 pb-2 dark:border-gray-700/60">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Freight + Insurance + Other
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {formatCurrency(freightInsuranceOther)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200/60 pb-2 dark:border-gray-700/60">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Taxable Value</span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {formatCurrency(newTaxableValue)}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-blue-600/10 p-2 dark:bg-blue-500/20">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    Grand Total
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center p-4 pt-0">
          <Button color="primary" onClick={handleSave} className="min-w-[200px]">
            Save Purchase
          </Button>
        </div>
      </div>

      {/* Vehicle Modal */}
      {vehicleModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setVehicleModalOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-full max-w-4xl transform bg-white shadow-2xl dark:bg-gray-800">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                <h2 className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  Select Vehicle
                </h2>
                <button
                  onClick={() => setVehicleModalOpen(false)}
                  className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="p-2 text-left">#</th>
                        <th className="p-2 text-left">Item Name</th>
                        <th className="p-2 text-left">Model</th>
                        <th className="p-2 text-left">Code</th>
                        <th className="p-2 text-left">Colour</th>
                        <th className="p-2 text-left">HSN</th>
                        <th className="p-2 text-left">GST</th>
                        <th className="p-2 text-right">Price (No GST)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicleOptions.map((v) => (
                        <tr key={v.id} className="border-t border-gray-200 dark:border-gray-700">
                          <td className="p-2">
                            <button
                              onClick={() => handleVehicleSelect(v)}
                              className="inline-flex h-6 w-6 items-center justify-center rounded bg-green-600 text-white hover:bg-green-700"
                            >
                              ✓
                            </button>
                          </td>
                          <td className="p-2 font-medium">{v.itemName}</td>
                          <td className="p-2">{v.model}</td>
                          <td className="p-2">{v.itemCode}</td>
                          <td className="p-2">{v.colour}</td>
                          <td className="p-2">{v.hsnCode}</td>
                          <td className="p-2">{v.taxSlab}%</td>
                          <td className="p-2 text-right">
                            ₹{v.purchasePriceNoGST.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    {/* Bank Details Modal */}
{bankDetailsModalOpen && (
  <div className="fixed inset-0 z-50 overflow-hidden">
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setBankDetailsModalOpen(false)}
    />
    <div className="absolute top-0 right-0 h-full w-full max-w-md transform bg-white shadow-2xl dark:bg-gray-800">
      <div className="flex h-full flex-col">
        {/* Header with primary color */}
        <div className="bg-primary-500 flex items-center justify-between px-5 py-4">
          <h2 className="text-lg font-semibold text-white">
            Bank Details
          </h2>
          <button
            onClick={() => setBankDetailsModalOpen(false)}
            className="rounded-lg p-1 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Payment Mode <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {paymentModeOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <input
                      type="radio"
                      name="paymentMode"
                      checked={bankDetails.paymentMode === opt.value}
                      onChange={() =>
                        setBankDetails({ ...bankDetails, paymentMode: opt.value })
                      }
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {bankDetails.paymentMode === "CHEQUE" && (
              <>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cheque No <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Enter Cheque No"
                    value={bankDetails.chequeNo}
                    onChange={(e) =>
                      setBankDetails({ ...bankDetails, chequeNo: e.target.value })
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cheque Date <span className="text-red-500">*</span>
                  </label>
                  <DatePicker
                    value={bankDetails.chequeDate}
                    onChange={(selectedDates: Date[]) => {
                      const val = selectedDates[0];
                      setBankDetails({
                        ...bankDetails,
                        chequeDate: val?.toISOString()?.split("T")?.[0] || "",
                      });
                    }}
                    placeholder="Select date..."
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Clear Date
                  </label>
                  <DatePicker
                    value={bankDetails.clearDate}
                    onChange={(selectedDates: Date[]) => {
                      const val = selectedDates[0];
                      setBankDetails({
                        ...bankDetails,
                        clearDate: val?.toISOString()?.split("T")?.[0] || "",
                      });
                    }}
                    placeholder="Select date..."
                  />
                </div>
              </>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Narration
              </label>
              <textarea
                placeholder="Enter narration"
                value={bankDetails.narration}
                onChange={(e) =>
                  setBankDetails({ ...bankDetails, narration: e.target.value })
                }
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Footer with fixed buttons */}
        <div className="dark:border-dark-500 flex items-center justify-end gap-3 border-t border-gray-200 p-5">
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => {
              setBankDetailsModalOpen(false);
              setBankDetails({
                paymentMode: "UPI",
                chequeNo: "",
                chequeDate: "",
                clearDate: "",
                narration: "",
              });
            }}
            className="h-10 min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => {
              // Handle save bank details
              alert("Bank details saved!");
              setBankDetailsModalOpen(false);
            }}
            className="h-10 min-w-[100px]"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  </div>
)}

     {/* Create Account Modal */}
{accountModalOpen && (
  <div className="fixed inset-0 z-50 overflow-hidden">
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setAccountModalOpen(false)}
    />
    <div className="absolute top-0 right-0 h-full w-full max-w-2xl transform bg-white shadow-2xl dark:bg-gray-800">
      <div className="flex h-full flex-col">
        {/* Header with primary color */}
        <div className="bg-primary-500 flex items-center justify-between px-5 py-4">
          <h2 className="text-lg font-semibold text-white">
            Create Account
          </h2>
          <button
            onClick={() => setAccountModalOpen(false)}
            className="rounded-lg p-1 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Account Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Account Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter account name"
                value={accountForm.accountName}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, accountName: e.target.value })
                }
                className="w-full"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mobile <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter mobile number"
                value={accountForm.mobile}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, mobile: e.target.value })
                }
                className="w-full"
              />
            </div>

            {/* Group - Searchable Combobox */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Group <span className="text-red-500">*</span>
              </label>
              <Combobox
                data={groupOptions}
                value={groupOptions.find((g) => g.value === accountForm.group) || null}
                onChange={(val: any) =>
                  setAccountForm({ ...accountForm, group: val.value })
                }
                displayField="label"
                searchFields={["label"]}
                placeholder="Select Group"
              />
            </div>

            {/* Opening Balance */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Opening Balance
              </label>
              <Input
                placeholder="0.00"
                value={accountForm.openingBalance}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, openingBalance: e.target.value })
                }
                className="w-full"
              />
            </div>

            {/* Dr./Cr. - Normal Dropdown */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Dr./Cr.
              </label>
              <select
                value={accountForm.drCr}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, drCr: e.target.value })
                }
                className="dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none"
              >
                <option value="">Select</option>
                <option value="Dr">Dr</option>
                <option value="Cr">Cr</option>
              </select>
            </div>

            {/* Country - React Select with dynamic */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Country <span className="text-red-500">*</span>
              </label>
              <Select
                options={countryOptions}
                styles={customSelectStyles}
                classNamePrefix="react-select"
                placeholder="Search Country"
                value={
                  countryOptions.find(
                    (option) => option.value === accountForm.countryCode
                  ) || null
                }
                onChange={(selected) => {
                  setAccountForm({
                    ...accountForm,
                    countryCode: selected?.value || "",
                    country: selected?.label || "",
                    stateCode: "",
                    state: "",
                    district: "",
                    city: "",
                  });
                }}
              />
            </div>

            {/* State - React Select dynamic */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                State <span className="text-red-500">*</span>
              </label>
              <Select
                options={stateOptions}
                styles={customSelectStyles}
                classNamePrefix="react-select"
                placeholder="Search State"
                isDisabled={!accountForm.countryCode}
                value={
                  stateOptions.find(
                    (option) => option.value === accountForm.stateCode
                  ) || null
                }
                onChange={(selected) => {
                  setAccountForm({
                    ...accountForm,
                    stateCode: selected?.value || "",
                    state: selected?.label || "",
                    district: "",
                    city: "",
                  });
                }}
              />
            </div>

            {/* State Code */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                State Code
              </label>
              <Input
                placeholder="Enter state code"
                value={accountForm.stateCode}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, stateCode: e.target.value })
                }
                className="w-full"
              />
            </div>

            {/* District - React Select (same as city options) */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                District <span className="text-red-500">*</span>
              </label>
              <Select
                options={cityOptions}
                styles={customSelectStyles}
                classNamePrefix="react-select"
                placeholder="Search District"
                isDisabled={!accountForm.stateCode}
                value={
                  cityOptions.find(
                    (option) => option.value === accountForm.district
                  ) || null
                }
                onChange={(selected) => {
                  setAccountForm({
                    ...accountForm,
                    district: selected?.value || "",
                  });
                }}
              />
            </div>

            {/* City - React Select */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                City <span className="text-red-500">*</span>
              </label>
              <Select
                options={cityOptions}
                styles={customSelectStyles}
                classNamePrefix="react-select"
                placeholder="Search City"
                isDisabled={!accountForm.stateCode}
                value={
                  cityOptions.find(
                    (option) => option.value === accountForm.city
                  ) || null
                }
                onChange={(selected) => {
                  setAccountForm({
                    ...accountForm,
                    city: selected?.value || "",
                  });
                }}
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter address"
                value={accountForm.address}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, address: e.target.value })
                }
                className="w-full"
              />
            </div>

            {/* GST No. with Verify button */}
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                GST No.
              </label>
              <div className="flex items-center overflow-hidden rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-primary-500 dark:border-dark-500">
                <Input
                  type="text"
                  placeholder="Enter GST number"
                  value={accountForm.gstNo}
                  onChange={(e) =>
                    setAccountForm({ ...accountForm, gstNo: e.target.value })
                  }
                  className="flex-1 rounded-none border-0 focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => alert("Verify GST: " + accountForm.gstNo)}
                  className="border-l border-gray-300 px-3 py-2 text-sm font-semibold text-green-600 hover:bg-green-50 dark:border-dark-500 dark:text-green-400"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with fixed Save/Cancel buttons */}
        <div className="dark:border-dark-500 flex items-center justify-end gap-3 border-t border-gray-200 p-5">
          <Button
            variant="outlined"
            color="neutral"
            type="button"
            onClick={() => {
              setAccountModalOpen(false);
              setAccountForm({
                accountName: "",
                mobile: "",
                group: "",
                openingBalance: "",
                drCr: "",
                country: "",
                countryCode: "",
                state: "",
                stateCode: "",
                district: "",
                city: "",
                address: "",
                gstNo: "",
              });
            }}
            className="h-10 min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={() => {
              // Handle account creation
              alert("Account created successfully!");
              setAccountModalOpen(false);
            }}
            className="h-10 min-w-[100px]"
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}