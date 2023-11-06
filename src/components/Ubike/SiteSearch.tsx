import React, { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { SlMagnifier } from "react-icons/sl";
import { RiDeleteBin5Line, RiDeleteBack2Line } from "react-icons/ri";

type SiteSearchProps = {
  setSearch: (v: string) => void;
  search: string;
};
export default function SiteSearch({ setSearch, search }: SiteSearchProps) {
  const labelRef = useRef<HTMLLabelElement>(null);
  /* 這個isClient用來解決typeahead是透過localstorage生成的所以在next pre-render時他會認為server和client不對稱。
  試過在上層的Selector內 用dynamic import這個SiteSearch元件，不過呈現時整個input出現會慢一拍
  也試過使用。suppressHydrationWarning但沒有什麼作用。
  */
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const [searchStorage, setSearchStorage] = useLocalStorage<string[]>(
    "search",
    []
  );
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();
    setSearch(value);
  };
  const handleSearchClean = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setSearch("");
  };
  const handleEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    e.currentTarget.blur();
    if (!e.currentTarget.value) {
      return;
    }
    const newSearchStorage = [...searchStorage];
    /* 清掉過多的部分關鍵字*/
    if (searchStorage.length > 5) {
      newSearchStorage.pop();
    }
    /* 重複的關鍵字就不進入localStorage */
    if (newSearchStorage.includes(e.currentTarget.value)) {
      return;
    }
    newSearchStorage.unshift(e.currentTarget.value);
    setSearchStorage(newSearchStorage);
  };
  const handleTypeaheadClickHOF = (v: string) => {
    return () => {
      setSearch(v);
      labelRef.current?.blur();
    };
  };
  /* 清除指定關鍵字 */
  const cleanLocalStorageHOF = (v: string) => {
    return () => {
      const newSearchStorage = searchStorage.filter((s) => s !== v);
      setSearchStorage(newSearchStorage);
    };
  };
  return (
    <div className="relative sm:w-[70%]">
      <label
        ref={labelRef}
        className=" relative [&:has(input:focus)~.typeahead]:visible [&:has(input:focus)~.typeahead]:opacity-100"
      >
        <input
          className="w-full bg-dark-gray rounded-[8px] p-[8px_60px_8px_16px] "
          type="text"
          placeholder="選擇站點"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleEnterClick}
        />
        <div className="absolute right-[8px] top-[3px] flex items-center gap-1">
          {search && (
            <div
              className="cursor-pointer rounded-full p-1 hover:bg-gray"
              onClick={handleSearchClean}
            >
              <RiDeleteBack2Line />
            </div>
          )}
          <SlMagnifier />
        </div>
      </label>
      {/* 這邊構成是為了配合點了以後的blur，若把這個div放在label內無法blur */}

      {isClient && searchStorage.length > 0 && (
        <div
          className="typeahead absolute top-[50px] z-10 p-3 bg-dark-gray w-full rounded-[8px] opacity-0 invisible transition-all"
          suppressHydrationWarning
        >
          {searchStorage.map((v, i) => (
            <div
              className="rounded-sm items-center justify-between flex  cursor-pointer"
              key={i}
            >
              <div
                className="hover:bg-gray p-2 w-full whitespace-nowrap text-ellipsis overflow-hidden"
                onClick={handleTypeaheadClickHOF(v)}
              >
                {v}
              </div>

              <i>
                <RiDeleteBin5Line
                  className="hover:bg-gray h-full p-4 w-[50px]"
                  onClick={cleanLocalStorageHOF(v)}
                />
              </i>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
