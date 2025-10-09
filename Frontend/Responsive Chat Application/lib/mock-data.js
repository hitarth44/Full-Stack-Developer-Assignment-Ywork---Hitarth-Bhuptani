export const mockProfiles = [
  { id: '1', username: 'Aditya', avatar_color: '#3b82f6', status: 'online', initials: 'A' },
  { id: '2', username: 'Preet', avatar_color: '#10b981', status: 'offline', initials: 'P' },
  { id: '3', username: 'Dhruvi', avatar_color: '#8b5cf6', status: 'offline', initials: 'D' },
  { id: '4', username: 'Yash', avatar_color: '#f97316', status: 'offline', initials: 'Y' },
  { id: '5', username: 'Denish', avatar_color: '#ec4899', status: 'offline', initials: 'D' },
  { id: '6', username: 'Aparna', avatar_color: '#6366f1', status: 'offline', initials: 'Ap' },
]

export const mockConversations = [
  { id: '1', participant: mockProfiles[0], last_message: "I've sent you the latest project fi...", last_message_time: '12:45 PM', unread: true },
  { id: '2', participant: mockProfiles[1], last_message: 'Are we still meeting for coffee to...', last_message_time: 'Yesterday', unread: false },
  { id: '3', participant: mockProfiles[2], last_message: 'The design team loved your pre...', last_message_time: 'Yesterday', unread: false },
  { id: '4', participant: mockProfiles[3], last_message: 'Can you review the budget prop...', last_message_time: 'Tuesday', unread: false },
  { id: '5', participant: mockProfiles[4], last_message: 'Thanks for your help with the cli...', last_message_time: 'Monday', unread: false },
  { id: '6', participant: mockProfiles[5], last_message: "Let's schedule a call to discuss t...", last_message_time: 'May 29', unread: false },
]

export const mockMessages = {
  '1': [
    { id: '1', conversation_id: '1', sender_id: '1', content: "Hey! Just wanted to let you know that I've finished working on the new feature. I think you'll really like how it turned out. Let me know when you get a chance to review it!", created_at: new Date('2024-01-15T12:00:00'), is_own: false, status: 'received' },
    { id: '2', conversation_id: '1', sender_id: '1', content: "Oh, I almost forgot - do you have the latest version of the client presentation? I want to make sure we're all on the same page for tomorrow.", created_at: new Date('2024-01-15T12:05:00'), is_own: false, status: 'received' },
    { id: '3', conversation_id: '1', sender_id: 'current', content: "I've just sent it to your email. It includes all the updates we discussed in the last meeting. Let me know if you need anything else!", created_at: new Date('2024-01-15T12:15:00'), is_own: true, status: 'sent' },
    { id: '4', conversation_id: '1', sender_id: '1', content: "Got it, thanks! I'll review it before our lunch. See you soon!", created_at: new Date('2024-01-15T12:30:00'), is_own: false, status: 'received' },
  ],
}

export const botReplies = [
  "That's a great point! Let me think about that.",
  'I completely agree with you on this.',
  'Interesting! Can you tell me more about that?',
  "Thanks for sharing! I'll get back to you shortly.",
  "Sounds good! Let's discuss this further.",
  "I appreciate your input on this matter.",
  "That makes sense. I'll look into it right away.",
  "Perfect! I'll update you as soon as possible.",
  "Got it! I'll take care of that for you.",
  "Absolutely! Let's make it happen.",
]


