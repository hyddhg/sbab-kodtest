import Urls from "@/urls/urls";

export default async function getLineStops() {
  // no-store removes the error, can't use cache when the data is bigger than 2MB
  const res = await fetch(Urls.lineStops.get, { cache: "no-store" });

  if (!res.ok) {
    // This will activate the closest `error.tsx` Error Boundary
    throw new Error("Could not fetch the stops for a line!");
  }

  return res.json();
}
