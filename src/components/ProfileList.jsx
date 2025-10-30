import { useProfile } from '../context/ProfileContext'

export default function ProfileList() {
  const { 
    profiles, 
    activeProfileId, 
    setActiveProfileId, 
    addProfile, 
    deleteProfile 
  } = useProfile()

  return (
    <div className="profile-list">
      <div className="profile-list-header">
        <h2>Profiles</h2>
        <button className="add-profile-btn" onClick={addProfile}>
          <i className="fas fa-plus"></i> New Profile
        </button>
      </div>
      <div className="profile-cards">
        {profiles.map(profile => (
          <div 
            key={profile.id}
            className={`profile-card-mini ${profile.id === activeProfileId ? 'active' : ''}`}
            onClick={() => setActiveProfileId(profile.id)}
          >
            <img src={profile.avatar} alt={profile.name} className="mini-avatar" />
            <div className="mini-info">
              <h3>{profile.name}</h3>
              <p>{profile.bio.substring(0, 60)}...</p>
            </div>
            {profiles.length > 1 && (
              <button 
                className="delete-profile-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteProfile(profile.id)
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}