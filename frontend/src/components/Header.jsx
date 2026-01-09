function Header() {
  return (
    <div
      style={{
        padding: "15px 30px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h2>📚 StudyZone</h2>

      <div>
        <button style={{ marginRight: "10px" }}>
          Ask Doubts
        </button>
        <button>
          Upload Notes
        </button>
      </div>
    </div>
  );
}

export default Header;
