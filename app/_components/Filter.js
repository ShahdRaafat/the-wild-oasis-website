"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filterValue="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filterValue="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3
      </Button>
      <Button
        filterValue="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7
      </Button>
      <Button
        filterValue="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12
      </Button>
    </div>
  );
}
function Button({ filterValue, children, handleFilter, activeFilter }) {
  return (
    <button
      onClick={() => handleFilter(filterValue)}
      className={` px-5 py-2 hover:bg-primary-700 ${
        filterValue === activeFilter ? "bg-primary-700" : ""
      }`}
    >
      {children}
    </button>
  );
}
export default Filter;
