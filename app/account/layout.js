import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-rows-[auto_1fr]  grid-cols-1 lg:grid-cols-[16rem_1fr] min-h-full gap-0 lg:gap-12">
      <SideNavigation />
      <div className="p-4 sm:p-6 lg:p-0 ">{children}</div>
    </div>
  );
}
