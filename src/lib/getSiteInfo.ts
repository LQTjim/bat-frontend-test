export default async function getSiteInfoFetcher(url: string) {
  const res = await fetch(url);
  return res.json();
}
