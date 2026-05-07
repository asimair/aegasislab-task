
export interface ContactApiDto {
  id: string;
  first_name: string;
  last_name: string;
  job_title: string;
  company?: string;
  avatar?: string;
  status?: string;
  bio?: string;
  address?: string;
  phone?: string;
  phone_secondary?: string;
  social_facebook?: string;
  social_twitter?: string;
  social_linkedin?: string;
  social_instagram?: string;
  meeting_link?: string;
  dial_in?: string;
  created_at?: string;
}

export interface EmailAddressApiDto {
  id: string;
  contact_id: string;
  email: string;
  is_primary: boolean;
  label: string;
}
