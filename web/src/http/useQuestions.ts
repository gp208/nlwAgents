import {useQuery} from '@tanstack/react-query'
import type {GetQuestionsResponse} from './types/getQuestionsResponse'

export function useQuestions(roomId: string) {
  return useQuery({
    queryKey: ['getQuestions', roomId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`)
      const result: GetQuestionsResponse = await response.json()
      return result
    }
  })
}