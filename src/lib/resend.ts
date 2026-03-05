import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const getRecipientEmails = (): string[] => {
  const emails = process.env.RECIPIENT_EMAILS || '';
  return emails.split(',').map(email => email.trim()).filter(Boolean);
};
