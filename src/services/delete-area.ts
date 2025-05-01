export async function deleteArea(areaSelectId: string) {
  return fetch(`/area?areaId=${areaSelectId}`, {
    method: "DELETE",
  });
}
