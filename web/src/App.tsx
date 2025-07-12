import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CreateRoom } from './pages/createRoom'
import { RecordAudio } from './pages/recordAudio'
import { Room } from './pages/room'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<CreateRoom/>} index />
          <Route element={<Room/>} path='/room/:roomId' />
          <Route element={<RecordAudio/>} path='/room/:roomId/audio' />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}