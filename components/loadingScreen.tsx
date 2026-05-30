"use client";

import React from "react";

// All 5 statuses are rendered into the DOM at once.
// CSS animation-delay staggers their visibility — no useEffect needed.
const STATUSES = [
  "Loading startups",
  "Connecting entrepreneurs",
  "Fetching pitches",
  "Building connections",
  "Almost ready",
] as const;

export default function Loading() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;600&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        /* ─────────────────────────────────────────────────────────
           THE KEY FIX: register --pct as an animatable <integer>
           so we can drive a CSS counter from it.
           This gives us a pure-CSS animated number display
           with ZERO dependency on React hydration / useEffect.
        ───────────────────────────────────────────────────────── */
        @property --pct {
          syntax: '<integer>';
          initial-value: 0;
          inherits: false;
        }

        /* ── Keyframes ───────────────────────────────────────────── */

        @keyframes cardIn {
          from { transform: scale(0.78) translateY(10px); opacity: 0; }
          to   { transform: scale(1)    translateY(0);    opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(-38px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes slideRight {
          from { transform: translateX(38px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(18px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes scanDown {
          0%   { top: -180px; }
          100% { top: 100vh; }
        }
        @keyframes blink {
          0%,49%   { opacity: 1; }
          50%,100% { opacity: 0; }
        }

        /* Progress bar fill — same as before, already worked */
        @keyframes loadingBar {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* Animates --pct from 0 → 100 over 5 s */
        @keyframes countUp {
          from { --pct: 0; }
          to   { --pct: 100; }
        }

        /* Each status item: fade in, hold, fade out within its 1-second slot */
        @keyframes statusAppear {
          0%   { opacity: 0; transform: translateY(6px); }
          15%  { opacity: 1; transform: translateY(0); }
          85%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-6px); }
        }

        /* ── Root ─────────────────────────────────────────────── */

        .vx-root {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: #E81F6A;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Barlow', sans-serif;
        }

        .vx-grid {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent 0px, transparent 71px,
            rgba(0,0,0,0.09) 71px, rgba(0,0,0,0.09) 72px
          );
          pointer-events: none;
        }

        .vx-scan {
          position: absolute;
          left: 0; right: 0;
          height: 200px;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,.065), transparent);
          animation: scanDown 4.5s ease-in-out infinite;
          pointer-events: none;
        }

        /* ── Card ─────────────────────────────────────────────── */

        .vx-inner {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 1;
        }

        .vx-card {
          border: 3px solid #000;
          box-shadow: 8px 8px 0 #000;
          overflow: hidden;
          animation: cardIn .62s cubic-bezier(.34,1.46,.64,1) .15s both;
        }

        .vx-card-top {
          background: #fff;
          padding: 20px 42px 16px;
          display: flex;
          align-items: center;
        }

        .vx-v {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(72px, 14.5vw, 172px);
          font-weight: 900;
          color: #0D0D0D;
          line-height: .88;
          letter-spacing: -.02em;
          animation: slideLeft .48s cubic-bezier(.34,1.3,.64,1) .55s both;
        }

        .vx-x {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(72px, 14.5vw, 172px);
          font-weight: 900;
          background: linear-gradient(175deg, #6B0000 0%, #BA1212 28%, #E23415 62%, #FF5C36 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: .88;
          letter-spacing: -.02em;
          animation: slideRight .48s cubic-bezier(.34,1.3,.64,1) .65s both;
        }

        .vx-card-bottom {
          background: #0D0D0D;
          border-top: 3px solid #000;
          padding: 10px 42px;
          text-align: center;
        }

        .vx-brand-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(12px, 1.9vw, 19px);
          font-weight: 700;
          color: #fff;
          letter-spacing: .5em;
          text-transform: uppercase;
        }

        /* ── Below card ───────────────────────────────────────── */

        .vx-tagline {
          font-size: clamp(9px, 1.25vw, 12px);
          font-weight: 600;
          color: rgba(255,255,255,.82);
          letter-spacing: .26em;
          text-transform: uppercase;
          margin-top: 28px;
          margin-bottom: 28px;
          animation: slideUp .42s ease 1.0s both;
        }

        .vx-progress-wrap {
          width: 345px;
          max-width: 80vw;
          animation: slideUp .42s ease 1.14s both;
        }

        .vx-progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 9px;
        }

        /* ── Status words (pure CSS cycling) ─────────────────── */

        .vx-status-wrap {
          position: relative;
          height: 13px;   /* one text line at 9.5px */
          flex: 1;
          overflow: hidden;
        }

        /* All items sit on top of each other; animation-delay decides
           whose turn it is. 'both' = backwards fill during delay (hidden)
           and forwards fill after (hidden again). */
        .vx-status-item {
          position: absolute;
          top: 0; left: 0;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: .22em;
          color: rgba(255,255,255,.78);
          text-transform: uppercase;
          white-space: nowrap;
          opacity: 0;
          animation: statusAppear 1s ease both;
        }

        .vx-status-item:nth-child(1) { animation-delay: 0s; }
        .vx-status-item:nth-child(2) { animation-delay: 1s; }
        .vx-status-item:nth-child(3) { animation-delay: 2s; }
        .vx-status-item:nth-child(4) { animation-delay: 3s; }
        .vx-status-item:nth-child(5) { animation-delay: 4s; }

        /* ── Percentage counter (pure CSS, no JS) ─────────────
           1. --pct is animated 0 → 100 over 5 s
           2. counter-reset ties the "pct" CSS counter to --pct
           3. ::after renders it as text via counter()
        ───────────────────────────────────────────────────────── */
        .vx-pct {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          margin-left: 12px;
          --pct: 0;
          animation: countUp 5s linear forwards;
          counter-reset: pct var(--pct);
        }

        .vx-pct::after {
          content: counter(pct) "%";
        }

        /* ── Track + Fill ─────────────────────────────────────── */

        .vx-track {
          height: 8px;
          background: rgba(0,0,0,0.16);
          border: 2.5px solid #000;
          overflow: hidden;
        }

        .vx-fill {
          height: 100%;
          background: #0D0D0D;
          animation: loadingBar 5s linear forwards;
        }

        /* ── Footer ───────────────────────────────────────────── */

        .vx-footer {
          position: absolute;
          bottom: 22px;
          left: 0; right: 0;
          text-align: center;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: .32em;
          color: rgba(0,0,0,.26);
          text-transform: uppercase;
          animation: slideUp .42s ease 1.4s both;
        }

        .vx-cursor {
          display: inline-block;
          animation: blink 1s step-end infinite;
        }
      `}</style>

      <div className="vx-root">
        <div className="vx-grid" />
        <div className="vx-scan" />

        <div className="vx-inner">

          {/* Logo card */}
          <div className="vx-card">
            <div className="vx-card-top">
              <span className="vx-v">V</span>
              <span className="vx-x">X</span>
            </div>
            <div className="vx-card-bottom">
              <span className="vx-brand-name">VENTURE &nbsp;·&nbsp; X</span>
            </div>
          </div>

          {/* Tagline */}
          <p className="vx-tagline">Pitch &nbsp;·&nbsp; Connect &nbsp;·&nbsp; Win</p>

          {/* Progress section */}
          <div className="vx-progress-wrap">
            <div className="vx-progress-header">

              {/* All status words are in the DOM; CSS decides which is visible */}
              <div className="vx-status-wrap">
                {STATUSES.map((status, i) => (
                  <span key={i} className="vx-status-item">
                    {status}<span className="vx-cursor">_</span>
                  </span>
                ))}
              </div>

              {/* Empty span — percentage rendered entirely by CSS ::after */}
              <span className="vx-pct" />

            </div>

            <div className="vx-track">
              <div className="vx-fill" />
            </div>
          </div>

        </div>

        <p className="vx-footer">
          VENTURE-X &copy; 2025 &nbsp;·&nbsp; Where Founders Meet Opportunity
        </p>
      </div>
    </>
  );
}