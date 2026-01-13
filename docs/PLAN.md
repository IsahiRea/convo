# Convo - Real-Time Chat Application

## Product Requirements Document (PRD)

### Overview
**Product Name:** Convo
**Description:** A real-time web chat application for friends with messaging, group chats, media sharing, video/audio calls, and push notifications.
**Target Users:** Private friend groups
**Platform:** Web (mobile-first responsive design)

### Core Features

#### 1. Authentication
- Email/password sign up and login
- OAuth providers (Google, GitHub)
- Password reset functionality
- User profile management (avatar, display name, status)

#### 2. Real-Time Messaging
- Instant message delivery
- Message status indicators (sent, delivered, read)
- Typing indicators
- Message timestamps
- Emoji support
- Message editing and deletion

#### 3. Group Chats
- Create/delete group conversations
- Add/remove members
- Group name and avatar customization
- Admin roles and permissions
- Member list view

#### 4. Media Sharing
- Image uploads with preview
- File attachments (documents, etc.)
- Voice messages
- Image gallery view in chats
- File size limits and type validation

#### 5. Video/Audio Calls
- 1-on-1 video calls
- 1-on-1 audio calls
- Group video/audio calls
- Screen sharing
- Mute/unmute controls
- Camera on/off toggle

#### 6. Push Notifications
- New message notifications
- Call notifications
- Group activity notifications
- Notification preferences/settings

### Non-Functional Requirements
- Real-time updates < 100ms latency
- Support for 50+ concurrent users
- Mobile-first responsive design
- Offline message queue
- End-to-end message history

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | Next.js 14 (App Router) | React framework with SSR |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first CSS |
| UI Components | shadcn/ui + Custom Design | Accessible components with unique styling |
| UI Design | frontend-design skill | Distinctive, production-grade interfaces |
| Backend/DB | Supabase | Auth, PostgreSQL, Realtime, Storage |
| Video Calls | LiveKit | WebRTC-based video/audio |
| Push Notifications | Web Push API | Browser notifications |
| Deployment | Vercel | Hosting & serverless functions |

### Design Approach
- Use the **frontend-design skill** for all major UI components to create distinctive, polished interfaces
- Avoid generic AI aesthetics - aim for unique visual identity
- Mobile-first responsive design
- Custom color palette and typography
- Smooth animations and micro-interactions

---

## Project Structure

```
convo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth routes (login, signup)
│   │   ├── (main)/             # Main app routes
│   │   │   ├── chat/[id]/      # Individual/group chat
│   │   │   ├── calls/          # Call interface
│   │   │   └── settings/       # User settings
│   │   ├── api/                # API routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── chat/               # Chat-specific components
│   │   ├── call/               # Call-specific components
│   │   └── layout/             # Layout components
│   ├── lib/
│   │   ├── supabase/           # Supabase client & helpers
│   │   ├── livekit/            # LiveKit client & helpers
│   │   └── utils.ts            # Utility functions
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript types
│   └── styles/
│       └── globals.css
├── public/
│   └── sw.js                   # Service worker for push
├── supabase/
│   └── migrations/             # Database migrations
├── .env.local                  # Environment variables
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Database Schema (Supabase PostgreSQL)

```sql
-- Users (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  status TEXT DEFAULT 'offline',
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations (1-on-1 and groups)
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,                          -- NULL for 1-on-1
  is_group BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversation members
CREATE TABLE conversation_members (
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',         -- 'admin' or 'member'
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (conversation_id, user_id)
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  content TEXT,
  type TEXT DEFAULT 'text',           -- 'text', 'image', 'file', 'voice'
  file_url TEXT,
  file_name TEXT,
  file_size INTEGER,
  is_edited BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Push subscriptions
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Implementation Plan

### Phase 1: Project Setup & Environment ✅
- [x] Initialize Next.js project with TypeScript
- [x] Configure Tailwind CSS
- [x] Install and configure shadcn/ui
- [x] Create Supabase project
- [x] Set up environment variables
- [x] Configure project structure
- [x] Set up ESLint and Prettier
- [x] Create feature branch for development

### Phase 2: Authentication (using frontend-design skill)
- [ ] Configure Supabase Auth
- [ ] Create login page - distinctive auth UI
- [ ] Create signup page - matching design system
- [ ] Implement OAuth providers (Google, GitHub)
- [ ] Create password reset flow
- [ ] Build auth middleware/guards
- [ ] Create user profile setup flow

### Phase 3: Database & Core Infrastructure
- [ ] Run database migrations in Supabase
- [ ] Set up Row Level Security (RLS) policies
- [ ] Create Supabase client utilities
- [ ] Build database helper functions
- [ ] Set up real-time subscriptions

### Phase 4: Chat Interface (using frontend-design skill)
- [ ] Build main layout (sidebar + chat area) - distinctive design
- [ ] Create conversation list component - custom styling
- [ ] Build message list component - unique message bubbles
- [ ] Create message input component - polished input area
- [ ] Implement real-time message updates
- [ ] Add typing indicators with animations
- [ ] Build message status indicators

### Phase 5: Group Chats
- [ ] Create new group modal
- [ ] Build group settings page
- [ ] Implement add/remove members
- [ ] Add admin role management
- [ ] Create group info sidebar

### Phase 6: Media Sharing
- [ ] Configure Supabase Storage buckets
- [ ] Build image upload component
- [ ] Create file attachment component
- [ ] Implement voice message recording
- [ ] Add media preview/gallery

### Phase 7: Video/Audio Calls (using frontend-design skill)
- [ ] Set up LiveKit account and project
- [ ] Create LiveKit token server endpoint
- [ ] Build call UI components - polished call interface
- [ ] Implement 1-on-1 calls
- [ ] Add group call support
- [ ] Implement screen sharing

### Phase 8: Push Notifications
- [ ] Create service worker
- [ ] Implement Web Push subscription
- [ ] Build notification permission flow
- [ ] Create Supabase Edge Function for sending
- [ ] Add notification preferences

### Phase 9: Polish & Deployment
- [ ] Responsive design refinements
- [ ] Error handling and loading states
- [ ] Performance optimization
- [ ] Set up Vercel deployment
- [ ] Configure production environment
- [ ] Testing and bug fixes

---

## Environment Setup

### Required Accounts
1. **Supabase** - https://supabase.com
2. **LiveKit** - https://livekit.io
3. **Vercel** - https://vercel.com (for deployment)

### Environment Variables (.env.local)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# LiveKit
NEXT_PUBLIC_LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_api_key
LIVEKIT_API_SECRET=your_api_secret

# Web Push (generate with web-push library)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
```

---

## Verification & Testing

### Manual Testing Checklist
- [ ] Sign up with email and OAuth
- [ ] Create 1-on-1 conversation
- [ ] Send and receive real-time messages
- [ ] Create group chat and add members
- [ ] Upload and view images/files
- [ ] Start and complete video call
- [ ] Receive push notification
- [ ] Test on mobile viewport

### Commands
```bash
# Development
npm run dev

# Type checking
npm run build

# Linting
npm run lint
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/lib/supabase/client.ts` | Supabase browser client |
| `src/lib/supabase/server.ts` | Supabase server client |
| `src/lib/supabase/middleware.ts` | Auth middleware |
| `src/middleware.ts` | Next.js middleware for route protection |
| `src/types/database.ts` | TypeScript database types |
| `src/app/layout.tsx` | Root layout with providers |
| `src/app/(auth)/login/page.tsx` | Login page |
| `src/app/(main)/layout.tsx` | Main app layout |
| `src/components/chat/MessageList.tsx` | Message display |
| `src/components/chat/MessageInput.tsx` | Message composer |
| `src/components/call/VideoRoom.tsx` | Call interface |
