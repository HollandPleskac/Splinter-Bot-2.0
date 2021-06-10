import firestore from './firebase-admin'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await sendEmail(req.body.name, req.body.email)
    res.json({ result: 'success' })
  } else {
    console.log('request not met')
  }
}

// using node mailer properly with oAuth2 : https://www.youtube.com/watch?v=-rcRf7yswfM
async function sendEmail(name, email) {
  const CLIENT_ID = process.env.OAUTH2_CLIENT_ID
  const CLIENT_SECRET = process.env.OAUTH2_CLIENT_SECRET
  const REDIRECT_URI = process.env.OAUTH2_REDIRECT_URI
  const REFRESH_TOKEN = process.env.OAUTH2_REFRESH_TOKEN
  try {
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

    const accessToken = await oAuth2Client.getAccessToken()

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'hollandpleskac@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      },
    });

    const mailOptions = {
      from: '"Splinter Bot" <hollandpleskac@gmail.com>',
      to: "hollandpleskac@gmail.com",
      subject: "Splinter Bot Interest",
      text: `name: ${name} email: ${email}`,
      html: `<b>Name:</b> ${name} <b>Email:</b> ${email}`,
    }

    const info = await transport.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  } catch (e) {
    console.log('error sending email', e)
  }
}
