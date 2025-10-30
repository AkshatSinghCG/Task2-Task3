import { useState } from 'react'
import { useProfile } from '../context/ProfileContext'

export default function ProfileForm({ onClose }) {
  const { activeProfile, updateProfile } = useProfile()
  const [form, setForm] = useState({ 
    name: activeProfile.name, 
    avatar: activeProfile.avatar, 
    bio: activeProfile.bio 
  })
  const [saving, setSaving] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    // small delay to emulate async save (could be API call)
    await new Promise(r => setTimeout(r, 300))
    updateProfile(form)
    setSaving(false)
    if (onClose) onClose()
  }

  return (
    <form className="profile-form" onSubmit={handleSave}>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} />
      </label>

      <label>
        Avatar URL
        <input name="avatar" value={form.avatar} onChange={handleChange} />
      </label>

      <label>
        Bio
        <textarea name="bio" value={form.bio} onChange={handleChange} />
      </label>

      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onClose} disabled={saving}>
          Cancel
        </button>
        <button type="submit" className="save-btn" disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
