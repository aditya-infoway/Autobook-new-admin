import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Button, Input, Checkbox } from "@/components/ui";
import { Combobox } from "@/components/shared/form/Combobox";
import { DatePicker } from "@/components/shared/form/Datepicker";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/Table";

// ─── STATIC DATA ──────────────────────────────────────────────────────────

const brokerOptions = [
  { id: 1, name: "Rohit Motors", mobile: "9876543210" },
  { id: 2, name: "Ankita Auto Deals", mobile: "8765432109" },
  { id: 3, name: "Rakesh Brokers", mobile: "7654321098" },
];

const vehicleOptions = [
  {
    id: 1,
    chassisNo: "CH-2024-001",
    serialNo: "VH-001",
    model: "ACCESS 125",
    variant: "DISC RC ABS",
    colour: "Pearl White",
    itemName: "ACCESS 125 DISC RC ABS",
    itemCode: "ACC-125-DISC",
    engineNo: "ENG-2024-001",
    mfgDate: "2024-01-15",
    keyNumber: "KEY-001",
    batteryMake: "Exide",
    batteryNo: "BAT-001",
    frNo: "FR-001",
    prNo: "PR-001",
    location: "Warehouse A",
    grnNo: "GRN-001",
    grnDate: "2024-01-10",
    grnRecordDate: "2024-01-10",
  },
  {
    id: 2,
    chassisNo: "CH-2024-002",
    serialNo: "VH-002",
    model: "BURGMAN STREET",
    variant: "STANDARD",
    colour: "Metallic Blue",
    itemName: "BURGMAN STREET STANDARD",
    itemCode: "BURG-STD",
    engineNo: "ENG-2024-002",
    mfgDate: "2024-02-20",
    keyNumber: "KEY-002",
    batteryMake: "Amron",
    batteryNo: "BAT-002",
    frNo: "FR-002",
    prNo: "PR-002",
    location: "Warehouse B",
    grnNo: "GRN-002",
    grnDate: "2024-02-15",
    grnRecordDate: "2024-02-15",
  },
  {
    id: 3,
    chassisNo: "CH-2024-003",
    serialNo: "VH-003",
    model: "GIXXER SF",
    variant: "SPORT",
    colour: "Metallic Red",
    itemName: "GIXXER SF SPORT",
    itemCode: "GIX-SF-SPORT",
    engineNo: "ENG-2024-003",
    mfgDate: "2024-03-10",
    keyNumber: "KEY-003",
    batteryMake: "Exide",
    batteryNo: "BAT-003",
    frNo: "FR-003",
    prNo: "PR-003",
    location: "Warehouse C",
    grnNo: "GRN-003",
    grnDate: "2024-03-05",
    grnRecordDate: "2024-03-05",
  },
];

const CHARGE_ROWS = [
  { key: "exShowroomPrice", label: "EX-showroom price" },
  { key: "insurance", label: "Insurance" },
  { key: "roadSideAssistance", label: "Road Side Assistance" },
  { key: "rtoRegistrationCharge", label: "RTO Registration Charge" },
  { key: "extendedWarranty23", label: "Extended Warranty (2-3 Yr)" },
  { key: "hypothecationCharge", label: "Hypothecation Charge" },
  { key: "extendedWarranty28", label: "Extended Warranty (2-8 Yr)" },
  { key: "rtoOtherCharge", label: "RTO Other Charge" },
] as const;

type ChargeKey = (typeof CHARGE_ROWS)[number]["key"];
type ChargeState = Record<ChargeKey, { rate: string; tax: string }>;

const emptyCharges = (): ChargeState =>
  CHARGE_ROWS.reduce((acc, row) => {
    acc[row.key] = { rate: "", tax: "" };
    return acc;
  }, {} as ChargeState);

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function AddStockTransferToBroker() {
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [stockTransferId] = useState("/26-27/001");
  const [broker, setBroker] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const [selectedVehicleData, setSelectedVehicleData] = useState<any>(null);
  const [rows, setRows] = useState<any[]>([]);

  // Auto-filled vehicle fields
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
  const [batteryMake, setBatteryMake] = useState("");
  const [batteryNo, setBatteryNo] = useState("");
  const [frNo, setFrNo] = useState("");
  const [prNo, setPrNo] = useState("");
  const [location, setLocation] = useState("");
  const [grnNumber, setGrnNumber] = useState("");
  const [grnDate, setGrnDate] = useState("");
  const [grnRecordDate, setGrnRecordDate] = useState("");
  const [checkedRows, setCheckedRows] = useState<Record<string, boolean>>({});

  // Charges + discount + narration
  const [charges, setCharges] = useState<ChargeState>(emptyCharges());
  const [exShowroomDiscount, setExShowroomDiscount] = useState("");
  const [narration, setNarration] = useState("");

  const formatDate = (d: string) => {
    if (!d) return "";
    const dt = new Date(d);
    return `${String(dt.getDate()).padStart(2, "0")}-${String(dt.getMonth() + 1).padStart(2, "0")}-${dt.getFullYear()}`;
  };

  const num = (v: string) => Number(v || 0);
  const amountFor = (key: ChargeKey) =>
    num(charges[key].rate) + num(charges[key].tax);
  const chargesTotal = CHARGE_ROWS.reduce(
    (sum, r) => sum + amountFor(r.key),
    0,
  );

  const handleChargeChange = (
    key: ChargeKey,
    field: "rate" | "tax",
    value: string,
  ) => {
    setCharges((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const handleBrokerChange = (selected: any) => {
    setBroker(selected?.name || "");
    setMobileNo(selected?.mobile || "");
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
    setBatteryMake(selected.batteryMake || "");
    setBatteryNo(selected.batteryNo || "");
    setFrNo(selected.frNo || "");
    setPrNo(selected.prNo || "");
    setLocation(selected.location || "");
    setGrnNumber(selected.grnNo || "");
    setGrnDate(formatDate(selected.grnDate));
    setGrnRecordDate(formatDate(selected.grnRecordDate));
  };

  const resetLineForm = () => {
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
    setBatteryMake("");
    setBatteryNo("");
    setFrNo("");
    setPrNo("");
    setLocation("");
    setGrnNumber("");
    setGrnDate("");
    setGrnRecordDate("");
    setCharges(emptyCharges());
    setExShowroomDiscount("");
    setNarration("");
  };

  // "Action" check button — commits the current line into the bottom table
  const handleAddRow = () => {
    if (!selectedVehicleData) {
      alert("Please select a vehicle first");
      return;
    }
    const exists = rows.some((r) => r.chassisNo === chassisNo);
    if (exists) {
      alert("This vehicle is already added");
      return;
    }

    const newRow = {
      id: selectedVehicleData.id,
      vehicleSrNo,
      model,
      variant,
      colour,
      itemName,
      itemCode,
      chassisNo,
      engineNo,
      mfgDate,
      keyNo,
      batteryMake,
      batteryNo,
      frNo,
      prNo,
      location,
      grnNumber,
      grnDate,
      grnRecordDate,
      narration,
      ...CHARGE_ROWS.reduce(
        (acc, r) => {
          acc[r.key] = amountFor(r.key);
          return acc;
        },
        {} as Record<ChargeKey, number>,
      ),
      exShowroomDiscount: num(exShowroomDiscount),
    };

    setRows((prev) => [...prev, newRow]);
    resetLineForm();
  };

  const handleDeleteRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSave = () => {
    if (!broker) {
      alert("Please select broker");
      return;
    }
    if (rows.length === 0) {
      alert("Please add at least one vehicle");
      return;
    }
    alert("Stock Transfer saved successfully!");
    navigate("/stocktransfer-broker");
  };

  const handleBack = () => {
    navigate("/broker-master/stocktransfer");
  };


  // Calculate grand total (charges total - discount)
const calculateGrandTotal = () => {
  const total = chargesTotal - num(exShowroomDiscount);
  return total;
};


const handleCheckboxChange = (key: ChargeKey) => {
  setCheckedRows(prev => ({
    ...prev,
    [key]: !prev[key]
  }));
  
  // Clear the row values when checked
  if (!checkedRows[key]) {
    handleChargeChange(key, "rate", "0");
    handleChargeChange(key, "tax", "0");
  }
};

  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-primary-600 dark:text-primary-400 text-lg font-bold">
            Vehicle Stock Transfer to Broker
          </h1>
          <div className="bg-primary-500 mt-1 h-[2px] w-12" />
        </div>
        <button
          onClick={handleBack}
          className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="p-4">
          {/* Row 1: Date, Stock Transfer ID, Broker, Mobile No */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
                Select Broker <span className="text-red-500">*</span>
              </label>
              <Combobox
                data={brokerOptions}
                value={brokerOptions.find((b) => b.name === broker) || null}
                onChange={handleBrokerChange}
                displayField="name"
                searchFields={["name"]}
                placeholder="Select Broker"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Mobile No
              </label>
              <Input
                value={mobileNo}
                readOnly
                className="w-full bg-gray-50 dark:bg-gray-700"
                placeholder="Mobile No"
              />
            </div>
          </div>

          <div className="my-4 border-t border-dashed border-gray-300 dark:border-gray-700" />

          {/* DETAILS */}
          <div className="mb-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
            DETAILS
          </div>

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
                placeholder="Select Vehicle"
              />
            </div>
            {/* Action check button */}
            <Button
              color="success"
              isIcon
              onClick={handleAddRow}
              className="h-10 w-10 flex-shrink-0"
              title="Add to list"
            >
              <CheckIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="my-4 border-t border-dashed border-gray-300 dark:border-gray-700" />

          {/* Auto-filled vehicle fields — 6 columns like the reference */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Field label="Vehicle Sr. No." value={vehicleSrNo} />
            <Field label="Model" value={model} />
            <Field label="Variant" value={variant} />
            <Field label="Colour" value={colour} />
            <Field label="Item Name" value={itemName} />
            <Field label="Item Code" value={itemCode} />

            <Field label="Chassis No." value={chassisNo} />
            <Field label="Engine No." value={engineNo} />
            <Field label="MFG Date" value={mfgDate} />
            <Field label="Key No." value={keyNo} />
            <Field label="Battery Make" value={batteryMake} />
            <Field label="Battery No." value={batteryNo} />

            <Field label="FR" value={frNo} />
            <Field label="PR" value={prNo} />
            <Field label="Location" value={location} />
            <Field label="GRN Number" value={grnNumber} />
            <Field label="GRN Date" value={grnDate} />
            <Field label="GRN Rec. Date" value={grnRecordDate} />
          </div>

          <div className="my-4 border-t border-dashed border-gray-300 dark:border-gray-700" />

          {/* Description / Rate / Tax / Amount */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <Table className="w-full text-left text-sm">
              <THead className="bg-gray-100 dark:bg-gray-700">
                <Tr>
                  <Th className="px-3 py-2">Description</Th>
                  <Th className="px-3 py-2 text-right">Rate</Th>
                  <Th className="px-3 py-2 text-right">Tax</Th>
                  <Th className="px-3 py-2 text-right">Amount</Th>
                  <Th className="px-3 py-2 text-center">Action</Th>
                </Tr>
              </THead>
              <TBody>
                {CHARGE_ROWS.map((row) => (
                  <Tr
                    key={row.key}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <Td className="px-3 py-2 text-gray-600 dark:text-gray-300">
                      {row.label}
                    </Td>
                    <Td className="px-2 py-1.5 text-right">
                      <Input
                        type="number"
                        value={charges[row.key].rate}
                        onChange={(e: any) =>
                          handleChargeChange(row.key, "rate", e.target.value)
                        }
                        className="w-28 text-right"
                        placeholder="0.00"
                      />
                    </Td>
                    <Td className="px-2 py-1.5 text-right">
                      <Input
                        type="number"
                        value={charges[row.key].tax}
                        onChange={(e: any) =>
                          handleChargeChange(row.key, "tax", e.target.value)
                        }
                        className="w-24 text-right"
                        placeholder="0.00"
                      />
                    </Td>
                    
                    <Td className="px-3 py-2 text-right font-medium text-gray-800 dark:text-gray-200">
                      {amountFor(row.key).toFixed(2)}
                    </Td>
                      <Td className="px-3 py-2 text-center">
            <Checkbox 
              checked={false}
              onChange={() => {
                handleChargeChange(row.key, "rate", "0");
                handleChargeChange(row.key, "tax", "0");
              }}
              className="h-4 w-4"
            />
          </Td>
                  </Tr>
                ))}
                <Tr className="border-t border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700/50">
                  <Td
                    className="px-3 py-2 text-right font-bold text-gray-800 dark:text-gray-200"
                    colSpan={3}
                  >
                    TOTAL
                  </Td>
                  <Td className="text-primary-600 dark:text-primary-400 px-3 py-2 text-right font-bold">
                    {chargesTotal.toFixed(2)}
                  </Td>
                </Tr>
              </TBody>
            </Table>
          </div>

          {/* Discount + Narration */}
          {/* Narration, EX-showroom Discount & Grand Total */}
<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
  {/* Narration - First */}
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      Narration
    </label>
    <Input
      value={narration}
      onChange={(e: any) => setNarration(e.target.value)}
      className="w-full"
      placeholder="Enter Narration"
    />
  </div>

  {/* EX-showroom Discount - Second */}
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      EX-showroom Discount
    </label>
    <Input
      type="number"
      value={exShowroomDiscount}
      onChange={(e: any) => setExShowroomDiscount(e.target.value)}
      className="w-full"
      placeholder="EX-showroom Discount"
    />
  </div>

  {/* Grand Total - Third */}
  <div>
    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
      Grand Total
    </label>
    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-700 p-3">
      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
        ₹ {calculateGrandTotal().toFixed(2)}
      </span>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Bottom table of added rows */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <Table className="w-full text-left text-xs whitespace-nowrap">
          <THead className="bg-gray-100 dark:bg-gray-700">
            <Tr>
              <Th className="px-2 py-2">SR NO</Th>
              <Th className="px-2 py-2">ITEM NAME</Th>
              <Th className="px-2 py-2">ITEM CODE</Th>
              <Th className="px-2 py-2">MODEL</Th>
              <Th className="px-2 py-2">VARIANT</Th>
              <Th className="px-2 py-2">COLOUR</Th>
              <Th className="px-2 py-2">VEHICLE SR. NO</Th>
              <Th className="px-2 py-2">CHASSIS NO</Th>
              <Th className="px-2 py-2">ENGINE NO</Th>
              <Th className="px-2 py-2">MFG DATE</Th>
              <Th className="px-2 py-2">KEY NO</Th>
              <Th className="px-2 py-2">BATTERY MAKE</Th>
              <Th className="px-2 py-2">BATTERY NO</Th>
              <Th className="px-2 py-2">FR</Th>
              <Th className="px-2 py-2">PR</Th>
              <Th className="px-2 py-2">LOCATION</Th>
              <Th className="px-2 py-2">GRN NUMBER</Th>
              <Th className="px-2 py-2">GRN DATE</Th>
              <Th className="px-2 py-2">GRN REC. DATE</Th>
              <Th className="px-2 py-2 text-right">EX-SHOWROOM PRICE</Th>
              <Th className="px-2 py-2 text-right">INSURANCE</Th>
              <Th className="px-2 py-2 text-right">ROAD SIDE ASSISTANCE</Th>
              <Th className="px-2 py-2 text-right">RTO REGISTRATION CHARGE</Th>
              <Th className="px-2 py-2 text-right">EX-WARRANTY (2-3)</Th>
              <Th className="px-2 py-2 text-right">HYPOTHECATION CHARGE</Th>
              <Th className="px-2 py-2 text-right">EX-WARRANTY (2-8)</Th>
              <Th className="px-2 py-2 text-right">RTO OTHER CHARGE</Th>
              <Th className="px-2 py-2 text-right">EX-SHOWROOM DISCOUNT</Th>
              <Th className="px-2 py-2 text-center">ACTION</Th>
            </Tr>
          </THead>
          <TBody>
            {rows.length === 0 ? (
              <Tr>
                <Td
                  colSpan={29}
                  className="px-3 py-10 text-center text-gray-400"
                >
                  No vehicles added yet — select a chassis no. above and click
                  the check icon to add a row.
                </Td>
              </Tr>
            ) : (
              rows.map((r, index) => (
                <Tr
                  key={r.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <Td className="px-2 py-2">{index + 1}</Td>
                  <Td className="px-2 py-2">{r.itemName}</Td>
                  <Td className="px-2 py-2">{r.itemCode}</Td>
                  <Td className="px-2 py-2">{r.model}</Td>
                  <Td className="px-2 py-2">{r.variant}</Td>
                  <Td className="px-2 py-2">{r.colour}</Td>
                  <Td className="px-2 py-2">{r.vehicleSrNo}</Td>
                  <Td className="px-2 py-2 font-mono">{r.chassisNo}</Td>
                  <Td className="px-2 py-2">{r.engineNo}</Td>
                  <Td className="px-2 py-2">{r.mfgDate}</Td>
                  <Td className="px-2 py-2">{r.keyNo}</Td>
                  <Td className="px-2 py-2">{r.batteryMake}</Td>
                  <Td className="px-2 py-2">{r.batteryNo}</Td>
                  <Td className="px-2 py-2">{r.frNo}</Td>
                  <Td className="px-2 py-2">{r.prNo}</Td>
                  <Td className="px-2 py-2">{r.location}</Td>
                  <Td className="px-2 py-2">{r.grnNumber}</Td>
                  <Td className="px-2 py-2">{r.grnDate}</Td>
                  <Td className="px-2 py-2">{r.grnRecordDate}</Td>
                  <Td className="px-2 py-2 text-right">
                    {r.exShowroomPrice.toFixed(2)}
                  </Td>
                  <Td className="px-2 py-2 text-right">
                    {r.insurance.toFixed(2)}
                  </Td>
                  <Td className="px-2 py-2 text-right">
                    {r.roadSideAssistance.toFixed(2)}
                  </Td>
                  <Td className="px-2 py-2 text-right">
                    {r.rtoRegistrationCharge.toFixed(2)}
                  </Td>
                  <Td className="px-2 py-2 text-right">
                    {r.extendedWarranty23.toFixed(2)}
                  </Td>
                  <Td className="px-2 py-2 text-right">
                    {r.hypothecationCharge.toFixed(2)}
                  </Td>
                  <Td className="px-2 py-2 text-right">
                    {r.extendedWarranty28.toFixed(2)}
                  </Td>
                  <Td className="px-2 py-2 text-right">
                    {r.rtoOtherCharge.toFixed(2)}
                  </Td>
                  <Td className="px-2 py-2 text-right">
                    {r.exShowroomDiscount.toFixed(2)}
                  </Td>
                  <Td className="px-2 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(r.id)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                    </button>
                  </Td>
                </Tr>
              ))
            )}
          </TBody>
        </Table>
      </div>

      {/* Save */}
      <div className="mt-6 flex justify-center">
        <Button
          color="primary"
          onClick={handleSave}
          className="h-10 min-w-[140px]"
        >
          Save
        </Button>
      </div>
    </div>
  );
}

// Small helper for the read-only auto-filled inputs
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <Input
        value={value}
        readOnly
        className="w-full bg-gray-50 dark:bg-gray-700"
      />
    </div>
  );
}
