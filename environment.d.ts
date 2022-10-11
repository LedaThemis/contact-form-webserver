declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_SECURE: 'true' | 'false';
      EMAIL_SUBJECT: string;
      NAME: string;
      CONTACT_ADDRESS: string;
      EMAIL: string;
      PASSWORD: string;
      NODE_ENV: 'development' | 'production';
      PORT: string;
      FRONTEND_ADDRESS: string;
    }
  }
}

export {};
