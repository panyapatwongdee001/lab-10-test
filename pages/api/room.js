import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();
  const roomsList = [];
  rooms.map((x) => {
    roomsList.push({ roomId: x.roomId, roomName: x.roomName });
  });
  res.json({ ok: true, rooms: roomsList });
}
