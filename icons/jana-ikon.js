// Jana ikon PNG Portal ICC (tanpa pakej luar). Jalankan: node icons/jana-ikon.js
const fs = require('fs'), zlib = require('zlib'), path = require('path');

const NAVY = [20, 33, 61], AMBER = [252, 163, 17];

// Rekaan: nod tengah + 3 nod satelit bersambung (simbol "hub"), dalam zon selamat maskable (80%)
function bentuk(x, y) {           // x,y dalam 0..1 → 1 jika dalam glif
  const c = [0.5, 0.52], nod = [], R = 0.24;
  [-90, 30, 150].forEach(d => { const a = d * Math.PI / 180; nod.push([c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)]); });
  const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  const keGaris = (p, a, b) => {
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * (b[0] - a[0]) + (p[1] - a[1]) * (b[1] - a[1])) / (dist(a, b) ** 2)));
    return dist(p, [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
  };
  const p = [x, y];
  if (dist(p, c) < 0.105) return 1;
  for (const n of nod) {
    if (dist(p, n) < 0.07) return 1;
    if (keGaris(p, c, n) < 0.022) return 1;
  }
  return 0;
}

function png(size, file) {
  const SS = 4, raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      let n = 0;
      for (let sy = 0; sy < SS; sy++) for (let sx = 0; sx < SS; sx++)
        n += bentuk((x + (sx + 0.5) / SS) / size, (y + (sy + 0.5) / SS) / size);
      const a = n / (SS * SS), o = y * (size * 4 + 1) + 1 + x * 4;
      for (let k = 0; k < 3; k++) raw[o + k] = Math.round(NAVY[k] * (1 - a) + AMBER[k] * a);
      raw[o + 3] = 255;
    }
  }
  const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = b => { let c = 0xffffffff; for (const v of b) c = crcT[(c ^ v) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  fs.writeFileSync(path.join(__dirname, file), Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))
  ]));
  console.log('✓', file);
}

png(192, 'icon-192.png');
png(512, 'icon-512.png');
png(180, 'apple-touch-icon.png');
png(32, 'favicon-32.png');
