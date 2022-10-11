import { Server } from 'hyper-express';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import { constructMessage, failedRedirectURL, successRedirectURL, transporterConfig } from './utils';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import { contactFormSchema } from './schemas';
import cors from 'cors';

dotenv.config();

const webserver = new Server();

webserver.use(
  cors({
    origin: process.env['FRONTEND_ADDRESS'],
  })
);

const transporter = createTransport(transporterConfig);

transporter.verify(function (error, success) {
  if (error) {
    console.log('Failed to initiate transporter:');
    console.log(error);
    process.exit(1);
  } else {
    console.log('SMTP server connected.');
  }
});

webserver.get('/', (request, response) => {
  response.send('OK');
});

webserver.post('/contact', async (request, response) => {
  const body: z.infer<typeof contactFormSchema> = await request.urlencoded();

  const data = contactFormSchema.safeParse(body);

  if (!data.success) {
    const error = fromZodError(data.error);

    return response.redirect(failedRedirectURL(error.message));
  }

  const message = constructMessage(body.email, body.name, body.content);

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(`Error occurred! ${error.message}`);
      return response.redirect(
        failedRedirectURL('Internal Error: An error occurred while sending email, please try again.')
      );
    }

    return response.redirect(successRedirectURL());
  });
});

const port = parseInt(process.env['PORT']);

// Activate webserver by calling .listen(port, callback);
webserver
  .listen(port)
  .then((socket) => console.log(`Webserver started on port ${port}`))
  .catch((error) => console.log(`Failed to start webserver on port ${port}`));

process.on('SIGINT', () => {
  console.log('Exiting...');

  transporter.close();

  process.exit();
});
