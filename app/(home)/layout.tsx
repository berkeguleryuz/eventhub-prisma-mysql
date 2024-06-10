import Topbar from "@/components/layout/Topbar";
import "../globals.css";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Topbar />
      {children}
    </div>
  );
};

export default HomeLayout;
