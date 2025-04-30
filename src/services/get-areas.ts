export async function getAreas() {
  return (await fetch("/api/area")).json();
}
