import React, { useEffect, useState } from "react";
type SelectCityProps = {
  city: string;
  setCity: (v: string) => void;
};
export default function SelectCity({ city, setCity }: SelectCityProps) {
  const [isOpen, setIsOpen] = useState(false);
  /* 當點外面的元素時，關閉掉select */
  useEffect(() => {
    const listener = () => {
      setIsOpen(false);
    };
    window.addEventListener("click", listener);

    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  const handleOpenClick = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  const handleOptionClickHOF = (v: string) => {
    return () => {
      setCity(v);
    };
  };
  return (
    <label
      onClick={handleOpenClick}
      className="w-full order-last sm:order-none sm:w-[30%] sm:min-w-[120px] cursor-pointer "
    >
      <div
        className={`cursor-pointer bg-dark-gray rounded-[8px] p-[8px_16px] w-full relative select-none ${
          isOpen
            ? "before:border-b-[8px] before:border-r-[5px] before:border-r-[transparent] before:border-l-[5px] before:border-l-[transparent] before:absolute before:right-[10px] before:top-[45%]"
            : "before:border-t-[8px] before:border-r-[5px] before:border-r-[transparent] before:border-l-[5px] before:border-l-[transparent] before:absolute before:right-[10px] before:top-[45%]"
        }`}
      >
        {city}
        <div
          className={`cursor-auto absolute top-[50px] left-0 z-10 w-full rounded-[8px] p-2 bg-dark-gray select-none ${
            isOpen ? "block" : "opacity-0 invisible"
          } transition-all `}
        >
          {["選擇縣市", "台北市", "高雄市"].map((v, i) => (
            <div
              onClick={handleOptionClickHOF(v)}
              className="cursor-pointer rounded-sm hover:bg-gray p-2"
              key={i}
            >
              {v}
            </div>
          ))}
        </div>
      </div>
    </label>
  );
}
