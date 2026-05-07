
export type OnlineStatus = 'online' | 'offline' | 'away';

export interface EmailAddress {
  id: string;
  contactId: string;
  email: string;
  isPrimary: boolean;
  label: string; 
}

export interface PhoneNumber {
  number: string;
  isPrimary: boolean;
  label: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  jobTitle: string;
  company?: string;
  avatarUrl?: string;
  status: OnlineStatus;
  bio?: string;
  address?: string;
  phones: PhoneNumber[];
  emails: EmailAddress[];
  socialLinks: SocialLinks;
  meetingLink?: string;
  
  dialIn?: string;
  createdAt: string;
}


export interface ContactSummary {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  jobTitle: string;
  avatarUrl?: string;
  status: OnlineStatus;
  primaryEmail?: string;
}
