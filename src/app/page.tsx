import type { Metadata } from "next";
import Ubike from "@/components/Ubike/Ubike";

export const metadata: Metadata = {
  title: "Ubike-站點資訊",
};

export default function Home() {
  return <Ubike />;
}
