import LocalFont from "next/font/local";

const EncodeFont = LocalFont({
  src: [
    {
      path: "../../public/fonts/encode/EncodeSans-ExtraBold.ttf",
      style: "normal",
      weight: "900",
    },
    {
      path: "../../public/fonts/encode/EncodeSans-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../../public/fonts/encode/EncodeSans-ExtraBold.ttf",
      style: "normal",
      weight: "800",
    },
    {
      path: "../../public/fonts/encode/EncodeSans-ExtraLight.ttf",
      style: "normal",
      weight: "200",
    },
    {
      path: "../../public/fonts/encode/EncodeSans-Light.ttf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../../public/fonts/encode/EncodeSans-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../public/fonts/encode/EncodeSans-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/encode/EncodeSans-SemiBold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../../public/fonts/encode/EncodeSans-Thin.ttf",
      style: "normal",
      weight: "100",
    },
  ],
  variable: "--font-Encode",
  style: "normal",
  display: "block",
});
export default EncodeFont;
