import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  const rooms = readDB();
  const idxRoom = rooms.findIndex((x) => x.roomId === roomId);

  if (idxRoom === -1) {
    res.status(404).json({ ok: false, message: "Invalid room id" });
  } else {
    const idxMess = rooms[idxRoom].messages.findIndex(
      (x) => x.messageId === messageId
    );
    if (idxMess === -1) {
      res.status(404).json({ ok: false, message: "Invalid Message id" });
    } else {
      rooms[idxRoom].messages.splice(idxMess, 1);
      res.json({ ok: true });
    }
  }
}
