import { useEffect, useState } from "react";
import { uploadMaterial } from "../services/upload";
import { saveMaterial } from "../services/api";
import MaterialCard from "./MaterialCard";


// ---
function MaterialList() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/materials/approved/")
      .then(res => res.json())
      .then(data => setMaterials(data));
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}
    >
      {materials.map(m => (
        <MaterialCard key={m.id} material={m} />
      ))}
    </div>
  );
}

export default MaterialList;


// ---
