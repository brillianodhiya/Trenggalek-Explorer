"use client";

import dynamic from "next/dynamic";
import { use } from "react";

const WisataDetail = dynamic(() => import("@/views/WisataDetail"), {
  ssr: false,
});

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <WisataDetail id={id} />;
}
