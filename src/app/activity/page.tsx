import type { Metadata } from "next";
import Drawing from "@/components/Drawing";

export const metadata: Metadata = {
  title: "Ubike-活動專區",
};
export default function Activity() {
  return (
    <div>
      <Drawing />
    </div>
  );
}
