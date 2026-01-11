import { useEffect, useState } from "react";

function AdminDashboard() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/materials/approved/", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setMaterials(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Views</th>
            <th>Downloads</th>
            <th>Uploaded</th>
          </tr>
        </thead>

        <tbody>
          {materials.map(m => (
            <tr key={m.id}>
              <td>{m.title}</td>
              <td>{m.views_count}</td>
              <td>{m.downloads_count}</td>
              <td>{new Date(m.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
