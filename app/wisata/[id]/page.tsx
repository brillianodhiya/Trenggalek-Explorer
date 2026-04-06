import WisataDetail from "@/pages/WisataDetail";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WisataDetail id={id} />;
}
