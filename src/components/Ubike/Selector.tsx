"use client";
import React, { useLayoutEffect, useState } from "react";
import Image from "next/image";

import SelectCity from "./SelectCity";
import SiteSearch from "./SiteSearch";
import SelectDistricts from "./SelectDistricts";

type SelectorProps = {
  city: string;
  setCity: (v: string) => void;
  availableDistricts: string[];
  selectedDistricts: string[];
  setSelectedDistricts: (v: string[]) => void;
  setSearch: (v: string) => void;
  search: string;
  isLoading: boolean;
};
export default function Selector({
  city,
  setCity,
  setSearch,
  search,
  availableDistricts = [],
  selectedDistricts,
  setSelectedDistricts,
  isLoading,
}: SelectorProps) {
  useLayoutEffect(() => {
    setSelectedDistricts(availableDistricts);
  }, [availableDistricts]);

  return (
    <section className="flex sm:gap-[50px] m-auto max-w-[1440px] lg:gap-[100px] xl:gap-[150px] lg:p-[32px_124px] md:p-[24px_62px] p-[24px_32px]">
      <div className="w-full sm:w-1/2 flex flex-col">
        <h2 className="text-main tracking-[4px] font-bold mb-[16px] sm:mb-[32px]">
          站點資訊
        </h2>
        <div className="flex gap-[8px] sm:gap-[16px] w-full sm:flex-row flex-col mb-[16px] sm:mb-[24px]">
          {/* 選擇縣市 */}
          <SelectCity city={city} setCity={setCity} />
          {/* TODO輸入站點 */}
          <SiteSearch setSearch={setSearch} search={search} />
        </div>

        <SelectDistricts
          availableDistricts={availableDistricts}
          selectedDistricts={selectedDistricts}
          setSelectedDistricts={setSelectedDistricts}
          isLoading={isLoading}
        />
      </div>
      <div className="w-1/2 self-end sm:block hidden">
        <Image width={700} height={700} src="/bike.svg" alt="bike" />
      </div>
    </section>
  );
}
