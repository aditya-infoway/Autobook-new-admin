import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Country, State, City } from "country-state-city";
import { ArrowLeft } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { Listbox } from "@/components/shared/form/StyledListbox";
import { DatePicker } from "@/components/shared/form/Datepicker";

// Define the form data interface
// Define the form data interface - make all fields optional except required ones
interface AccountFormData {
  accountName: string;
  printName: string;
  group?: string;
  openingBalance?: string;
  drCr?: string;
  country?: string;
  state?: string;
  stateCode?: string;
  district?: string;
  taluka?: string;
  city?: string;
  area?: string;
  addressLine1?: string;
  addressLine2?: string;
  pincode?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  contactPerson?: string;
  birthdayOn?: string;
  anniversary?: string;
  bankAccountNo?: string;
  bankName?: string;
  ifscCode?: string;
  branch?: string;
  gstNo?: string;
  panCard?: string;
  aadharCardNo?: string;
}
// Update the validation schema
const schema = yup.object({
  accountName: yup.string().required("Account Name is required"),
  group: yup.string().optional(),
  openingBalance: yup.string().optional(),
  drCr: yup.string().optional(),
  country: yup.string().optional(),
  state: yup.string().optional(),
  stateCode: yup.string().optional(),
  district: yup.string().optional(),
  taluka: yup.string().optional(),
  city: yup.string().optional(),
  area: yup.string().optional(),
  addressLine1: yup.string().optional(),
  addressLine2: yup.string().optional(),
  pincode: yup.string().optional(),
  phone: yup.string().optional(),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .optional(),
  email: yup.string().email("Enter a valid email").optional(),
  contactPerson: yup.string().optional(),
  birthdayOn: yup.string().optional(),
  anniversary: yup.string().optional(),
  bankAccountNo: yup.string().optional(),
  bankName: yup.string().optional(),
  ifscCode: yup.string().optional(),
  branch: yup.string().optional(),
  gstNo: yup.string().optional(),
  panCard: yup.string().optional(),
  aadharCardNo: yup.string().optional(),
});

const groupOptions = [
  { id: "sundry-debtor", name: "Sundry Debtor" },
  { id: "sundry-creditor", name: "Sundry Creditor" },
  { id: "bank", name: "Bank Account" },
  { id: "cash", name: "Cash-in-Hand" },
];

const drCrOptions = [
  { id: "DR", name: "DR" },
  { id: "CR", name: "CR" },
];

const districtOptions = [
  { id: "district1", name: "District 1" },
  { id: "district2", name: "District 2" },
];

const talukaOptions = [
  { id: "taluka1", name: "Taluka 1" },
  { id: "taluka2", name: "Taluka 2" },
];

interface CreateAccountProps {
  onBack?: () => void;
  onCancel?: () => void;
  onSubmitAccount?: (data: AccountFormData) => void;
}

export default function CreateAccount({
  onBack,
  onCancel,
  onSubmitAccount,
}: CreateAccountProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AccountFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      accountName: "",
      printName: "",
      group: "",
      openingBalance: "0.00",
      drCr: "DR",
      country: "",
      state: "",
      stateCode: "",
      district: "",
      taluka: "",
      city: "",
      area: "",
      addressLine1: "",
      addressLine2: "",
      pincode: "",
      phone: "",
      mobile: "",
      email: "",
      contactPerson: "",
      birthdayOn: "",
      anniversary: "",
      bankAccountNo: "",
      bankName: "",
      ifscCode: "",
      branch: "",
      gstNo: "",
      panCard: "",
      aadharCardNo: "",
    },
  });

  // Account Name -> Print Name auto sync
  const [printNameTouched, setPrintNameTouched] = useState(false);
  const accountName = watch("accountName");

  useEffect(() => {
    if (!printNameTouched) {
      setValue("printName", accountName, { shouldValidate: true });
    }
  }, [accountName, printNameTouched, setValue]);

  // Country / State / City via country-state-city
  const countries = useMemo(() => Country.getAllCountries(), []);
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");

  const states = useMemo(
    () => (countryCode ? State.getStatesOfCountry(countryCode) : []),
    [countryCode],
  );
  const cities = useMemo(
    () =>
      countryCode && stateCode
        ? City.getCitiesOfState(countryCode, stateCode)
        : [],
    [countryCode, stateCode],
  );

  const handleCountryChange = (e: any) => {
    const iso = e.target.value;
    setCountryCode(iso);
    setStateCode("");
    setValue("country", iso);
    setValue("state", "");
    setValue("stateCode", "");
    setValue("city", "");
  };

  const handleStateChange = (e: any) => {
    const iso = e.target.value;
    setStateCode(iso);
    setValue("state", iso);
    setValue("stateCode", iso);
    setValue("city", "");
  };

  const handleVerifyGst = () => {
    const gst = watch("gstNo");
    if (!gst) return;
    console.log("Verify GST:", gst);
  };

  const onSubmit = (data: any) => {
    if (onSubmitAccount) {
      onSubmitAccount(data);
    } else {
      console.log("Create Account payload:", data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-primary-600 dark:text-primary-400 text-xl font-bold">
            Create Account
          </h1>
          <div className="bg-primary-500 mt-1 h-[2px] w-12"></div>
        </div>
        <button
          type="button"
          onClick={onBack ? onBack : () => window.history.back()}
          className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left Column */}
          <div className="flex-[3] space-y-4">
            {/* Row 1: Account Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Account Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Enter Account Name"
                {...register("accountName")}
                error={errors.accountName?.message}
                className="w-full"
              />
            </div>

            {/* Row 2: Print Name + Group */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Print Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Enter Print Name"
                  {...register("printName", {
                    onChange: () => setPrintNameTouched(true),
                  })}
                  error={errors.printName?.message}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Group
                </label>
                <Listbox
                  data={groupOptions}
                  value={
                    groupOptions.find((opt) => opt.id === watch("group")) ||
                    null
                  }
                  onChange={(selected: any) => {
                    setValue("group", selected?.id || "");
                  }}
                  placeholder="Select Group"
                  displayField="name"
                />
              </div>
            </div>

            {/* Row 3: Opening Balance + Dr/Cr */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Opening Balance
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("openingBalance")}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Dr./Cr.
                </label>
                <Listbox
                  data={drCrOptions}
                  value={
                    drCrOptions.find((opt) => opt.id === watch("drCr")) ||
                    drCrOptions[0]
                  }
                  onChange={(selected: any) => {
                    setValue("drCr", selected?.id || "DR");
                  }}
                  placeholder="Select"
                  displayField="name"
                />
              </div>
            </div>

            {/* Row 4: Country + State */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Country
                </label>
                <select
                  className="focus:ring-primary-500 dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2"
                  {...register("country")}
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c.isoCode} value={c.isoCode}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  State
                </label>
                <select
                  className="focus:ring-primary-500 dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2"
                  {...register("state")}
                  onChange={handleStateChange}
                  disabled={!countryCode}
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.isoCode} value={s.isoCode}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 5: State Code + District */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  State Code
                </label>
                <Input
                  type="text"
                  placeholder="24"
                  {...register("stateCode")}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  District
                </label>
                <Listbox
                  data={districtOptions}
                  value={
                    districtOptions.find(
                      (opt) => opt.id === watch("district"),
                    ) || null
                  }
                  onChange={(selected: any) => {
                    setValue("district", selected?.id || "");
                  }}
                  placeholder="Select District"
                  displayField="name"
                />
              </div>
            </div>

            {/* Row 6: Taluka + City */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Taluka
                </label>
                <Listbox
                  data={talukaOptions}
                  value={
                    talukaOptions.find((opt) => opt.id === watch("taluka")) ||
                    null
                  }
                  onChange={(selected: any) => {
                    setValue("taluka", selected?.id || "");
                  }}
                  placeholder="Select Taluka"
                  displayField="name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  City
                </label>
                <select
                  className="focus:ring-primary-500 dark:border-dark-500 dark:bg-dark-800 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2"
                  {...register("city")}
                  disabled={!stateCode}
                >
                  <option value="">Select City</option>
                  {cities.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 7: Area + Address Line 1 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Area
                </label>
                <Input
                  type="text"
                  placeholder="Enter Area"
                  {...register("area")}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address Line 1
                </label>
                <Input
                  type="text"
                  placeholder="Enter Address"
                  {...register("addressLine1")}
                  className="w-full"
                />
              </div>
            </div>

            {/* Row 8: Address Line 2 + Pincode */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address Line 2
                </label>
                <Input
                  type="text"
                  placeholder="Enter Address Line 2"
                  {...register("addressLine2")}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Pincode
                </label>
                <Input
                  type="text"
                  placeholder="Pincode"
                  {...register("pincode")}
                  className="w-full"
                />
              </div>
            </div>

            {/* Row 9: Phone + Mobile */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <Input
                  type="text"
                  placeholder="Phone"
                  {...register("phone")}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mobile <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Mobile"
                  {...register("mobile")}
                  error={errors.mobile?.message}
                  className="w-full"
                />
              </div>
            </div>

            {/* Row 10: Email + Contact Person */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <Input
                  type="text"
                  placeholder="Email"
                  {...register("email")}
                  error={errors.email?.message}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contact Person
                </label>
                <Input
                  type="text"
                  placeholder="Contact Name"
                  {...register("contactPerson")}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-[2] space-y-4">
            {/* Row 1: Birthday + Anniversary */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Birthday On
                </label>
                <DatePicker
                  placeholder="Select birthday"
                  value={watch("birthdayOn")}
                  onChange={(date: any) => {
                    setValue("birthdayOn", date);
                  }}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Anniversary
                </label>
                <DatePicker
                  placeholder="Select anniversary"
                  value={watch("anniversary")}
                  onChange={(date: any) => {
                    setValue("anniversary", date);
                  }}
                />
              </div>
            </div>

            {/* Row 2: Bank Account + Bank Name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bank Account No.
                </label>
                <Input
                  type="text"
                  placeholder="Account Number"
                  {...register("bankAccountNo")}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bank Name
                </label>
                <Input
                  type="text"
                  placeholder="Bank Name"
                  {...register("bankName")}
                  className="w-full"
                />
              </div>
            </div>

            {/* Row 3: IFSC + Branch */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  IFSC Code
                </label>
                <Input
                  type="text"
                  placeholder="IFSC Code"
                  {...register("ifscCode")}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Branch
                </label>
                <Input
                  type="text"
                  placeholder="Branch Name"
                  {...register("branch")}
                  className="w-full"
                />
              </div>
            </div>

            {/* Row 4: GST + PAN */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  GST No.
                </label>
                <div className="focus-within:ring-primary-500 dark:border-dark-500 flex items-center overflow-hidden rounded-lg border border-gray-300 focus-within:ring-2">
                  <Input
                    type="text"
                    placeholder="GST Number"
                    {...register("gstNo")}
                    className="flex-1 rounded-none border-0 focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyGst}
                    className="dark:border-dark-500 border-l border-gray-300 px-3 py-2 text-sm font-semibold text-green-600 hover:bg-green-50 dark:text-green-400"
                  >
                    Verify
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  PAN Card
                </label>
                <Input
                  type="text"
                  placeholder="PAN Card Number"
                  {...register("panCard")}
                  className="w-full"
                />
              </div>
            </div>

            {/* Row 5: Aadhar */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Aadhar Card No.
              </label>
              <Input
                type="text"
                placeholder="Aadhar Number"
                {...register("aadharCardNo")}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="dark:border-dark-500 mt-10 flex justify-end gap-3 border-t border-gray-200 pt-5">
          <Button
            variant="outlined"
            color="neutral"
            type="button"
            onClick={onCancel ? onCancel : () => window.history.back()}
            className="h-10 min-w-[100px]"
          >
            Cancel
          </Button>
          <Button color="primary" type="submit" className="h-10 min-w-[100px]">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
