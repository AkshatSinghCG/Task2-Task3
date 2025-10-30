import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'
import ProfileForm from './ProfileForm'

export default function Profile() {
  const { activeProfile } = useProfile()
  const [editing, setEditing] = useState(false)

  if (!activeProfile) return null

  return (
    <section className="profile-card">
      <div className="profile-header">
        <img className="avatar" src={activeProfile.avatar} alt={activeProfile.name} />
        <div className="profile-info">
          <h2>{activeProfile.name}</h2>
          <p className="bio">{activeProfile.bio}</p>
        </div>
      </div>
      <div className="profile-actions">
        <button className="edit-btn" onClick={() => setEditing(e => !e)}>
          {editing ? 'Close' : 'Edit Profile'}
        </button>
      </div>

      {editing && (
        <div className="profile-form-wrap">
          <ProfileForm onClose={() => setEditing(false)} />
        </div>
      )}
    </section>
  )
}
