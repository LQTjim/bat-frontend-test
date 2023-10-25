"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const linksConfigs = [
  { to: "/instruction", title: "使用說明" },
  { to: "/charge-way", title: "收費方式" },
  { to: "/", title: "站點資訊" },
  { to: "/news", title: "最新消息" },
  { to: "/activity", title: "活動專區" },
];
function Nav() {
  const [toggleOpen, setToggleOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  /* resize的時候讓toggleOpen為false避免overflow=hidden影響 */
  useEffect(() => {
    const resizeCb = () => {
      setToggleOpen(false);
      console.log("first");
    };
    window.addEventListener("resize", resizeCb);

    return () => {
      window.removeEventListener("resize", resizeCb);
    };
  }, []);

  /* 
當toggleOpen true
設定body overflow hidden。
cleanup解綁
 */
  useEffect(() => {
    if (toggleOpen) {
      document.body.style.overflow = "visible";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [toggleOpen]);

  const handleToggleOpen = () => {
    setToggleOpen(!toggleOpen);
  };
  return (
    <header className="border-b-2 border-gray">
      <div className="flex justify-between sm:justify-center items-center max-w-[1440px] m-auto px-[32px] md:px-[64px] lg:px-[124px] h-nav-mobile lg:h-nav-desktop">
        <Link href="/" className="mr-[10px] lg:mr-[60px]">
          <Image width={95} height={95} src="/logo.svg" alt="logo" />
        </Link>
        <div className="hidden sm:flex items-center w-full justify-between ">
          <nav className="flex gap-[10px] lg:gap-[40px]">
            {linksConfigs.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                className={`text-main-dark  [&.active]:text-main [&.active]:font-bold font-medium text-[18px] ${
                  l.to === pathName ? "active" : ""
                }`}
              >
                {l.title}
              </Link>
            ))}
          </nav>
          <button className="bg-main rounded-[100px] px-[24px] py-[10px] text-white font-medium font-noto">
            登入
          </button>
        </div>
        <div onClick={handleToggleOpen} className="sm:hidden cursor-pointer">
          {toggleOpen ? (
            <AiOutlineClose size={25} color="#B5CC22" />
          ) : (
            <AiOutlineMenu size={25} color="#B5CC22" />
          )}
        </div>
        <div
          className={`absolute top-nav-mobile inset-0 z-10 bg-main flex flex-col justify-between p-[32px] ${
            toggleOpen ? "block" : "hidden"
          }`}
        >
          <nav className="flex flex-col gap-[32px]">
            {linksConfigs.map((l) => (
              <button
                onClick={() => {
                  router.push(l.to);
                  handleToggleOpen();
                }}
                key={l.to}
                className={`cursor-pointer text-start text-white  [&.active]:text-main-dark font-medium text-[18px] tracking-[3.24px] ${
                  l.to === pathName ? "active" : ""
                }`}
              >
                {l.title}
              </button>
            ))}
          </nav>
          <button className="cursor-pointer self-start bg-white text-main p-[10px_24px] rounded-[100px]">
            登出
          </button>
        </div>
      </div>
    </header>
  );
}

export default Nav;
