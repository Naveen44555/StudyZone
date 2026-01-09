import { useNavigate } from "react-router-dom";

function MaterialCard({ material }) {
  const navigate = useNavigate();

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
     {/* ✅ PDF THUMBNAIL */}
      <img
            src={`https://docs.google.com/gview?url=${material.file_url}&embedded=true`}
            alt="PDF Preview"
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "4px",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/material/${material.id}`)}
          />


      <h3>{material.title}</h3>

      <p><b>Subject:</b> {material.subject}</p>
      <p><b>Semester:</b> {material.semester}</p>
      <p><b>Module:</b> {material.module}</p>

      <div style={{ marginTop: "10px" }}>
        {/* ✅ ROUTER NAVIGATION */}
        <button
          onClick={() => navigate(`/material/${material.id}`)}
          style={{ marginRight: "10px" }}
        >
          View
        </button>

        {/* ✅ DIRECT DOWNLOAD */}
        <a href={material.file_url} download>
          <button>Download</button>
        </a>
      </div>

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        👁 {material.views_count} | ⬇ {material.downloads_count}
      </p>
    </div>
  );
}

export default MaterialCard;
