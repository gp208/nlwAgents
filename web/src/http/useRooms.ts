import {useQuery} from '@tanstack/react-query'
import type {GetRoomsResponse} from './types/getRoomsResponse'

export function useRooms() {
  return useQuery({
    queryKey: ['getRooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result: GetRoomsResponse = await response.json()
      return result
    }
  })
}