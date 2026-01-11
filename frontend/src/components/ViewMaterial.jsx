import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaTelegramPlane, FaDownload, FaExpand } from "react-icons/fa";


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
    <div style={{ padding: "10px" }}>
      {/* TOP BAR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px"
        }}
      >
        {/* Back */}
        <button onClick={() => navigate(-1)}>←back</button>

        <span
              style={{
                fontWeight: "600",
                fontSize: "16px",
                textAlign: "center",
                flex: 1
              }}
            >
              {material.title}
            </span>

       

        {/* Icons */}
        {/* Icons */}
<div
  className="icon-bar"
  style={{
    display: "flex",
    alignItems: "center",
    gap: "14px"
  }}
>
  <a href={`https://wa.me/?text=${window.location.href}`}
    target="_blank"
    rel="noreferrer"
    className="icon-btn whatsapp"
  >
    <FaWhatsapp />
  </a>

  <a href={`https://t.me/share/url?url=${window.location.href}`}
    target="_blank"
    rel="noreferrer"
    className="icon-btn telegram"
  >
    <FaTelegramPlane />
  </a>

  <button className="icon-btn dd" onClick={downloadFile}>
    <FaDownload />
  </button>

  <button
    className="icon-btn dd"
    onClick={() => window.open(material.file_url, "_blank")}
  >
    <FaExpand />
  </button>
</div>

      </div>

      {/* PDF VIEWER */}
      <div  
        style={{
          height: "80vh",
          border:"2px red solid",
          borderRadius: "10px",
          marginBottom:"25px",
          overflow: "hidden",
          background: "#000"
        }}
      >
        <embed  className="lastpdf"
          src={`${material.file_url}#toolbar=0&navpanes=0&scrollbar=1`}
          type="application/pdf"
          width="100%"
          height="100%"
          style={{ display: "block"}}
        />
      </div>
    </div>
  );
}

export default ViewMaterial;
