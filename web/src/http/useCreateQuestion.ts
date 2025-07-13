import {useMutation, useQueryClient} from '@tanstack/react-query'
import type {CreateQuestionRequest} from './types/createQuestionRequest'
import type {CreateQuestionResponse} from './types/createQuestionResponse'
import type {GetQuestionsResponse} from './types/getQuestionsResponse'

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      const result: CreateQuestionResponse = await response.json()
      return result
    },
    onMutate({question}) {
      const questions = queryClient.getQueryData<GetQuestionsResponse>(['getQuestions', roomId])
      const questionsArray = questions ?? []
      const newQuestion = {
        id: crypto.randomUUID(),
        question,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true
      }
      queryClient.setQueryData<GetQuestionsResponse>(
        ['getQuestions', roomId],
        [newQuestion, ...questionsArray]
      )

      return {newQuestion, questions}
    },
    onSuccess(data, _variables, context) {
      queryClient.setQueryData<GetQuestionsResponse>(
        ['getQuestions', roomId],
        questions => {
          if(!questions || !context.newQuestion) return questions
          return questions.map(question => {
            if(question.id == context.newQuestion.id)
              return {...context.newQuestion, id: data.questionId, answer: data.answer, isGeneratingAnswer: false}
            return question
          })
        }
      )
    },
    onError(_data, _variables, context) {
      if(context?.questions) queryClient.setQueryData<GetQuestionsResponse>(
        ['getQuestions', roomId],
        context.questions
      )
    }
    //onSuccess: () => {queryClient.invalidateQueries({queryKey: ['getQuestions']})}
  })
}