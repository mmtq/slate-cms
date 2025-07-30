// pages/api/push-notify.ts
export default function handler(req: any, res: any) {
  const { userId, title, message } = req.body
  const io = res.socket.server.io
  const userSockets = res.socket.server.userSockets

  const socketId = userSockets?.get(userId)
  if (io && socketId) {
    io.to(socketId).emit('notification', { title, message })
  }

  res.status(200).json({ success: true })
}
