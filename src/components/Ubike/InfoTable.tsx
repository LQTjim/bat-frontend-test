import React from "react";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { ActionType } from "./Ubike";
type InfoTableProps = {
  city: string;
  data: SiteInfo[] | undefined;
  isLoading: boolean;
  sortBy: string;
  dispatchSortBy: (v: ActionType) => void;
};
/* sno(站點代號)、sna(中文場站名稱)、tot(場站總停車格)、sbi(可借車位數)、sarea(中文場站區域)、mday(資料更新時間)、lat(緯度)、lng(經度)、ar(中文地址)、sareaen(英文場站區域)、snaen(英文場站名稱)、aren(英文地址)、bemp(可還空位數)、act(場站是否暫停營運) */
export default function InfoTable({
  city,
  data = [],
  isLoading,
  sortBy,
  dispatchSortBy,
}: InfoTableProps) {
  /* 排序用 */
  const handleTableHeadClickHOF = (v: "sortBySbi" | "sortByBemp" | "reset") => {
    return () => {
      dispatchSortBy({ type: v });
    };
  };
  return (
    <section>
      <div className="m-auto max-w-[1440px] lg:px-[124px] md:px-[62px] px-[32px] pb-10">
        <div className="sm:w-full m-w-[311px] overflow-x-auto border-[0.5px] border-border-gray rounded-[8px]">
          <table className=" min-w-[500px] w-full">
            <thead className="bg-main text-center text-white text-[16px] whitespace-nowrap">
              <tr>
                <th className="p-[21px_22px] font-medium">縣市</th>
                <th className="p-[21px_22px]  font-medium">區域</th>
                <th className="p-[21px_22px] font-medium">站點名稱</th>
                <th
                  className="p-[21px_22px]  font-medium cursor-pointer flex items-center"
                  onClick={handleTableHeadClickHOF("sortBySbi")}
                >
                  <span className="flex items-center gap-2">
                    可借車輛
                    {sortBy === "" && null}
                    {sortBy === "sbiAsce" && <BiSolidUpArrow />}
                    {sortBy === "sbiDesc" && <BiSolidDownArrow />}
                  </span>
                </th>
                <th
                  className="p-[21px_22px]  font-medium cursor-pointer"
                  onClick={handleTableHeadClickHOF("sortByBemp")}
                >
                  <span className="flex items-center gap-2">
                    可還空位
                    {sortBy === "" && null}
                    {sortBy === "bempAsce" && <BiSolidUpArrow />}
                    {sortBy === "bempDesc" && <BiSolidDownArrow />}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {city === "選擇縣市" && <TrTemplate>請選擇縣市</TrTemplate>}
              {!isLoading && data?.length === 0 && city !== "選擇縣市" && (
                <TrTemplate>找不到站點</TrTemplate>
              )}
              {!isLoading &&
                data?.length > 0 &&
                data?.map((v, i) => (
                  <tr
                    className="text-center [&:nth-of-type(even)]:bg-dark-gray text-[14px] sm:text-[16px] [&>td]:py-[24px]"
                    key={i}
                  >
                    <td className="font-normal pl-[16px]">台北市</td>
                    <td className="font-normal">{v.sarea}</td>
                    <td className="font-normal text-start sm:text-center">
                      {v.sna}
                    </td>
                    <td className="font-normal text-main">{v.sbi}</td>
                    <td className="font-normal text-main">{v.bemp}</td>
                  </tr>
                ))}
              {isLoading && <TrTemplate>Loading...</TrTemplate>}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
type TrTemplateProps = { children?: React.ReactNode };
function TrTemplate({ children }: TrTemplateProps) {
  return (
    <tr>
      <td className="text-center p-3 tracking-[10px]" colSpan={5}>
        {children}
      </td>
    </tr>
  );
}
