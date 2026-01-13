export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          status: string
          last_seen: string
          created_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          status?: string
          last_seen?: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          status?: string
          last_seen?: string
          created_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          name: string | null
          is_group: boolean
          avatar_url: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          is_group?: boolean
          avatar_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          is_group?: boolean
          avatar_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conversation_members: {
        Row: {
          conversation_id: string
          user_id: string
          role: string
          joined_at: string
          last_read_at: string
        }
        Insert: {
          conversation_id: string
          user_id: string
          role?: string
          joined_at?: string
          last_read_at?: string
        }
        Update: {
          conversation_id?: string
          user_id?: string
          role?: string
          joined_at?: string
          last_read_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string | null
          content: string | null
          type: string
          file_url: string | null
          file_name: string | null
          file_size: number | null
          is_edited: boolean
          is_deleted: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id?: string | null
          content?: string | null
          type?: string
          file_url?: string | null
          file_name?: string | null
          file_size?: number | null
          is_edited?: boolean
          is_deleted?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string | null
          content?: string | null
          type?: string
          file_url?: string | null
          file_name?: string | null
          file_size?: number | null
          is_edited?: boolean
          is_deleted?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      push_subscriptions: {
        Row: {
          id: string
          user_id: string
          endpoint: string
          p256dh: string
          auth: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          endpoint: string
          p256dh: string
          auth: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          endpoint?: string
          p256dh?: string
          auth?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
