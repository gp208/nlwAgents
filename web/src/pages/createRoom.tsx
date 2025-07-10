import {Link} from 'react-router-dom'

export function CreateRoom() {
  return (
    <div>
      <div>Create room</div>
      <Link className='underline' to='/room'>Acessar sala</Link>
    </div>
  )
}