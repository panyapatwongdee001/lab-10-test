import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const idx = rooms.findIndex((x) => x.roomId === roomId);

    if (idx === -1) {
      res.status(404).json({ ok: false, message: "Invalid room id" });
    } else {
      res.json({ ok: true, messages: rooms[idx].messages });
    }
  } else if (req.method === "POST") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const idx = rooms.findIndex((x) => x.roomId === roomId);

    if (idx === -1) {
      res.status(404).json({ ok: false, message: "Invalid roon id" });
    } else {
      if (typeof req.body.text === "string") {
        const message = { messageId: uuidv4(), text: req.body.text };
        rooms[idx].messages.push(message);
        res.json({ ok: true, message });
      } else {
        res.status(400).json({ ok: false, message: "Invalid text input" });
      }
    }
  }
}
