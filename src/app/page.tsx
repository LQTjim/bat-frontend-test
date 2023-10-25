import type { Metadata } from "next";
import Ubike from "@/components/Ubike/Ubike";

//https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json

export const metadata: Metadata = {
  title: "Ubike-站點資訊",
};

export default function Home() {
  return <Ubike />;
}
