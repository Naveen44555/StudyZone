function MaterialCard({ material }) {
  const handleView = () => {
    window.open(
      `http://127.0.0.1:8000/materials/${material.id}/view/`,
      "_blank"
    );
  };

  const handleDownload = () => {
    window.location.href =
      `http://127.0.0.1:8000/materials/${material.id}/download/`;
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >
      {/* PDF ICON */}
      <div style={{ fontSize: "40px", textAlign: "center" }}>📄</div>

      <h3>{material.title}</h3>

      <p><b>Subject:</b> {material.subject}</p>
      <p><b>Semester:</b> {material.semester}</p>
      <p><b>Module:</b> {material.module}</p>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleView} style={{ marginRight: "10px" }}>
          View
        </button>
        <button onClick={handleDownload}>
          Download
        </button>
      </div>

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        👁 {material.views_count} | ⬇ {material.downloads_count}
      </p>
    </div>
  );
}

export default MaterialCard;
