"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";


export default function Search({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrik-0 ">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="search"
        spellCheck="false"
        data-ms-editor="true"
        autoComplete="off"
        onChange={(e) => handleSearch(e.target.value)}
        className="peer block w-full rounded-md border border-neutral py-[9px] pl-10 text-sm outline-2
         placeholder:text-neutral-foreground focus:ring-primary focus:border-primary sm:text-sm"
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral peer-focus:text-neutral" />
    </div>
  );
}
