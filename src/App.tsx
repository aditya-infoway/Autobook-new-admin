// Import Dependencies
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";

// Local Imports
import { AuthProvider } from "@/app/contexts/auth/Provider";
import { BreakpointProvider } from "@/app/contexts/breakpoint/Provider";
import { LocaleProvider } from "@/app/contexts/locale/Provider";
import { SidebarProvider } from "@/app/contexts/sidebar/Provider";
import { ThemeProvider } from "@/app/contexts/theme/Provider";
import router from "./app/router/router";

// Splash Image
import splashImage from "./assets/splash.png";

// ----------------------------------------------------------------------

function App() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Only run the splash logic inside the Capacitor Android/iOS app.
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const startApp = async () => {
      try {
        // Hide the native Android splash
        await SplashScreen.hide();
      } catch (error) {
        console.log("Splash screen hide error:", error);
      }

      // Show full-screen splash only inside the mobile app
      setShowSplash(true);

      timer = setTimeout(() => {
        setShowSplash(false);
      }, 1500);
    };

    startApp();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <>
      {showSplash && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999999,
            backgroundColor: "#ffffff",
          }}
        >
          <img
            src={splashImage}
            alt="Amaar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      )}

      <AuthProvider>
        <ThemeProvider>
          <LocaleProvider>
            <BreakpointProvider>
              <SidebarProvider>
                <RouterProvider router={router} />
              </SidebarProvider>
            </BreakpointProvider>
          </LocaleProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;