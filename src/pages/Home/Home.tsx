import React from 'react'
import './Home.scss'
import { SongsList } from '@/components/SongsList/SongsList'
import { PopupCard } from '@/components/PopupCard/PopupCard'
import { AlbumList } from '@/components/AlbumList/AlbumList.tsx'

const Home: React.FC = () => {
  return (
    <>
      <SongsList />
      <AlbumList />
      <PopupCard />
    </>
  )
}

export default Home
