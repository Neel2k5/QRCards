import qrcode from "qrcode";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Missing Text" });

  try {
    const qrB64String = await qrcode.toDataURL(text);
    
    res.status(200).json({ data: qrB64String });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
}
