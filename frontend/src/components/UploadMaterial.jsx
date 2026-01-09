import { useState } from "react";
import { uploadMaterial } from "../services/upload";
import { saveMaterial } from "../services/api";

function UploadMaterial() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file");
      return;
    }

    try {
      const fileUrl = await uploadMaterial(file);

      await saveMaterial({
        title: "js unit1",
        subject: "javascript",
        semester: 2,
        module: 1,
        category: "notes",
        file_url: fileUrl,
      });

      alert("Upload successful");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h3>Upload Material</h3>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        Upload to Supabase
      </button>
    </div>
  );
}

export default UploadMaterial;
