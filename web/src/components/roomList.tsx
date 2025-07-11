import {ArrowRight} from 'lucide-react'
import {Link} from 'react-router-dom'
import {dayjs} from '@/lib/dayjs'
import {Badge} from './ui/badge'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from './ui/card'
import {useRooms} from '@/http/useRooms'

export function RoomList() {
  const {data, isLoading} = useRooms()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>Acesso rápido para salas criadas recentemente</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        {isLoading && <p className='text-muted-foreground text-sm'>Carregando salas...</p>}
        {data?.map(room => {return (
          <Link
            key={room.id}
            className='flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50'
            to={`/rooms/${room.id}`}
          >
            <div className='flex-1 flex flex-col gap-1'>
              <h3 className='font-medium'>{room.name}</h3>
              <div className='flex items-center gap-2'>
                <Badge variant='secondary' className='text-xs'>{dayjs(room.createdAt).toNow()}</Badge>
                <Badge variant='secondary' className='text-xs'>{room.questionCount} pergunta(s)</Badge>
              </div>
            </div>
            <span className='flex items-center gap-1 text-sm'><ArrowRight className='size-3'/></span>
          </Link>
        )})}
      </CardContent>
    </Card>
  )
}