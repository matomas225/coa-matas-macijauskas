import React from 'react'
import { ProfileMenu } from '@/components/ProfileMenu/ProfileMenu'
import { SongUploadCard } from '@/components/SongUploadCard/SongUploadCard'
import { ManageSongsCard } from '@/components/ManageSongsCard/ManageSongsCard'
import { AlbumModal } from '@/components/Albums/AlbumModal'
import { AlbumCreateCard } from '@/components/Albums/AlbumCreateCard'
import './Profile.scss'

export const Profile: React.FC = () => {
  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1>Your Profile</h1>
          <p>Manage your music, albums, and settings</p>
        </div>
      </div>

      <div className="profile-content">
        <ProfileMenu />
      </div>

      <SongUploadCard />
      <ManageSongsCard />
      <AlbumModal />
      <AlbumCreateCard />
    </div>
  )
}
