import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: process.env.EMAIL_SERVER_PORT === '465', // true for 465, false for other ports
});

const sendEmail = async (to: string, subject: string, html: string) => {
  if (!process.env.EMAIL_SERVER_HOST) {
    console.log('Email server not configured. Skipping email send.');
    console.log(`To: ${to}, Subject: ${subject}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendTicketCreatedEmail = async (to: string, ticketId: string, title: string) => {
  const subject = `[HelpDeskPro] Ticket Created: ${title}`;
  const html = `
    <h1>Ticket Created Successfully</h1>
    <p>Your ticket "<strong>${title}</strong>" has been created.</p>
    <p>Ticket ID: ${ticketId}</p>
    <p>We will get back to you shortly.</p>
  `;
  await sendEmail(to, subject, html);
};

export const sendTicketReplyEmail = async (to: string, ticketId: string, title: string, message: string, authorName: string) => {
  const subject = `[HelpDeskPro] New Reply on Ticket: ${title}`;
  const html = `
    <h1>New Reply</h1>
    <p><strong>${authorName}</strong> replied to your ticket "<strong>${title}</strong>":</p>
    <blockquote>${message}</blockquote>
    <p>Ticket ID: ${ticketId}</p>
  `;
  await sendEmail(to, subject, html);
};

export const sendTicketClosedEmail = async (to: string, ticketId: string, title: string) => {
  const subject = `[HelpDeskPro] Ticket Closed: ${title}`;
  const html = `
    <h1>Ticket Closed</h1>
    <p>Your ticket "<strong>${title}</strong>" has been marked as closed.</p>
    <p>If you have further issues, please create a new ticket.</p>
  `;
  await sendEmail(to, subject, html);
};

export const sendReminderEmail = async (to: string, ticketId: string, title: string) => {
  const subject = `[HelpDeskPro] Reminder: Unresolved Ticket ${title}`;
  const html = `
    <h1>Ticket Reminder</h1>
    <p>The ticket "<strong>${title}</strong>" (ID: ${ticketId}) is still open and has not received a response recently.</p>
    <p>Please review it as soon as possible.</p>
  `;
  await sendEmail(to, subject, html);
};

export const sendTicketStatusUpdateEmail = async (to: string, ticketId: string, title: string, status: string) => {
  const subject = `[HelpDeskPro] Ticket Status Updated: ${title}`;
  const html = `
    <h1>Ticket Status Updated</h1>
    <p>The status of your ticket "<strong>${title}</strong>" has been updated to: <strong>${status.replace('_', ' ').toUpperCase()}</strong>.</p>
    <p>Ticket ID: ${ticketId}</p>
    <p>You can view the ticket details in your dashboard.</p>
  `;
  await sendEmail(to, subject, html);
};
