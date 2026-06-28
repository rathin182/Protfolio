"use client";

import { Project } from "@/app/lib/data/projects";

interface ProjectCardProps extends Project {
  active?: boolean;
  onClick?: () => void;
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
  tech,
  active = false,
  onClick,
}: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative select-none"
      style={{
        width: "340px",
        cursor: active ? "default" : "pointer",
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          inset: "-20px",
          borderRadius: "56px",
          background: active
            ? "radial-gradient(ellipse at center, rgba(82,202,86,0.18) 0%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(82,202,86,0.06) 0%, transparent 70%)",
          filter: "blur(20px)",
          transition: "background 0.5s ease",
          pointerEvents: "none",
        }}
      />

      {/* Card body */}
      <div
        style={{
          position: "relative",
          width: "340px",
          borderRadius: "32px",
          overflow: "hidden",
          background: "linear-gradient(160deg, #0c1a14 0%, #071018 60%, #050d12 100%)",
          border: active
            ? "1px solid rgba(82,202,86,0.35)"
            : "1px solid rgba(82,202,86,0.1)",
          boxShadow: active
            ? "0 0 60px rgba(82,202,86,0.22), 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(82,202,86,0.15)"
            : "0 0 20px rgba(82,202,86,0.06), 0 20px 40px rgba(0,0,0,0.5)",
          transition: "border-color 0.5s ease, box-shadow 0.5s ease",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
          <img
            src={image}
            alt={title}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              pointerEvents: "none",
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(7,16,24,0.9) 100%)",
            }}
          />
          {/* Active badge */}
          {active && (
            <div
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                padding: "4px 12px",
                borderRadius: "999px",
                background: "rgba(82,202,86,0.15)",
                border: "1px solid rgba(82,202,86,0.4)",
                color: "#52ca56",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Featured
            </div>
          )}
        </div>

        {/* Separator glow */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(82,202,86,0.3), transparent)",
          }}
        />

        {/* Content */}
        <div style={{ padding: "24px 28px 28px" }}>
          {/* Project number */}
          <span
            style={{
              display: "block",
              fontSize: "42px",
              fontWeight: 900,
              color: "#52ca56",
              lineHeight: 1,
              opacity: active ? 1 : 0.7,
              transition: "opacity 0.4s ease",
              fontFamily: "inherit",
            }}
          >
            {/* {String(id).padStart(2, "0")} */}
          </span>

          {/* Title */}
          <h3
            style={{
              marginTop: "10px",
              fontSize: "22px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            style={{
              marginTop: "10px",
              fontSize: "13px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.55)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>

          {/* Tech pills */}
          <div
            style={{
              marginTop: "18px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {tech.map((item) => (
              <span
                key={item}
                style={{
                  padding: "4px 12px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(0,0,0,0.3)",
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* View Project */}
          {active && (
            <div
              style={{
                marginTop: "22px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#52ca56",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              <span>View Project</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="#52ca56"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Bottom floor glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(82,202,86,0.2), transparent)",
          }}
        />
      </div>
    </div>
  );
}