'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { io, Socket } from 'socket.io-client'

export function useSocketNotifications(userId?: string) {
  const [unreadCount, setUnreadCount] = useState(0)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (!userId) return

    let active = true

    const initSocket = async () => {
      try {
        await fetch('/api/socket') // Ensures server is initialized
        if (!active) return

        const socketIo = io({
          path: '/api/socketio',
          query: { userId },
        })

        socketIo.on('notification', data => {
          toast(`${data.title}: ${data.message}`)
          setUnreadCount(prev => prev + 1)
        })

        setSocket(socketIo)
      } catch (err) {
        console.error('Socket init failed', err)
      }
    }

    initSocket()

    return () => {
      active = false
      socket?.disconnect()
    }
  }, [userId])

  return { unreadCount, clearNotifications: () => setUnreadCount(0) }
}
