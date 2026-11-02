export const fallbackImage = ({ emoji = "🍽️", hue = 170 }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${hue},65%,88%)"/>
      <stop offset="1" stop-color="hsl(${(hue + 30) % 360},60%,72%)"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#g)"/>
  <circle cx="300" cy="300" r="190" fill="rgba(255,255,255,0.55)"/>
  <text x="300" y="365" font-size="200" text-anchor="middle">${emoji}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const unsplash = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&h=700&q=80`;

export { unsplash };
