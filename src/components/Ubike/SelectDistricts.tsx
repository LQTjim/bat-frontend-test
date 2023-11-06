import React from "react";
type SelectDistrictsProps = {
  availableDistricts: string[];
  selectedDistricts: string[];
  setSelectedDistricts: (v: string[]) => void;
  isLoading: boolean;
};
export default function SelectDistricts({
  availableDistricts,
  selectedDistricts,
  setSelectedDistricts,
  isLoading,
}: SelectDistrictsProps) {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked) {
      setSelectedDistricts(
        selectedDistricts.filter((v) => v !== e.currentTarget.value)
      );
    } else {
      setSelectedDistricts([...selectedDistricts, e.currentTarget.value]);
    }
  };
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setSelectedDistricts(availableDistricts);
    } else {
      setSelectedDistricts([]);
    }
  };
  return isLoading ? (
    <Skeleton />
  ) : (
    <>
      {/* TODO全選站點 */}
      <label className="cursor-pointer flex items-center gap-[16px] w-fit mb-[24px]">
        <input
          className="peer/checkall"
          type="checkbox"
          hidden
          onChange={handleCheckAll}
          checked={selectedDistricts.length === availableDistricts.length}
        />
        <div
          className="w-[15px] h-[15px] 
            border border-border-gray  relative peer-checked/checkall:bg-main peer-checked/checkall:border-none before:w-[5px] before:h-[11px] before:absolute before:top-[1px] before:left-[5px] before:border-white before:border-t-0 before:border-r-[3px] before:border-b-[3px] before:border-l-0 before:rotate-45"
        ></div>
        <span className="">全部勾選</span>
      </label>
      {/* TODO複選站點 */}
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(120px,max-content))] justify-between gap-y-[16px]">
        {availableDistricts.map((v, i) => (
          <label
            key={i}
            className="flex items-center gap-[16px] cursor-pointer"
          >
            <input
              className={`peer/check`}
              type="checkbox"
              checked={selectedDistricts.includes(v)}
              hidden
              value={v}
              onChange={handleCheck}
            />
            <div className="w-[15px] h-[15px] border border-border-gray peer-checked/check:bg-main relative peer-checked/check:border-none before:w-[5px] before:h-[11px] before:absolute before:top-[1px] before:left-[5px] before:border-white before:border-t-0 before:border-r-[3px] before:border-b-[3px] before:border-l-0 before:rotate-45"></div>
            <span>{v}</span>
          </label>
        ))}
      </div>
      {/*
        切版選擇二
        <div className="w-full flex flex-wrap justify-between gap-y-[16px]">
          {Array(10)
            .fill(0)
            .map((v, i) => (
              <label key={i} className="inline-flex items-center gap-[16px]">
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
        </div>*/}
    </>
  );
}

function Skeleton() {
  return (
    <>
      <div className="w-[50px] bg-dark-gray rounded mb-1 animate-pulse">
        &nbsp;
      </div>

      <div className="flex flex-wrap gap-1 animate-pulse">
        {Array(15)
          .fill("")
          .map((v, i) => (
            <div className="w-[50px] bg-dark-gray rounded" key={i}>
              &nbsp;
            </div>
          ))}
      </div>
    </>
  );
}
