import dotenv from 'dotenv';

dotenv.config();

export const transporterConfig = {
  host: process.env['SMTP_HOST'],
  port: parseInt(process.env['SMTP_PORT']),
  secure: Boolean(process.env['SMTP_SECURE']),
  auth: {
    user: process.env['EMAIL'],
    pass: process.env['PASSWORD'],
  },
};

/**
 * Construct message to use in sendMail
 * @note This depends on environment variables: `NAME`, `EMAIL`, `CONTACT_ADDRESS`, `EMAIL_SUBJECT`
 * @param senderEmail Email of sender
 * @param senderName Name of sender
 * @param messageContent Content of message
 * @returns message
 * 
 */
export const constructMessage = (senderEmail: string, senderName: string, messageContent: string) => ({
  from: `${process.env['NAME']} <${process.env['EMAIL']}>`,
  to: process.env['CONTACT_ADDRESS'],
  subject: `${process.env['EMAIL_SUBJECT']} | ${senderName} <${senderEmail}>`,
  text: messageContent,
});
