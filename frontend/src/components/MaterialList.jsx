import { useEffect, useState } from "react";
import MaterialCard from "./MaterialCard";
// import "./index.css";

const user = {
  role: "admin" // or "student"
};

function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");
  const [module, setModule] = useState("");


  useEffect(() => {
    fetch("http://127.0.0.1:8000/materials/approved/")
      .then(res => res.json())
      .then(data => setMaterials(data));
  }, []);

  const filteredMaterials = materials.filter(m =>
  m.subject.toLowerCase().includes(search.toLowerCase()) &&
  (semester === "" || m.semester == semester) &&
  (module === "" || m.module == module)
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
            onChange={e => setSemester(e.target.value)} >
            <option value="">All Semesters</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
          </select>

          <select
              value={module}
              onChange={e => setModule(e.target.value)}
            >
              <option value="">All Modules</option>
              <option value="1">Module 1</option>
              <option value="2">Module 2</option>
              <option value="3">Module 3</option>
            </select>

             {/* ✅ RESET BUTTON */}
            <button
              onClick={() => {
                setSearch("");
                setSemester("");
                setModule("");
              }}
            >
              Reset
            </button>            

      </div>

      {/* CARDS */}
      <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
           <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
      <div
          className="material-grid"
          style={{
            display: "grid",
            gap: "20px",
            padding: "20px",
          }} >

   
    {filteredMaterials.map((m) => (
  <MaterialCard
    key={m.id}
    material={m}
    user={user}
  />
))}


  </div>
</div>


</div>

    </>
  );
}

export default MaterialList;
