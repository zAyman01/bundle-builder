type IconProps = { className?: string };

import cameraVector from "../../public/camera-vector.png";
import planVector from "../../public/plan-vector.png";
import protectionVector from "../../public/protection-vector.png";
import sensorVector from "../../public/sensors-vector.png";

export const ChevronUp = ({ className = "w-3 h-3" }: IconProps) => (
  <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden="true">
    <path
      d="M2 7.5L6 3.5L10 7.5"
      stroke="#4E2FD2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronDown = ({ className = "w-3 h-3" }: IconProps) => (
  <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden="true">
    <path
      d="M2 4.5L6 8.5L10 4.5"
      stroke="#1F1F1F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Plus = ({
  className = "w-2 h-2",
  color = "#525963",
}: IconProps & { color?: string }) => (
  <svg viewBox="0 0 8 8" fill="none" className={className} aria-hidden="true">
    <path
      d="M4 0V8M0 4H8"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

export const Minus = ({
  className = "w-2 h-2",
  color = "#575757",
}: IconProps & { color?: string }) => (
  <svg viewBox="0 0 8 8" fill="none" className={className} aria-hidden="true">
    <path d="M0 4H8" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const CameraIcon = ({ className }: IconProps) => (
  <img src={cameraVector} className={`${className} object-contain`} alt="" draggable={false} />
);

export const PlanIcon = ({ className }: IconProps) => (
  <img src={planVector} className={`${className} object-contain`} alt="" draggable={false} />
);

export const ProtectionIcon = ({ className }: IconProps) => (
  <img src={protectionVector} className={`${className} object-contain`} alt="" draggable={false} />
);

export const SensorIcon = ({ className }: IconProps) => (
  <img src={sensorVector} className={`${className} object-contain`} alt="" draggable={false} />
);

export const ShieldIcon = ({ className = "w-6.5 h-6.5" }: IconProps) => (
  <svg viewBox="0 0 26 26" fill="none" className={className} aria-hidden="true">
    <path
      d="M13 2L23 6V13C23 19 19 23.5 13 25C7 23.5 3 19 3 13V6L13 2Z"
      stroke="#767676"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const WyzeShield = ({ className = "w-12 h-12" }: IconProps) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path
      d="M24 4L42 10V24C42 34 36 42 24 46C12 42 6 34 6 24V10L24 4Z"
      stroke="#4e2fd2"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <text
      x="24"
      y="29"
      textAnchor="middle"
      fill="#4e2fd2"
      fontSize="12"
      fontFamily="Gilroy, sans-serif"
      fontWeight="700"
    >
      Wyze
    </text>
  </svg>
);

// export const SensorIcon = ({ className = "w-6.5 h-6.5" }: IconProps) => (
//   <svg viewBox="0 0 26 26" fill="none" className={className} aria-hidden="true">
//     <rect
//       x="9"
//       y="14"
//       width="8"
//       height="8"
//       rx="2"
//       stroke="#767676"
//       strokeWidth="1.5"
//     />
//     <path
//       d="M6 12C6 8 9 5 13 5C17 5 20 8 20 12"
//       stroke="#767676"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//     />
//     <path
//       d="M3 9C3 4 7 1 13 1C19 1 23 4 23 9"
//       stroke="#767676"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//     />
//   </svg>
// );

export const ExtraProtectionIcon = ({
  className = "w-6.5 h-6.5",
}: IconProps) => (
  <svg viewBox="0 0 26 26" fill="none" className={className} aria-hidden="true">
    <circle cx="6" cy="6" r="2.2" fill="#767676" />
    <circle cx="13" cy="6" r="2.2" fill="#767676" />
    <circle cx="20" cy="6" r="2.2" fill="#767676" />
    <circle cx="6" cy="13" r="2.2" fill="#767676" />
    <circle cx="13" cy="13" r="2.2" fill="#767676" />
    <circle cx="20" cy="13" r="2.2" fill="#767676" />
    <circle cx="6" cy="20" r="2.2" fill="#767676" />
    <circle cx="13" cy="20" r="2.2" fill="#767676" />
    <circle cx="20" cy="20" r="2.2" fill="#767676" />
  </svg>
);

export const SatisfactionBadge = ({
  className = "w-19.5 h-19.5",
}: IconProps) => {
  const points: string[] = [];
  const spikes = 22;
  const outerR = 49;
  const innerR = 44;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI * i) / spikes;
    const x = 50 + r * Math.sin(angle) * 0.5;
    const y = 50 - r * Math.cos(angle) * 0.5;
    points.push(`${x},${y}`);
  }
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <polygon points={points.join(" ")} fill="#4E2FD2" />
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="#4E2FD2"
        stroke="#3a239e"
        strokeWidth="1"
      />
      <text
        x="50"
        y="42"
        textAnchor="middle"
        fill="white"
        fontSize="9"
        fontWeight={600}
      >
        Try worry-free
      </text>
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fill="white"
        fontSize="18"
        fontWeight={700}
      >
        100%
      </text>
      <text x="50" y="70" textAnchor="middle" fill="white" fontSize="7.5">
        satisfaction
      </text>
    </svg>
  );
};

export const ShippingIcon = ({ className = "w-7.25 h-7.25" }: IconProps) => (
  <svg viewBox="0 0 29 29" fill="none" className={className} aria-hidden="true">
    <path d="M2 8H18V20H2V8Z" stroke="#0AA288" strokeWidth="1.5" />
    <path
      d="M18 12H23L27 16V20H18V12Z"
      stroke="#0AA288"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="7" cy="22" r="2" stroke="#0AA288" strokeWidth="1.5" />
    <circle cx="21" cy="22" r="2" stroke="#0AA288" strokeWidth="1.5" />
  </svg>
);
