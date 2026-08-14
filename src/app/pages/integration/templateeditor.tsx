import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export default function TemplateEditor() {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState("Untitled Template");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef<HTMLDivElement>(null);
  const unlayerRef = useRef<any>(null);
  const isInitializedRef = useRef(false);
  const scriptLoadedRef = useRef(false);

  // Load Unlayer editor
  useEffect(() => {
    // Prevent duplicate initialization
    if (isInitializedRef.current) {
      return;
    }

    // Check if editor container exists
    if (!editorRef.current) {
      return;
    }

    // Guards against StrictMode's mount -> cleanup -> remount cycle:
    // `cancelled` stops any pending retry timeout left over from a
    // discarded mount, and `retryTimeout` lets us clear it directly.
    let cancelled = false;
    let retryTimeout: ReturnType<typeof setTimeout> | undefined;

    const initializeEditor = () => {
      if (cancelled) {
        return;
      }

      // @ts-ignore
      if (!window.unlayer) {
        // If unlayer is not available, try again after a delay
        retryTimeout = setTimeout(initializeEditor, 200);
        return;
      }

      // Bail out if another invocation already claimed init.
      // This must be set BEFORE calling .init(), synchronously,
      // not inside the async "design:loaded" listener - otherwise
      // a second mount (StrictMode) can slip past this guard and
      // call .init() again on the same container.
      if (isInitializedRef.current) {
        return;
      }
      isInitializedRef.current = true;

      // @ts-ignore
      unlayerRef.current = window.unlayer;

      // @ts-ignore
      window.unlayer.init({
        id: "editor-container",
        displayMode: "email",
        features: {
          preview: true,
          undoRedo: true,
          fullScreen: true,
        },
        tools: {
          text: true,
          image: true,
          button: true,
          divider: true,
          social: true,
          html: true,
        },
        project: {
          design: {
            body: {
              rows: [
                {
                  columns: [
                    {
                      contents: [
                        {
                          type: "text",
                          values: {
                            text: `
                              <h1 style="text-align: center; font-family: Arial, sans-serif; color: #1a1a1a;">
                                Welcome to Template Editor
                              </h1>
                              <p style="text-align: center; font-family: Arial, sans-serif; color: #666;">
                                Start editing your template by clicking on any element above.
                              </p>
                              <p style="text-align: center; font-family: Arial, sans-serif; color: #666;">
                                You can add text, images, buttons, and more from the right panel.
                              </p>
                            `,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
      });

      // @ts-ignore
      window.unlayer.addEventListener("design:loaded", () => {
        if (cancelled) return;
        setIsLoading(false);
        console.log("Editor loaded successfully");
      });

      // @ts-ignore
      window.unlayer.addEventListener("design:updated", (data: any) => {
        if (cancelled) return;
        console.log("Design updated:", data);
      });
    };

    const cleanup = () => {
      cancelled = true;
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
      if (unlayerRef.current) {
        try {
          // @ts-ignore
          window.unlayer?.destroy();
        } catch (e) {
          console.log("Editor already destroyed");
        }
        unlayerRef.current = null;
      }
      isInitializedRef.current = false;
    };

    // Check if script is already loaded
    // @ts-ignore
    if (window.unlayer) {
      initializeEditor();
      return cleanup;
    }

    // Check if script already exists in DOM
    const existingScript = document.getElementById("unlayer-script");
    if (existingScript) {
      initializeEditor();
      return cleanup;
    }

    // Load the script
    const script = document.createElement("script");
    script.src = "https://editor.unlayer.com/embed.js";
    script.async = true;
    script.id = "unlayer-script";

    script.onload = () => {
      scriptLoadedRef.current = true;
      initializeEditor();
    };

    script.onerror = () => {
      console.error("Failed to load Unlayer editor");
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      cleanup();

      // Only remove script if it was added by this component
      const scriptElement = document.getElementById("unlayer-script");
      if (scriptElement && !scriptLoadedRef.current) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    // @ts-ignore
    if (window.unlayer) {
      // @ts-ignore
      window.unlayer.exportHtml((data: any) => {
        console.log("Template HTML:", data.html);
        console.log("Template Design:", data.design);

        // Here you would save to your backend
        setTimeout(() => {
          setIsSaving(false);
          alert("Template saved successfully!");
          navigate("/integration/marketing");
        }, 1000);
      });
    } else {
      setIsSaving(false);
      alert("Editor is not ready. Please try again.");
    }
  };

  const handlePreview = () => {
    // @ts-ignore
    if (window.unlayer) {
      // @ts-ignore
      window.unlayer.preview();
    }
  };

  const handleExport = () => {
    // @ts-ignore
    if (window.unlayer) {
      // @ts-ignore
      window.unlayer.exportHtml((data: any) => {
        // Create a download link for the HTML
        const blob = new Blob([data.html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${templateName || "template"}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    }
  };

  const handleBack = () => {
    if (
      window.confirm(
        "Are you sure you want to leave? Unsaved changes will be lost.",
      )
    ) {
      navigate("/integration/marketing");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Template Editor
              </h1>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full min-w-[120px] border-0 border-b border-gray-300 bg-transparent text-sm text-gray-600 focus:border-blue-500 focus:outline-none sm:w-auto dark:border-gray-600 dark:text-gray-400"
                  placeholder="Enter template name"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isLoading && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Loading editor...
              </span>
            )}
            {/* <button
              onClick={handlePreview}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 sm:px-4"
            >
              <EyeIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Preview</span>
            </button> */}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:px-4 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white transition disabled:opacity-50 sm:px-4"
            >
              <DocumentArrowDownIcon className="h-4 w-4" />
              {isSaving ? (
                "Saving..."
              ) : (
                <span className="hidden sm:inline">Save Template</span>
              )}
              {/* {isSaving ? "Saving..." : <span className="sm:hidden">Save</span>} */}
            </button>
            <button
              onClick={handleBack}
              className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 inline-flex h-9 cursor-pointer items-center gap-2 rounded-md px-4 text-sm font-medium text-white transition"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor Container */}
      <div className="h-[calc(100vh-80px)] w-full">
        <div
          id="editor-container"
          ref={editorRef}
          className="h-full w-full"
          style={{ minHeight: "400px" }}
        />
        {isLoading && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Loading editor...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="fixed right-0 left-0 mb-10 border-t border-gray-200 bg-white px-4 py-2 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>by Unlayer Editor</span>
          </span>
        </div>
      </div>
    </div>
  );
}
