// pages/api/socket.ts
import { Server } from 'socket.io'
import type { NextApiRequest } from 'next'
import type { NextApiResponse } from 'next'
import type { Server as NetServer } from 'http'
import type { Socket as NetSocket } from 'net'

type NextApiResponseWithSocket = NextApiResponse & {
  socket: NetSocket & {
    server: NetServer & {
      io?: Server
      userSockets?: Map<string, string>
    }
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  // Initialize only once
  if (!res.socket?.server?.io) {
    console.log('🧠 Initializing Socket.IO server...')

    const io = new Server(res.socket.server, {
      path: '/api/socketio',
      cors: {
        origin: '*',
      },
    })

    const userSockets = new Map<string, string>()

    io.on('connection', socket => {
      const userId = socket.handshake.query.userId as string
      console.log('✅ User connected', userId)

      if (userId) {
        userSockets.set(userId, socket.id)
      }

      socket.on('disconnect', () => {
        console.log('❌ User disconnected', userId)
        if (userId) {
          userSockets.delete(userId)
        }
      })
    })

    // ⛳️ SAFELY assign to server
    res.socket.server.io = io
    res.socket.server.userSockets = userSockets
  }

  res.end()
}

export const config = {
  api: {
    bodyParser: false,
  },
}
