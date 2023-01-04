import {useEffect, useState} from "react";

export const Eye = ({x, y, pX, pY, size, diffX = 0, diffY = 0}) => {
  const [eye, setEye] = useState({x: null, y: null});

  const updateEyes = () => {
    const center = {x: pX + diffX + size / 4, y: pY + diffY + size / 4};
    const angle = Math.atan2((y ?? window.innerHeight / 2) - center.y, (x ?? 0) - center.x);
    const radius = size / 2 - 10;
    const eyeX = Math.cos(angle) * radius;
    const eyeY = Math.sin(angle) * radius;
    setEye(() => ({x: eyeX + size/2, y: eyeY + size/2}));
  };

  useEffect(updateEyes, [x, y]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: `${pY}px`,
        left: `${pX}px`,
        zIndex: 1000,
      }}
    >
      <circle cx={size / 2} cy={size / 2} r={size/2} fill="black" />
      <circle cx={size / 2} cy={size / 2} r={size/2 - 3} fill="white" />
      <circle cx={eye.x} cy={eye.y} r="10" fill="black" />
    </svg>
  );
}