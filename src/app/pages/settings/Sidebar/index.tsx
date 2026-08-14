// Import Dependencies
import { useMemo, useState } from "react";
import { useLocation } from "react-router";

// Local Imports
import { MainPanel } from "@/app/layouts/MainLayout/Sidebar/MainPanel";
import { PrimePanel } from "@/app/layouts/MainLayout/Sidebar/PrimePanel";
import { navigation } from "@/app/navigation";
import { baseNavigation } from "@/app/navigation/baseNavigation";
import { settings } from "@/app/navigation/segments/settings";
import { useSidebarContext } from "@/app/contexts/sidebar/context";
import { SidebarPanel } from "./SidebarPanel";

// ----------------------------------------------------------------------

type SegmentPath = string | undefined;

export function Sidebar() {
  const { pathname } = useLocation();
  const { close } = useSidebarContext();

  const [activeSegmentPath, setActiveSegmentPath] = useState<SegmentPath>(
    settings.path,
  );

  const currentSegment = useMemo(
    () => navigation.find((item) => item.path === activeSegmentPath),
    [activeSegmentPath],
  );

  return (
    <>
      <MainPanel
        nav={baseNavigation}
        activeSegmentPath={activeSegmentPath}
        setActiveSegmentPath={setActiveSegmentPath}
      />
      {activeSegmentPath === settings.path ? (
        <SidebarPanel />
      ) : (
        <PrimePanel
          close={close}
          currentSegment={currentSegment}
          pathname={pathname}
        />
      )}
    </>
  );
}