import React from "react";
import "../CSS/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <section id="footer">
      <footer
        align="center"
        className="footer"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <a href="/dev" style={{ top: "50%", color: "black" }}>
          Made with <FontAwesomeIcon icon={faHeart} /> by Phyerwaal Dev
          Team
        </a>
      </footer>
    </section>
  );
}
