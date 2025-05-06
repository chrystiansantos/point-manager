export async function deleteArea(areaSelectId: string) {
  return fetch(`/area/${areaSelectId}`, {
    method: "DELETE",
  });
}
