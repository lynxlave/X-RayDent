import React, { useRef, useEffect } from "react";

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function NeonButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}: NeonButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    // Entrance pulse animation
    btn.style.animation = "neonEntrance 0.7s ease-out forwards";
  }, []);

  const paddingClass = size === "lg" ? "px-10 py-5" : "px-7 py-3.5";

  const isPrimary = variant === "primary";

  return (
    <>
      <style>{`
        @keyframes neonEntrance {
          0%   { box-shadow: 0 0 0px rgba(0,229,255,0), 0 0 0px rgba(123,97,255,0), inset 0 0 0px rgba(0,229,255,0); opacity: 0.7; }
          40%  { box-shadow: 0 0 18px rgba(0,229,255,0.55), 0 0 32px rgba(123,97,255,0.4), inset 0 0 10px rgba(0,229,255,0.12); opacity: 1; }
          70%  { box-shadow: 0 0 10px rgba(0,229,255,0.3), 0 0 20px rgba(123,97,255,0.2), inset 0 0 4px rgba(0,229,255,0.06); }
          100% { box-shadow: 0 0 12px rgba(0,229,255,0.35), 0 0 22px rgba(123,97,255,0.25), inset 0 0 6px rgba(0,229,255,0.08); opacity: 1; }
        }
        .neon-btn {
          position: relative;
          border: none;
          outline: none;
          cursor: pointer;
          border-radius: 14px;
          transition: transform 0.22s cubic-bezier(.4,0,.2,1), box-shadow 0.22s cubic-bezier(.4,0,.2,1), filter 0.22s;
          box-shadow:
            0 0 12px rgba(0,229,255,0.35),
            0 0 22px rgba(123,97,255,0.25),
            inset 0 0 6px rgba(0,229,255,0.08);
          /* Gradient border via padding+background trick */
          padding: 2px;
          background: linear-gradient(135deg, #7B61FF 0%, #00E5FF 50%, #FF2D78 100%);
        }
        .neon-btn:hover {
          transform: scale(1.03);
          box-shadow:
            0 0 20px rgba(0,229,255,0.55),
            0 0 38px rgba(123,97,255,0.45),
            0 0 60px rgba(0,229,255,0.2),
            inset 0 0 10px rgba(0,229,255,0.12);
          filter: brightness(1.08);
        }
        .neon-btn:active {
          transform: scale(0.98);
          box-shadow:
            0 0 7px rgba(0,229,255,0.22),
            0 0 14px rgba(123,97,255,0.18),
            inset 0 0 3px rgba(0,229,255,0.05);
          filter: brightness(0.96);
        }
        .neon-btn-inner {
          border-radius: 12px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          position: relative;
          overflow: hidden;
        }
        .neon-btn-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 60%, rgba(0,229,255,0.06) 100%);
          pointer-events: none;
        }
        .neon-btn-primary .neon-btn-inner {
          background: linear-gradient(135deg, rgba(0,229,255,0.92) 0%, rgba(11,60,93,0.88) 60%, rgba(123,97,255,0.82) 100%);
        }
        .neon-btn-secondary .neon-btn-inner {
          background: rgba(11, 60, 93, 0.06);
        }
        .neon-btn-secondary {
          background: linear-gradient(135deg, #7B61FF 0%, #00E5FF 50%, #FF2D78 100%);
        }
        .neon-btn-secondary:hover .neon-btn-inner {
          background: rgba(0,229,255,0.08);
        }
      `}</style>
      <button
        ref={btnRef}
        type={type}
        onClick={onClick}
        className={`neon-btn neon-btn-${variant} ${paddingClass} ${className}`}
        style={{ padding: "2px" }}
      >
        <div
          className="neon-btn-inner"
          style={{ padding: size === "lg" ? "18px 38px" : "12px 26px" }}
        >
          {children}
        </div>
      </button>
    </>
  );
}
