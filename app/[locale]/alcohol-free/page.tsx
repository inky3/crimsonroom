import { redirect } from "next/navigation";

export default async function AlcoholFreeLegacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/mocktails`);
}
