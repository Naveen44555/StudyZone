import { useEffect, useState } from "react";
import MaterialCard from "./MaterialCard";

function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/materials/approved/")
      .then(res => res.json())
      .then(data => setMaterials(data));
  }, []);

  const filteredMaterials = materials.filter(m =>
    m.subject.toLowerCase().includes(search.toLowerCase()) &&
    (semester === "" || m.semester == semester)
  );

  return (
    <>
      {/* FILTER BAR */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search subject"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={semester}
          onChange={e => setSemester(e.target.value)}
        >
          <option value="">All Semesters</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
        </select>
      </div>

      {/* CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px"
        }}
      >
        {filteredMaterials.map(m => (
          <MaterialCard key={m.id} material={m} />
        ))}
      </div>
    </>
  );
}

export default MaterialList;
