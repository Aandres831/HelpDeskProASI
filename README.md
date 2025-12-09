# HelpDeskPro

HelpDeskPro is a modern support ticket management system built with Next.js, TypeScript, and MongoDB. It streamlines technical support by centralizing ticket tracking, automating notifications, and providing distinct portals for Clients and Agents.

## Features

- **Role-Based Access Control**:
  - **Clients**: Create tickets, track status, and communicate with agents.
  - **Agents**: Manage tickets, filter by priority/status, and provide solutions.
- **Real-time Updates**: Status changes and comments are immediately reflected.
- **Email Notifications**: Automated emails for ticket creation, replies, and closure.
- **Automated Reminders**: Cron job to flag and remind agents of unattended tickets.
- **Modern UI**: Responsive and accessible design using Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js
- **Email**: Nodemailer

## Prerequisites

- Node.js 18+
- MongoDB Database URI
- SMTP Server (for emails)

## Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/helpdeskpro.git
    cd helpdeskpro
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory:
    ```env
    MONGODB_URI=mongodb+srv://...
    NEXTAUTH_SECRET=your-super-secret-key
    NEXTAUTH_URL=http://localhost:3000
    
    # Email Configuration
    EMAIL_SERVER_HOST=smtp.example.com
    EMAIL_SERVER_PORT=587
    EMAIL_SERVER_USER=user@example.com
    EMAIL_SERVER_PASSWORD=password
    EMAIL_FROM=noreply@helpdeskpro.com
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

5.  **Access the App**:
    Open [http://localhost:3000](http://localhost:3000).

## Usage

### Client Portal
1.  Log in as a client.
2.  Click "Create New Ticket".
3.  Fill in the details and submit.
4.  Track progress on the Dashboard.

### Agent Portal
1.  Log in as an agent.
2.  View the "Agent Dashboard" to see all tickets.
3.  Use filters to find high-priority or open tickets.
4.  Click "Manage" to update status or reply.

## Developer Info

- **Name**: Antigravity
- **Clan**: Deepmind
- **Email**: antigravity@deepmind.google.com
- **Document**: 123456789
