import { useEffect, useState } from "react";

function AdminPanel() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/materials/pending/")
      .then(res => res.json())
      .then(data => setMaterials(data));
  }, []);

  const approve = (id) => {
    fetch(`http://127.0.0.1:8000/materials/${id}/approve/`)
      .then(() => {
        setMaterials(materials.filter(m => m.id !== id));
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Approval</h2>

      {materials.map(m => (
        <div key={m.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h4>{m.title}</h4>
          <p>{m.subject}</p>

          <button onClick={() => approve(m.id)}>
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
