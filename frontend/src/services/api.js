const BASE_URL = "http://127.0.0.1:8000";

export async function getApprovedMaterials() {
  const res = await fetch(`${BASE_URL}/materials/approved/`);
  return res.json();
}
export async function saveMaterial(data) {
  const res = await fetch(`${BASE_URL}/materials/create/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export function viewMaterial(id) {
  return fetch(`${BASE_URL}/materials/view/${id}/`, {
    method: "POST",
  });
}

export function downloadMaterial(id) {
  return fetch(`${BASE_URL}/materials/download/${id}/`, {
    method: "GET",
  });
}



