import sharp from 'sharp';

async function createPerfectScreen() {
  const screenWidth = 828;
  const screenHeight = 519;

  // Extract Techashi artwork from hero-laptop.png
  const rawArtwork = await sharp('public/assets/hero-laptop.png')
    .extract({ left: 73, top: 22, width: 586, height: 368 })
    .resize(screenWidth, screenHeight, { fit: 'fill' })
    .toBuffer();

  // Create rounded mask for Apple screen (top corners rounded rx=8 ry=8)
  const maskSvg = Buffer.from(
    `<svg width="${screenWidth}" height="${screenHeight}">
      <rect x="0" y="0" width="${screenWidth}" height="${screenHeight}" rx="8" ry="8" fill="#fff" />
      <rect x="0" y="50" width="${screenWidth}" height="${screenHeight - 50}" fill="#fff" />
    </svg>`
  );

  const maskedScreen = await sharp(rawArtwork)
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Composite onto apple-hero.jpg
  const composited = await sharp('public/assets/apple-hero.jpg')
    .composite([
      { input: maskedScreen, left: 672, top: 473 }
    ])
    .toBuffer();

  // Remove background cleanly
  const { data, info } = await sharp(composited).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const totalPixels = width * height;
  const rgba = Buffer.alloc(totalPixels * 4);
  const visited = new Uint8Array(totalPixels);
  const queue = new Int32Array(totalPixels);
  let qHead = 0, qTail = 0;

  function isBgPixel(r, g, b) {
    const minVal = Math.min(r, g, b);
    const maxVal = Math.max(r, g, b);
    const diff = maxVal - minVal;
    return minVal >= 238 && diff <= 10;
  }

  function pushQueue(x, y) {
    const idx = y * width + x;
    if (visited[idx]) return;
    const pIdx = idx * 3;
    const r = data[pIdx], g = data[pIdx+1], b = data[pIdx+2];
    if (isBgPixel(r, g, b)) {
      visited[idx] = 1;
      queue[qTail++] = idx;
    }
  }

  for (let x = 0; x < width; x++) {
    pushQueue(x, 0);
    if (x < 760 || x > 1180) {
      pushQueue(x, height - 1);
    }
  }
  for (let y = 0; y < height; y++) {
    pushQueue(0, y);
    pushQueue(width - 1, y);
  }

  while (qHead < qTail) {
    const idx = queue[qHead++];
    const x = idx % width;
    const y = Math.floor(idx / width);

    const neighbors = [
      x > 0 ? idx - 1 : -1,
      x < width - 1 ? idx + 1 : -1,
      y > 0 ? idx - width : -1,
      y < height - 1 ? idx + width : -1
    ];

    for (let n of neighbors) {
      if (n !== -1 && !visited[n]) {
        const pIdx = n * 3;
        const r = data[pIdx], g = data[pIdx+1], b = data[pIdx+2];
        if (isBgPixel(r, g, b)) {
          visited[n] = 1;
          queue[qTail++] = n;
        }
      }
    }
  }

  for (let i = 0; i < totalPixels; i++) {
    const srcIdx = i * 3;
    const dstIdx = i * 4;
    rgba[dstIdx] = data[srcIdx];
    rgba[dstIdx+1] = data[srcIdx+1];
    rgba[dstIdx+2] = data[srcIdx+2];

    if (visited[i]) {
      rgba[dstIdx+3] = 0;
    } else {
      const x = i % width;
      const y = Math.floor(i / width);
      let isEdge = false;
      if (x > 0 && visited[i - 1]) isEdge = true;
      else if (x < width - 1 && visited[i + 1]) isEdge = true;
      else if (y > 0 && visited[i - width]) isEdge = true;
      else if (y < height - 1 && visited[i + width]) isEdge = true;

      if (isEdge) {
        const minVal = Math.min(data[srcIdx], data[srcIdx+1], data[srcIdx+2]);
        if (minVal > 220) {
          const factor = Math.max(0, Math.min(1, (246 - minVal) / 26));
          rgba[dstIdx+3] = Math.round(factor * 255);
        } else {
          rgba[dstIdx+3] = 255;
        }
      } else {
        rgba[dstIdx+3] = 255;
      }
    }
  }

  // Trim transparent borders
  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .trim()
    .png()
    .toFile('public/assets/techashi-apple-hero-perfect.png');

  console.log('Finished creating public/assets/techashi-apple-hero-perfect.png');
}

createPerfectScreen().catch(console.error);
