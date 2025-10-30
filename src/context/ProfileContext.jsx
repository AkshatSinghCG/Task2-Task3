import { createContext, useContext, useState } from 'react'

const ProfileContext = createContext(null)

const initialProfiles = [
  {
    id: 1,
    name: 'Jane Doe',
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Front-end developer who loves clean UI and tiny animations.'
  },
  {
    id: 2,
    name: 'John Smith',
    avatar: 'https://i.pravatar.cc/150?img=68',
    bio: 'Full-stack developer passionate about React and Node.js.'
  }
]

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState(initialProfiles)
  const [activeProfileId, setActiveProfileId] = useState(1)

  const activeProfile = profiles.find(p => p.id === activeProfileId)

  function updateProfile(updates) {
    setProfiles(prevProfiles =>
      prevProfiles.map(profile =>
        profile.id === activeProfileId ? { ...profile, ...updates } : profile
      )
    )
  }

  function addProfile() {
    const getRandomAvatar = () => {
  const id = Math.floor(Math.random() * 69) + 1; // range 1–69 Create a random id between 1 and 69
  return `https://avatar.iran.liara.run/public/${id}`;
};

    const newProfile = {
      id: Math.max(...profiles.map(p => p.id)) + 1,
      name: 'New Profile',
      avatar: getRandomAvatar(),
      bio: 'Tell us about yourself'
    };
    setProfiles(prev => [...prev, newProfile])
    setActiveProfileId(newProfile.id)
  }

  function deleteProfile(id) {
    if (profiles.length <= 1) return // Prevent deleting last profile
    setProfiles(prev => prev.filter(p => p.id !== id))
    if (activeProfileId === id) {
      setActiveProfileId(profiles.find(p => p.id !== id)?.id)
    }
  }

  return (
    <ProfileContext.Provider 
      value={{ 
        profiles,
        activeProfile,
        activeProfileId,
        setActiveProfileId,
        updateProfile,
        addProfile,
        deleteProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used inside a ProfileProvider')
  return ctx
}
