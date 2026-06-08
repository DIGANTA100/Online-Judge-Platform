import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const width = 1600;
const height = 1000;
const data = Buffer.alloc((width * 4 + 1) * height);

function rgba(hex, alpha = 255) {
  const value = hex.replace("#", "");
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
    alpha
  ];
}

function setPixel(x, y, color) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const index = y * (width * 4 + 1) + 1 + x * 4;
  data[index] = color[0];
  data[index + 1] = color[1];
  data[index + 2] = color[2];
  data[index + 3] = color[3];
}

function blendPixel(x, y, color, alpha) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const index = y * (width * 4 + 1) + 1 + x * 4;
  const sourceAlpha = alpha / 255;
  data[index] = Math.round(data[index] * (1 - sourceAlpha) + color[0] * sourceAlpha);
  data[index + 1] = Math.round(data[index + 1] * (1 - sourceAlpha) + color[1] * sourceAlpha);
  data[index + 2] = Math.round(data[index + 2] * (1 - sourceAlpha) + color[2] * sourceAlpha);
  data[index + 3] = 255;
}

function fillRect(x, y, w, h, color) {
  for (let yy = y; yy < y + h; yy += 1) {
    for (let xx = x; xx < x + w; xx += 1) setPixel(xx, yy, color);
  }
}

function strokeRect(x, y, w, h, color) {
  fillRect(x, y, w, 2, color);
  fillRect(x, y + h - 2, w, 2, color);
  fillRect(x, y, 2, h, color);
  fillRect(x + w - 2, y, 2, h, color);
}

function roundedPanel(x, y, w, h, fill, border) {
  fillRect(x, y, w, h, fill);
  strokeRect(x, y, w, h, border);
}

function glow(cx, cy, radius, color, intensity) {
  const startX = Math.max(0, cx - radius);
  const endX = Math.min(width, cx + radius);
  const startY = Math.max(0, cy - radius);
  const endY = Math.min(height, cy + radius);

  for (let y = startY; y < endY; y += 1) {
    for (let x = startX; x < endX; x += 1) {
      const dx = x - cx;
      const dy = y - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < radius) {
        const alpha = Math.max(0, (1 - distance / radius) * intensity);
        blendPixel(x, y, color, alpha);
      }
    }
  }
}

for (let y = 0; y < height; y += 1) {
  data[y * (width * 4 + 1)] = 0;
  for (let x = 0; x < width; x += 1) {
    const vignette = Math.max(0, 1 - Math.hypot(x - width / 2, y - height / 2) / 980);
    setPixel(x, y, [
      Math.round(8 + vignette * 10),
      Math.round(11 + vignette * 16),
      Math.round(17 + vignette * 20),
      255
    ]);
  }
}

glow(310, 150, 420, rgba("#35dfb5"), 70);
glow(1280, 250, 360, rgba("#ffb84d"), 56);
glow(900, 870, 360, rgba("#ff7676"), 38);

for (let x = 0; x < width; x += 24) fillRect(x, 0, 1, height, [255, 255, 255, 10]);
for (let y = 0; y < height; y += 24) fillRect(0, y, width, 1, [255, 255, 255, 10]);

roundedPanel(130, 96, 1340, 808, rgba("#0b0f14"), [255, 255, 255, 32]);
fillRect(130, 96, 1340, 66, [255, 255, 255, 12]);
fillRect(168, 122, 20, 20, rgba("#ff7676"));
fillRect(202, 122, 20, 20, rgba("#ffb84d"));
fillRect(236, 122, 20, 20, rgba("#35dfb5"));

roundedPanel(168, 198, 270, 662, rgba("#10151d"), [255, 255, 255, 28]);
roundedPanel(470, 198, 580, 662, rgba("#07090d"), [255, 255, 255, 28]);
roundedPanel(1080, 198, 392, 662, rgba("#10151d"), [255, 255, 255, 28]);

const sidebarLines = [
  [205, 245, 142, "#76f7d1"],
  [205, 305, 184, "#ffffff"],
  [205, 365, 120, "#ffffff"],
  [205, 425, 166, "#ffffff"],
  [205, 485, 98, "#ffb84d"],
  [205, 545, 154, "#ffffff"],
  [205, 605, 190, "#ffffff"]
];

for (const [x, y, w, color] of sidebarLines) {
  fillRect(x, y, 18, 18, rgba(color));
  fillRect(x + 34, y + 3, w, 12, [255, 255, 255, color === "#ffffff" ? 62 : 150]);
}

const codeColors = ["#76f7d1", "#ffffff", "#ffb84d", "#ff9f9f", "#ffffff"];
for (let i = 0; i < 18; i += 1) {
  const y = 238 + i * 29;
  fillRect(500, y, 18, 10, [255, 255, 255, 38]);
  fillRect(545, y, 110 + ((i * 37) % 280), 12, rgba(codeColors[i % codeColors.length], i % 2 === 0 ? 168 : 84));
  fillRect(860, y, 70 + ((i * 19) % 126), 12, [255, 255, 255, 44]);
}

roundedPanel(1118, 238, 314, 124, rgba("#0b0f14"), [118, 247, 209, 58]);
fillRect(1146, 268, 130, 18, rgba("#76f7d1"));
fillRect(1146, 306, 224, 12, [255, 255, 255, 72]);
fillRect(1146, 330, 162, 12, [255, 255, 255, 48]);

roundedPanel(1118, 392, 314, 208, rgba("#0b0f14"), [255, 255, 255, 28]);
for (let i = 0; i < 5; i += 1) {
  fillRect(1146, 428 + i * 32, 42, 12, rgba(i < 2 ? "#35dfb5" : "#ffb84d"));
  fillRect(1210, 428 + i * 32, 160 + ((i * 31) % 70), 12, [255, 255, 255, 58]);
}

roundedPanel(1118, 632, 314, 188, rgba("#0b0f14"), [255, 255, 255, 28]);
for (let i = 0; i < 7; i += 1) {
  fillRect(1146, 674 + i * 22, 22, 10, [255, 255, 255, 54]);
  fillRect(1182, 674 + i * 22, 190 + ((i * 23) % 72), 10, rgba(i === 0 ? "#76f7d1" : "#ffffff", i === 0 ? 150 : 52));
}

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function crc32(buffer) {
  let crc = ~0;
  for (const byte of buffer) {
    crc ^= byte;
    for (let k = 0; k < 8; k += 1) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
  }
  return ~crc >>> 0;
}

function chunk(type, payload) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(payload.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, payload])));
  return Buffer.concat([length, typeBuffer, payload, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(width, 0);
ihdr.writeUInt32BE(height, 4);
ihdr[8] = 8;
ihdr[9] = 6;
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const outPath = join("public", "assets", "platform-workspace.png");
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(
  outPath,
  Buffer.concat([
    pngSignature,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(data, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ])
);

console.log(`Generated ${outPath}`);
