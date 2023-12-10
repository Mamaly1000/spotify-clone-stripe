export const gradientGenerator = (): string => {
  let color_1 = `rgba(${Math.floor(Math.random() * 255)} ${Math.floor(
    Math.random() * 255
  )} ${Math.floor(Math.random() * 255)}/ 1)`;
  let color_2 = `rgba(${Math.floor(Math.random() * 255)} ${Math.floor(
    Math.random() * 255
  )} ${Math.floor(Math.random() * 255)}/ 1)`;
  let color_3 = `rgba(${Math.floor(Math.random() * 255)} ${Math.floor(
    Math.random() * 255
  )} ${Math.floor(Math.random() * 255)}/ 1)`;
  const directions = [
    "to top",
    "to top left",
    "to top right",
    "to right",
    "to left",
    "to bottom",
    "to bottom right",
    "to bottom left",
  ];
  return `linear-gradient(${
    directions[Math.floor(Math.random() * directions.length - 1)]
  },${color_1} 10%,${color_2} 50%,${color_3} 100%)`;
};
