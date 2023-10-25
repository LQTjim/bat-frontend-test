"use client";
import React, { useState } from "react";
import Image from "next/image";
import { SlMagnifier } from "react-icons/sl";
export default function Selector() {
  const [selectedCity, setSelectedCity] = useState({
    city: "選擇縣市",
    value: "",
  });
  return (
    <section className="flex sm:gap-[50px] m-auto max-w-[1440px] lg:gap-[100px] xl:gap-[150px] lg:p-[32px_124px] md:p-[24px_62px] p-[24px_32px]">
      <div className="w-full sm:w-1/2 flex flex-col gap-[16px] lg:gap-[32px]">
        <h2 className="text-main tracking-[4px] font-bold ">站點資訊</h2>
        <div className="flex gap-[16px] w-full sm:flex-row flex-col">
          <label
            tabIndex={0}
            onClick={(e) => {
              console.log(e.currentTarget.matches(":focus"));
            }}
            className="w-full order-last sm:order-none sm:w-[30%] sm:min-w-[120px] cursor-pointer [&:focus>div>div]:block"
          >
            <div className="triangle cursor-pointer bg-dark-gray rounded-[8px] p-[8px_16px] w-full relative ">
              {selectedCity.city}
              <div className="cursor-auto absolute top-[calc(100%+5px)] left-0 z-10 w-full rounded-[8px]  p-3 bg-dark-gray hidden">
                {[
                  { city: "選擇縣市", value: "" },
                  { city: "台北市", value: "台北市" },
                ].map((v, i) => (
                  <div className="cursor-pointer" key={i}>
                    {v.city}
                  </div>
                ))}
              </div>
            </div>
          </label>
          <label className="sm:w-[70%] relative">
            <input
              className="w-full bg-dark-gray rounded-[8px] p-[8px_16px]"
              type="text"
              placeholder="選擇站點"
            />
            <div className="absolute right-[5px] top-[13px]">
              <SlMagnifier />
            </div>
            <div className="absolute top-[45px] z-10 p-3 bg-dark-gray w-full rounded-[8px] hidden">
              {Array(10)
                .fill({ sna: "台北站" })
                .map((v, i) => (
                  <div key={i}>{v.sna}</div>
                ))}
            </div>
          </label>
        </div>
        <label className="cursor-pointer flex items-center gap-[16px] w-fit">
          <input
            className="peer/checkall"
            type="checkbox"
            defaultChecked
            hidden
          />
          <div
            className="w-[15px] h-[15px] 
            border border-border-gray  relative peer-checked/checkall:bg-main peer-checked/checkall:border-none before:w-[5px] before:h-[11px] before:absolute before:top-[1px] before:left-[5px] before:border-white before:border-t-0 before:border-r-[3px] before:border-b-[3px] before:border-l-0 before:rotate-45"
          ></div>
          <span className="">全部勾選</span>
        </label>
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(120px,max-content))] justify-between gap-y-[16px]">
          {Array(10)
            .fill(0)
            .map((v, i) => (
              <label key={i} className="flex items-center gap-[16px]">
                <input
                  className={`peer/check`}
                  type="checkbox"
                  defaultChecked
                  hidden
                />
                <div className="w-[15px] h-[15px] border border-border-gray peer-checked/check:bg-main relative peer-checked/check:border-none before:w-[5px] before:h-[11px] before:absolute before:top-[1px] before:left-[5px] before:border-white before:border-t-0 before:border-r-[3px] before:border-b-[3px] before:border-l-0 before:rotate-45"></div>
                <span className="">{i === 2 ? "這樣有五格自" : "中山區"}</span>
              </label>
            ))}
        </div>
      </div>
      <div className="w-1/2 self-end sm:block hidden">
        <Image width={700} height={700} src="/bike.svg" alt="bike" />
      </div>
    </section>
  );
}
