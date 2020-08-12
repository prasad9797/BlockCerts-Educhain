import React from "react";
import "../CSS/footer.css";

export default function Footer() {
  return (
    <section id="footer">
      <footer
        align="center"
        className="footer"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <a href="/dev" style={{ top: "50%", color: "black" }}>
          &copy; APSIT Dev Team
        </a>
      </footer>
    </section>
  );
}
