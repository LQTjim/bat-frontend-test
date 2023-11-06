"use client";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import Selector from "./Selector";
import InfoTable from "./InfoTable";
import useSWR from "swr";
import getSiteInfoFetcher from "@/lib/getSiteInfo";
export type ActionType = { type: "sortBySbi" | "sortByBemp" | "reset" };
type SortByState = "" | "sbiAsce" | "sbiDesc" | "bempAsce" | "bempDesc";
const initialSortState: SortByState = "";
const reducer = (state: SortByState, action: ActionType) => {
  switch (action.type) {
    case "sortBySbi":
      if (state === "sbiAsce") {
        return "sbiDesc";
      }
      if (state === "sbiDesc") {
        return initialSortState;
      }
      return "sbiAsce";

    case "sortByBemp":
      if (state === "bempAsce") {
        return "bempDesc";
      }
      if (state === "bempDesc") {
        return initialSortState;
      }
      return "bempAsce";

    case "reset":
      return initialSortState;

    default:
      return initialSortState;
  }
};

export default function Ubike() {
  const [city, setCity] = useState("台北市");
  const [search, setSearch] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [sortBy, dispatchSortBy] = useReducer(reducer, initialSortState);
  const { data, isLoading } = useSWR<SiteInfo[]>(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json",
    getSiteInfoFetcher,
    { revalidateOnMount: true }
  );
  const availableDistricts = useMemo(() => {
    /* 因為沒有別的縣市API這邊偷吃步。 */
    if (city !== "台北市") {
      return [];
    }
    return Array.from(new Set(data?.map((v) => v.sarea)));
  }, [data, city]);
  const displayData = useMemo(() => {
    /* 多做這一步是因為原本API的資料有大量且重複的內容。
    後來又突然沒有這個行為了，不過先記著
    let result: SiteInfo[] | undefined = data?.reduce((unique, cur) => {
      if (!unique.some((u) => u?.sno === cur.sno)) {
        unique.push(cur);
      }

      return unique;
    }, [] as SiteInfo[]);*/
    let result: SiteInfo[] | undefined;
    if (city === "台北市") {
      result = data;
    } else {
      result = [];
    }
    if (
      availableDistricts.length > 0 &&
      selectedDistricts.length !== availableDistricts.length
    ) {
      result = result?.filter((v) => selectedDistricts.includes(v.sarea));
    }
    if (search) {
      result = result?.filter((v) => v.sna.includes(search));
    }

    const sortByResult = (result?.length && [...result]) || [];
    switch (sortBy) {
      case "sbiAsce":
        sortByResult?.sort((a, b) => {
          return a.sbi - b.sbi;
        });
        return sortByResult;
      case "sbiDesc":
        sortByResult?.sort((a, b) => {
          return b.sbi - a.sbi;
        });
        return sortByResult;
      case "bempAsce":
        sortByResult?.sort((a, b) => {
          return a.bemp - b.bemp;
        });
        return sortByResult;
      case "bempDesc":
        sortByResult?.sort((a, b) => {
          return b.bemp - a.bemp;
        });
        return sortByResult;

      default:
        return result;
    }
  }, [data, city, selectedDistricts, search, sortBy]);
  useEffect(() => {
    setSearch("");
  }, [data, city]);

  return (
    <main className="text-[16px] sm:text-[18px]">
      <Selector
        city={city}
        setCity={setCity}
        setSearch={setSearch}
        search={search}
        availableDistricts={availableDistricts}
        selectedDistricts={selectedDistricts}
        setSelectedDistricts={setSelectedDistricts}
        isLoading={isLoading}
      />
      <InfoTable
        city={city}
        data={displayData}
        isLoading={isLoading}
        sortBy={sortBy}
        dispatchSortBy={dispatchSortBy}
      />
    </main>
  );
}
