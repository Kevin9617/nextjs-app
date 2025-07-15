'use client'

import { useState, useRef, useEffect } from "react";

const MAX_HEIGHT = 120; // px, adjust for about 3-4 lines

const PropertyDescriptions = ({ property }) => {
  const [expanded, setExpanded] = useState(false);
  const desc = property?.propertyDescription || "";
  const contentRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Only show button if content is taller than MAX_HEIGHT
    if (contentRef.current) {
      setShowButton(contentRef.current.scrollHeight > MAX_HEIGHT);
    }
  }, [desc]);

  return (
    <>
      <div
        style={{
          position: "relative",
          maxHeight: expanded ? "none" : `${MAX_HEIGHT}px`,
          overflow: expanded ? "visible" : "hidden",
          transition: "max-height 0.3s",
        }}
        ref={contentRef}
      >
        <p
          className="mb25"
          style={{
            wordBreak: "break-word",
            whiteSpace: "pre-line",
            marginBottom: 0,
          }}
        >
          {desc}
        </p>
        {!expanded && showButton && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "2.5em",
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 90%)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
      {showButton && (
        <p className="overlay_close" style={{ marginTop: 0 }}>
          <a
            className="text-thm fz14"
            style={{ cursor: "pointer", color: "#ff5a5f" }}
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "Show Less" : "Show More"} {" "}
            <span className="flaticon-download-1 fz12"></span>
          </a>
        </p>
      )}
    </>
  );
};

export default PropertyDescriptions;
