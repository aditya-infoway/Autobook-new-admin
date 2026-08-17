import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowUpTrayIcon  } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui";
import { FilePond } from "@/components/shared/form/Filepond";

export default function PurchaseImport() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<any[]>([]);

  const handleBack = () => {
    navigate("/purchase/purchaseorder");
  };

  const handleImport = () => {
    if (files.length === 0) {
      alert("Please select a file to import");
      return;
    }
    alert(`Importing ${files.length} file(s)...`);
    // Handle import logic here
    setFiles([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900 md:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-lg font-bold text-primary-600 dark:text-primary-400">
            Purchase Import
          </h1>
          <div className="mt-1 h-[2px] w-12 bg-primary-500" />
        </div>
       
      </div>

      {/* Main Content */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="p-6">
          {/* Excel File Icon */}
          <div className="mb-6 flex flex-col items-center justify-center">
            <div className="mb-2 rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
              <svg
                className="h-12 w-12 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Excel File Import
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Upload your Excel file to import purchase data
            </p>
          </div>

          {/* FilePond Upload */}
          <div className="mx-auto max-w-2xl">
            <FilePond
              onupdatefiles={(fileItems) => {
                setFiles(fileItems.map((fileItem) => fileItem.file));
              }}
              labelIdle='Drag & Drop your file or <span class="filepond--label-action">Browse</span>'
              acceptedFileTypes={[
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "application/vnd.ms-excel",
                ".xlsx",
                ".xls",
              ]}
              maxFiles={1}
              allowMultiple={false}
            />
          </div>

          {/* Import Button */}
          <div className="mt-6 flex justify-center">
            <Button
              color="primary"
              onClick={handleImport}
              className="min-w-[200px]"
              disabled={files.length === 0}
            >
              <ArrowUpTrayIcon  className="mr-2 h-4 w-4" />
              Import Purchase
            </Button>
          </div>

          {/* Instructions */}
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <h4 className="mb-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
              Instructions:
            </h4>
            <ul className="list-disc space-y-1 pl-4 text-xs text-gray-600 dark:text-gray-400">
              <li>Upload only Excel files (.xlsx, .xls)</li>
              <li>Maximum file size: 5MB</li>
              <li>Ensure the file follows the required format</li>
              <li>The imported data will be added to the purchase register</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}