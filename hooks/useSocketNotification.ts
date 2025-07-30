'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { io, Socket } from 'socket.io-client'

export function useSocketNotifications(userId?: string) {
  const [unreadCount, setUnreadCount] = useState(0)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (!userId) return

    // Wait for Socket.IO server to mount before connecting
    fetch('/api/socket').then(() => {
      const socketIo = io({
        path: '/api/socketio',
        query: { userId },
      })

      socketIo.on('notification', data => {
        toast(`${data.title}: ${data.message}`)
        setUnreadCount(prev => prev + 1)
      })

      setSocket(socketIo)

      // Disconnect on cleanup
      return () => {
        socketIo.disconnect()
      }
    })
  }, [userId])

  return { unreadCount, clearNotifications: () => setUnreadCount(0) }
}
