import { useEffect, useState } from "react";

function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
fetch("https://studyzone-11.onrender.com/materials/")
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching materials:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading materials...</p>;

  return (
    <div>
      <h2>Available Materials</h2>

      {materials.length === 0 && <p>No materials found</p>}

      {materials.map((m) => (
        <div key={m.id} style={{ marginBottom: "15px" }}>
          <h3>{m.title}</h3>
          <p>
            {m.subject} | Semester {m.semester}
          </p>

          {m.file_url && (
            <a
              href={`https://studyzone-11.onrender.com${m.file_url}`}
              target="_blank"
              rel="noreferrer"
            >
              📄 Open PDF
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default MaterialList;
