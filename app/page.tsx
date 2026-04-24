import DesktopExplorer from "@/components/DesktopExplorer";
import MobileExplorer from "@/components/MobileExplorer";

export default function Home() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopExplorer />
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <MobileExplorer />
      </div>
    </>
  );
}