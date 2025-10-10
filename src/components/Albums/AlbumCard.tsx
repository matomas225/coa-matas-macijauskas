import './AlbumCard.scss'
import { Button } from '../elements/Button'

export const AlbumCard = ({ album, onClick }: any) => {
  return (
    <div className="album-card" onClick={onClick}>
      <img
        src={
          album.coverImagePath
            ? `${album.coverImagePath}`
            : '/src/assets/placeholder-album.png'
        }
        alt={album.title}
        className="album-cover"
      />
      <h2>{album.title}</h2>
      <p>{album.artist}</p>
      <Button type="button">Manage Album Songs</Button>
    </div>
  )
}
