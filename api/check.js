// api/check.js
export default function handler(req, res) {
  // Allow CORS (so game/mod can call it)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get query params
  const { key, hwid, fov } = req.query;

  // OPTIONAL: Validate key
  // For testing, accept any key. Later, check against database.
  // if (!key) {
  //   return res.status(403).json({ status: "error", message: "no key" });
  // }

  // Return full config in ONE response
  res.status(200).json({
    status: "ok",
    version: "1.0.0",
    server_time: new Date().toISOString(),

    // License info
    license: {
      user: key || "test_user",
      hwid: hwid || "test_device",
      expires: "2026-12-31",
      plan: "premium"
    },

    // ESP settings
    esp: true,
    esp_settings: {
      fov: parseInt(fov) || 96,
      box_color: "#FF0000",
      line_color: "#00FF00",
      show_name: true,
      show_health: true,
      show_distance: true,
      max_distance: 300,
      bone: "head"
    },

    // Aimbot settings
    aimbot: false,
    aimbot_settings: {
      smooth: 5,
      fov: 30,
      bone: "head"
    },

    // Misc
    misc: {
      no_recoil: true,
      speed_hack: false,
      radar: true
    }
  });
}
