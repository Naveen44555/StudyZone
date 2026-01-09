function MaterialCard({ material }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px" }}>
      <h3>{material.title}</h3>
      <p>Subject: {material.subject}</p>
      <p>Semester: {material.semester}</p>
      <p>Module: {material.module}</p>

      <button onClick={() => window.open(material.file_url, "_blank")}>
        View Note
      </button>

      <p>👁 {material.views_count} | ⬇ {material.downloads_count}</p>
    </div>
  );
}

export default MaterialCard;
