import React from 'react'
import './Home.scss'
import { SongsList } from '@/components/SongsList/SongsList'
import { PopupCard } from '@/components/PopupCard/PopupCard'
import { AlbumList } from '@/components/AlbumList/AlbumList.tsx'

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1>Welcome to Soundify</h1>
          <p>Discover, create, and manage your music collection</p>
        </div>
      </div>

      <div className="home-content">
        <SongsList />
        <AlbumList />
      </div>

      <PopupCard />
    </div>
  )
}

export default Home
