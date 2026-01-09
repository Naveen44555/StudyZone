import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaDownload,
  FaExpand
} from "react-icons/fa";

function ViewMaterial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/materials/${id}/`)
      .then(res => res.json())
      .then(data => setMaterial(data));
  }, [id]);

  if (!material) return <p>Loading...</p>;

  const downloadFile = async () => {
    const response = await fetch(material.file_url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = material.title + ".pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px"
        }}
      >
        <button onClick={() => navigate(-1)}>⬅ Back</button>

        {/* ICON ACTIONS */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <a
            href={`https://wa.me/?text=${window.location.href}`}
            target="_blank"
            title="Share on WhatsApp"
            style={{ color: "#25D366", fontSize: "37px",padding:"10px 3px"}}
          >
            <FaWhatsapp />
          </a>

          <a
            href={`https://t.me/share/url?url=${window.location.href}`}
            target="_blank"
            title="Share on Telegram"
            style={{ color: "#229ED9", fontSize: "37px" ,padding:"10px 13px"}}
          >
            <FaTelegramPlane />
          </a>

          <button
            onClick={downloadFile}
            title="Download PDF"
            style={{ fontSize: "18px" }}
          >
            <FaDownload />
          </button>
        </div>
      </div>

      <h2>{material.title}</h2>

      {/* MAIN LAYOUT */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "75% 25%",
          gap: "15px",
          height: "80vh"
        }}
      >
        {/* LEFT: PDF VIEW */}
        <div
          style={{
            border: "1px solid #ccc",
            overflow: "hidden"
          }}
        >
          <embed
            src={`${material.file_url}#toolbar=0&navpanes=0&scrollbar=1`}
            type="application/pdf"
            width="100%"
            height="100%"
            style={{ display: "block" }}
          />
        </div>

        {/* RIGHT: DETAILS */}
        <div
          style={{
            border: "1px solid #0bc37f",
            padding: "14px",
            borderRadius: "6px",
            background: "#fafafa"
          }}
        >
          <h4>Details</h4>
          <p><b>Subject:</b> {material.subject}</p>
          <p><b>Semester:</b> {material.semester}</p>
          <p><b>Module:</b> {material.module}</p>
          <p><b>Category:</b> {material.category}</p>

          <hr />

          <button
            onClick={() => window.open(material.file_url, "_blank")}
            style={{ width: "100%" }}
            title="Open Fullscreen"
          >
            <FaExpand /> Full View
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewMaterial;
