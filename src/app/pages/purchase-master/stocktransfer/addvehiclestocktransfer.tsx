import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Button, Input } from "@/components/ui";
import { Combobox } from "@/components/shared/form/Combobox";
import { DatePicker } from "@/components/shared/form/Datepicker";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";
import { Checkbox, Radio } from "@/components/ui";

// Static Data
const branchOptions = [
  { id: 1, name: "Mumbai", manager: "Rohit Parab", contact: "9876543210" },
  { id: 2, name: "Delhi", manager: "Ankita Ghavanalkar", contact: "8765432109" },
  { id: 3, name: "Bangalore", manager: "Rakesh Naik", contact: "7654321098" },
  { id: 4, name: "Chennai", manager: "Priya Sharma", contact: "6543210987" },
  { id: 5, name: "Pune", manager: "Amit Singh", contact: "5432109876" },
];

const vehicleOptions = [
  {
    id: 1,
    chassisNo: "CH-2024-001",
    serialNo: "VH-001",
    model: "Honda City",
    variant: "ZX CVT",
    colour: "White",
    itemName: "Honda City ZX CVT",
    itemCode: "HON-CITY-ZX",
    engineNo: "ENG-2024-001",
    mfgDate: "2024-01-15",
    keyNumber: "KEY-001",
    batteryNo: "BAT-001",
    batteryMake: "Exide",
    first1TyreNo: "TYR-F1-001",
    first2TyreNo: "TYR-F2-001",
    second1TyreNo: "TYR-S1-001",
    second2TyreNo: "TYR-S2-001",
    location: "Warehouse A",
    grnNo: "GRN-001",
    grnDate: "2024-01-10",
    grnRecordDate: "2024-01-10",
    purchasePriceNoGST: 450000,
    purchasePriceTaxable: 531000,
  },
  {
    id: 2,
    chassisNo: "CH-2024-002",
    serialNo: "VH-002",
    model: "Toyota Innova",
    variant: "VX",
    colour: "Silver",
    itemName: "Toyota Innova VX",
    itemCode: "TOY-INN-VX",
    engineNo: "ENG-2024-002",
    mfgDate: "2024-02-20",
    keyNumber: "KEY-002",
    batteryNo: "BAT-002",
    batteryMake: "Amron",
    first1TyreNo: "TYR-F1-002",
    first2TyreNo: "TYR-F2-002",
    second1TyreNo: "TYR-S1-002",
    second2TyreNo: "TYR-S2-002",
    location: "Warehouse B",
    grnNo: "GRN-002",
    grnDate: "2024-02-15",
    grnRecordDate: "2024-02-15",
    purchasePriceNoGST: 520000,
    purchasePriceTaxable: 613600,
  },
];

export default function AddVehicleStockTransfer() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [stockTransferId] = useState("ST-001");
  const [branch, setBranch] = useState("");
  const [OwnerName, setOwnerName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [selectedVehicles, setSelectedVehicles] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedVehicleData, setSelectedVehicleData] = useState<any>(null);

  // Form fields
  const [vehicleSrNo, setVehicleSrNo] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [colour, setColour] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [chassisNo, setChassisNo] = useState("");
  const [engineNo, setEngineNo] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [keyNo, setKeyNo] = useState("");
  const [batteryNo, setBatteryNo] = useState("");
  const [batteryMake, setBatteryMake] = useState("");
  const [f1TyresNo, setF1TyresNo] = useState("");
  const [f2TyresNo, setF2TyresNo] = useState("");
  const [s1TyresNo, setS1TyresNo] = useState("");
  const [s2TyresNo, setS2TyresNo] = useState("");
  const [location, setLocation] = useState("");
  const [grnNumber, setGrnNumber] = useState("");
  const [grnDate, setGrnDate] = useState("");
  const [grnRecordDate, setGrnRecordDate] = useState("");
  const [transferType, setTransferType] = useState("warehouse");

  const totalValue = selectedVehicles.reduce(
    (sum, item) => sum + Number(item.purchasePriceNoGST || 0),
    0
  );
  const taxableValue = selectedVehicles.reduce(
    (sum, item) => sum + Number(item.purchasePriceTaxable || 0),
    0
  );
  const grandTotal = taxableValue;

  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  };

  const handleBranchChange = (selected: any) => {
    setOwnerName(selected?.name || "");
    setOwnerName(selected?.manager || "");
    setContactNo(selected?.contact || "");
  };

  const handleVehicleSelect = (selected: any) => {
    if (!selected) return;
    setSelectedVehicleData(selected);
    setChassisNo(selected.chassisNo);
    setVehicleSrNo(selected.serialNo || "");
    setModel(selected.model || "");
    setVariant(selected.variant || "");
    setColour(selected.colour || "");
    setItemName(selected.itemName || "");
    setItemCode(selected.itemCode || "");
    setEngineNo(selected.engineNo || "");
    setMfgDate(formatDate(selected.mfgDate));
    setKeyNo(selected.keyNumber || "");
    setBatteryNo(selected.batteryNo || "");
    setBatteryMake(selected.batteryMake || "");
    setF1TyresNo(selected.first1TyreNo || "");
    setF2TyresNo(selected.first2TyreNo || "");
    setS1TyresNo(selected.second1TyreNo || "");
    setS2TyresNo(selected.second2TyreNo || "");
    setLocation(selected.location || "");
    setGrnNumber(selected.grnNo || "");
    setGrnDate(formatDate(selected.grnDate));
    setGrnRecordDate(formatDate(selected.grnRecordDate));
  };

  const handleAddVehicle = () => {
    if (!selectedVehicleData) {
      alert("Please select a vehicle first");
      return;
    }
    const exists = selectedVehicles.some((v) => v.id === selectedVehicleData.id);
    if (exists) {
      alert("This vehicle is already added");
      return;
    }
    setSelectedVehicles([...selectedVehicles, { ...selectedVehicleData }]);
    setSelectedIds([...selectedIds, selectedVehicleData.id]);
    // Reset form
    setSelectedVehicleData(null);
    setChassisNo("");
    setVehicleSrNo("");
    setModel("");
    setVariant("");
    setColour("");
    setItemName("");
    setItemCode("");
    setEngineNo("");
    setMfgDate("");
    setKeyNo("");
    setBatteryNo("");
    setBatteryMake("");
    setF1TyresNo("");
    setF2TyresNo("");
    setS1TyresNo("");
    setS2TyresNo("");
    setLocation("");
    setGrnNumber("");
    setGrnDate("");
    setGrnRecordDate("");
  };

  const handleDeleteVehicle = (id: number) => {
    setSelectedVehicles(selectedVehicles.filter((v) => v.id !== id));
    setSelectedIds(selectedIds.filter((sid) => sid !== id));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(selectedVehicles.map((v) => v.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    if (!branch) {
      alert("Please select branch");
      return;
    }
    if (selectedVehicles.length === 0) {
      alert("Please add at least one vehicle");
      return;
    }
    alert("Vehicle Stock Transfer saved successfully!");
    navigate("/stocktransfer/vehiclestock");
  };

  const handleBack = () => {
    navigate("/purchase-master/stocktransfer/vehiclestocktransfer");
  };

  const isAllSelected =
    selectedVehicles.length > 0 &&
    selectedVehicles.every((item) => selectedIds.includes(item.id));

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 md:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-lg font-bold text-primary-600 dark:text-primary-400">
            Add Vehicle Stock Transfer
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

      {/* Form */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="p-4">

          <div className="mb-4">
  
  <div className="flex gap-6">
    <label className="flex items-center gap-2 cursor-pointer">
      <Radio
        checked={transferType === "warehouse"}
        onChange={() => setTransferType("warehouse")}
      />
      <span className="text-sm text-gray-700 dark:text-gray-300">Warehouse</span>
    </label>
    <label className="flex items-center gap-2 cursor-pointer">
      <Radio
        checked={transferType === "branch"}
        onChange={() => setTransferType("branch")}
      />
      <span className="text-sm text-gray-700 dark:text-gray-300">Branch</span>
    </label>
  </div>
</div>

          {/* Row 1 */}
         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      Date <span className="text-red-500">*</span>
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
      Stock Transfer ID
    </label>
    <Input
      value={stockTransferId}
      readOnly
      className="w-full bg-gray-50 dark:bg-gray-700"
    />
  </div>
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {transferType === "warehouse" ? "Select Warehouse" : "Select Branch"} <span className="text-red-500">*</span>
    </label>
    <Combobox
      data={branchOptions}
      value={branchOptions.find((b) => b.name === branch) || null}
      onChange={handleBranchChange}
      displayField="name"
      searchFields={["name", "manager"]}
      placeholder={transferType === "warehouse" ? "Select Warehouse" : "Select Branch"}
    />
  </div>
</div>

{/* Row 2 - Keep as is */}
<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      Owner Name <span className="text-red-500">*</span>
    </label>
    <Input
      value={OwnerName}
      readOnly
      className="w-full bg-gray-50 dark:bg-gray-700"
    />
  </div>
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      Contact No <span className="text-red-500">*</span>
    </label>
    <Input
      value={contactNo}
      readOnly
      className="w-full bg-gray-50 dark:bg-gray-700"
    />
  </div>
</div>

          <div className="my-4 border-t border-dashed border-gray-300 dark:border-gray-700" />

          {/* Select Chassis */}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Chassis No <span className="text-red-500">*</span>
              </label>
              <Combobox
                data={vehicleOptions}
                value={
                  vehicleOptions.find((v) => v.chassisNo === chassisNo) || null
                }
                onChange={handleVehicleSelect}
                displayField="chassisNo"
                searchFields={["chassisNo", "model", "variant"]}
                placeholder="Search Vehicle"
              />
            </div>
            <Button
              color="primary"
              isIcon
              onClick={handleAddVehicle}
              className="h-10 w-10 flex-shrink-0"
            >
              <PlusIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="my-4 border-t border-dashed border-gray-300 dark:border-gray-700" />

          {/* Vehicle Details - 4 columns */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Vehicle Sr. No.
              </label>
              <Input value={vehicleSrNo} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Model
              </label>
              <Input value={model} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Variant
              </label>
              <Input value={variant} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Colour
              </label>
              <Input value={colour} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Item Name
              </label>
              <Input value={itemName} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Item Code
              </label>
              <Input value={itemCode} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Chassis No.
              </label>
              <Input value={chassisNo} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Engine No.
              </label>
              <Input value={engineNo} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                MFG Date
              </label>
              <Input value={mfgDate} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Key No.
              </label>
              <Input value={keyNo} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Battery No.
              </label>
              <Input value={batteryNo} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Battery Make
              </label>
              <Input value={batteryMake} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                F1 Tyres No.
              </label>
              <Input value={f1TyresNo} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                F2 Tyres No.
              </label>
              <Input value={f2TyresNo} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                S1 Tyres No.
              </label>
              <Input value={s1TyresNo} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                S2 Tyres No.
              </label>
              <Input value={s2TyresNo} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Location
              </label>
              <Input value={location} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                GRN Number
              </label>
              <Input value={grnNumber} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                GRN Date
              </label>
              <Input value={grnDate} readOnly className="w-full bg-gray-50" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                GRN Record Date
              </label>
              <Input value={grnRecordDate} readOnly className="w-full bg-gray-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Selected Vehicles Table */}
      {selectedVehicles.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Selected Vehicles
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <Table hoverable className="w-full text-left text-sm">
              <THead className="bg-gray-100 dark:bg-gray-700">
                <Tr>
                  <Th className="px-3 py-2 text-center">
                    <Checkbox
                      checked={isAllSelected}
                      onChange={(e: any) => handleSelectAll(e.target.checked)}
                    />
                  </Th>
                  <Th className="px-3 py-2">#</Th>
                  <Th className="px-3 py-2">Chassis No</Th>
                  <Th className="px-3 py-2">Model</Th>
                  <Th className="px-3 py-2">Variant</Th>
                  <Th className="px-3 py-2">Colour</Th>
                  <Th className="px-3 py-2">Item Name</Th>
                  <Th className="px-3 py-2">Engine No</Th>
                  <Th className="px-3 py-2 text-right">Purchase Price</Th>
                  <Th className="px-3 py-2 text-center">Action</Th>
                </Tr>
              </THead>
              <TBody>
                {selectedVehicles.map((item, index) => (
                  <Tr key={item.id} className="border-t border-gray-200 dark:border-gray-700">
                    <Td className="px-3 py-2 text-center">
                      <Checkbox
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </Td>
                    <Td className="px-3 py-2 text-center font-medium text-gray-500">
                      {index + 1}
                    </Td>
                    <Td className="px-3 py-2 font-mono text-gray-600">
                      {item.chassisNo}
                    </Td>
                    <Td className="px-3 py-2 text-gray-600">{item.model}</Td>
                    <Td className="px-3 py-2 text-gray-600">{item.variant}</Td>
                    <Td className="px-3 py-2 text-gray-600">
                      <span className="inline-block h-3 w-3 rounded-full border border-gray-300" style={{ backgroundColor: item.colour.toLowerCase() }} />
                      <span className="ml-1">{item.colour}</span>
                    </Td>
                    <Td className="px-3 py-2 text-gray-600">{item.itemName}</Td>
                    <Td className="px-3 py-2 text-gray-600">{item.engineNo}</Td>
                    <Td className="px-3 py-2 text-right font-semibold text-gray-900">
                      ₹{Number(item.purchasePriceNoGST).toLocaleString()}
                    </Td>
                    <Td className="px-3 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteVehicle(item.id)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </Td>
                  </Tr>
                ))}
              </TBody>
            </Table>
          </div>
        </div>
      )}

      {/* Bill Summary */}
      <div className="mt-6">
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-4 shadow-sm dark:border-gray-700 dark:from-gray-800 dark:to-gray-800/50">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Bill Summary
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-2 dark:border-gray-700/60">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Value</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                ₹{totalValue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-2 dark:border-gray-700/60">
              <span className="text-sm text-gray-600 dark:text-gray-400">Taxable Value</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                ₹{taxableValue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-blue-600/10 p-2 dark:bg-blue-500/20">
              <span className="text-sm font-bold text-gray-900 dark:text-white">Grand Total</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                ₹{grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outlined" color="neutral" onClick={handleBack} className="h-10 min-w-[100px]">
          Cancel
        </Button>
        <Button color="primary" onClick={handleSave} className="h-10 min-w-[100px]">
          Save
        </Button>
      </div>
    </div>
  );
}