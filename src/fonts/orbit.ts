import LocalFont from "next/font/local";

const OrbitFont = LocalFont({
  src: [
    {
      path: "./../../public/fonts/orbit/Orbitron-Black.ttf",
      style: "normal",
      weight: "900",
    },
    {
      path: "./../../public/fonts/orbit/Orbitron-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "./../../public/fonts/orbit/Orbitron-ExtraBold.ttf",
      style: "normal",
      weight: "800",
    },
    {
      path: "./../../public/fonts/orbit/Orbitron-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "./../../public/fonts/orbit/Orbitron-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "./../../public/fonts/orbit/Orbitron-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
  ],
  variable: "--font-Orbit",
  style: "normal",
  display: "block",
});
export default OrbitFont;
