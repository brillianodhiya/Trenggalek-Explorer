"use client";

import dynamic from "next/dynamic";

const PetaWisata = dynamic(() => import("@/views/PetaWisata"), {
  ssr: false,
});

export default function Page() {
  return <PetaWisata />;
}
