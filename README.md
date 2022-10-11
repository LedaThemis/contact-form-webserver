# Contact Form Backend

A webserver built using [hyper-express](https://github.com/kartikk221/hyper-express) and [nodemailer](https://github.com/nodemailer/nodemailer) to receive contact form requests and email it to destination.

## Technologies Used

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)


## Table of Contents
- [Contact Form Backend](#contact-form-backend)
  - [Technologies Used](#technologies-used)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
  - [Example Config](#example-config)
  - [Request Structure](#request-structure)
  - [Message Structure](#message-structure)
    - [Where each variable come from](#where-each-variable-come-from)
  - [Related Repositories](#related-repositories)
  - [Contributing](#contributing)
  - [License](#license)

## Usage

- Define all variables in `.env`
- Build with `pn build`
- Start the server with `pn start`
- Try sending requests to the `/contact` endpoint

## Example Config

```env
SMTP_HOST=smtppro.zoho.eu
SMTP_PORT=465
SMTP_SECURE=true
EMAIL_SUBJECT=Form
NAME=John
EMAIL=john@example.com
PASSWORD=password
CONTACT_ADDRESS=john+contact@example.com
PORT=5555
FRONTEND_ADDRESS=http://localhost:3000
```

Note: This is the [SMTP config if you're using Zoho Mail with a custom domain](https://www.zoho.com/mail/help/zoho-smtp.html).

## Request Structure

```ts
{
  name: string;
  email: string;
  content: string;
}
```

## Message Structure

From: `NAME` <`EMAIL`>

To: `CONTACT_ADDRESS`

Subject: `EMAIL_SUBJECT` | `SENDER_NAME` <`SENDER_EMAIL`>

Text: `MESSAGE_CONTENT`

### Where each variable come from

- NAME: env
- EMAIL: env
- CONTACT_ADDRESS: env
- EMAIL_SUBJECT: env
- SENDER_NAME: body in POST request as "name"
- SENDER_EMAIL: body in POST request as "email"
- MESSAGE_CONTENT: body in POST request as "content"

## Related Repositories

- [Portfolio](https://github.com/LedaThemis/portfolio)
- [Strapi](https://github.com/LedaThemis/portfolio-strapi)

## Contributing

If you see an issue or have a better way to do something, don't hesitate to open an issue!

## License

This project is licensed under the MIT license
