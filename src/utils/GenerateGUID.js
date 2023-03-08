export default function GenerateGUID() {
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);

  const guid = [];
  for (let i = 0; i < bytes.length; i++) {
    let hex = bytes[i].toString(16);
    if (hex.length === 1) {
      hex = "0" + hex;
    }
    guid.push(hex);
    if (i === 3 || i === 5 || i === 7 || i === 9) {
      guid.push("-");
    }
  }
  return guid.join("");
}
