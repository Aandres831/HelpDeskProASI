# HelpDeskPro

HelpDeskPro is a modern, full-stack help desk application built with Next.js, TypeScript, and MongoDB. It facilitates efficient support ticket management with dedicated portals for Clients and Agents, real-time updates, and email notifications.

##  Features

*   **Role-Based Access Control**: Distinct interfaces for Clients (ticket creation/tracking) and Agents (ticket management).
*   **Ticket Management**: Create, read, update, and delete tickets.
*   **Comic-Style UI**: Unique, engaging user interface with a "comic" aesthetic and green theme.
*   **Real-time Updates**: Status changes and comments update instantly.
*   **Email Notifications**: Automated emails for ticket creation, replies, and status updates.
*   **Agent Dashboard**: Advanced filtering, sorting, and statistics (Agent Stats).
*   **Secure Authentication**: Powered by NextAuth.js.

##  Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
*   **Email**: [Nodemailer](https://nodemailer.com/)

##  Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas connection string)

##  Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Aandres831/HelpDeskProASI.git
    cd helpdeskproasi
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and add the following variables:

    ```env
    # Database Connection
    MONGODB_URI=mongodb://localhost:27017/helpdeskpro

    # NextAuth Configuration
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_super_secret_random_string

    # Email Server Configuration (SMTP)
    EMAIL_SERVER_HOST=smtp.example.com
    EMAIL_SERVER_PORT=587
    EMAIL_SERVER_USER=your_email@example.com
    EMAIL_SERVER_PASSWORD=your_email_password
    EMAIL_FROM=noreply@example.com
    ```

    > **Note:** Replace the SMTP details with your actual email provider credentials (e.g., Gmail, SendGrid, Mailtrap).

##  Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```

2.  **Access the application:**
    Open your browser and visit [http://localhost:3000](http://localhost:3000).

##  Usage Guide

### 1. Registration & Login
*   Navigate to `/auth/register` to create a new account.
*   By default, all new users are assigned the **Client** role.

### 2. Client Portal
*   **Dashboard**: View a list of your submitted tickets with their current status.
*   **Create Ticket**: Submit a new support request with a title, description, and priority.
*   **Ticket Details**: Click on a ticket to view the conversation history and add comments.

### 3. Agent Portal
*   **Access**: Only users with the `agent` role can access `/agent/dashboard`.
    > **Important**: To create the first agent, register a user normally, then manually update their `role` to `'agent'` in your MongoDB database.
*   **Dashboard**: View all tickets from all clients. Filter by status and priority.
*   **Agent Stats**: Click the "Agent Stats" button to view ticket assignment distribution.
*   **Ticket Management**:
    *   Change Status (Open, In Progress, Resolved, Closed).
    *   Change Priority (Low, Medium, High).
    *   Assign tickets to other agents.
    *   Delete tickets (with confirmation).
*   **Agent Management**: Create new agent accounts directly from the dashboard.

## API Endpoints

The application exposes several API routes for interaction:

*   **Auth**: `/api/auth/[...nextauth]`
*   **Tickets**:
    *   `GET /api/tickets`: List tickets.
    *   `POST /api/tickets`: Create a ticket.
    *   `GET /api/tickets/[id]`: Get ticket details.
    *   `PUT /api/tickets/[id]`: Update ticket.
    *   `DELETE /api/tickets/[id]`: Delete ticket.
*   **Comments**:
    *   `GET /api/comments?ticketId=[id]`: Get comments.
    *   `POST /api/comments`: Add a comment.
*   **Agents**:
    *   `GET /api/agents`: List agents.
    *   `POST /api/agents`: Create an agent.
*   **Reports**:
    *   `GET /api/reports/agent-stats`: Get agent ticket statistics.

##  Verification

To verify the system is working correctly:
1.  Register a user (Client).
2.  Create a ticket.
3.  Check your email (if SMTP is configured) for a confirmation.
4.  Log in as an Agent (after DB update).
5.  View the ticket in the Agent Dashboard.
6.  Reply to the ticket and change its status.
7.  Verify the Client sees the reply and status change.

## 🧪 Testing

The project includes basic End-to-End (E2E) tests using Cypress.

1.  **Run the development server**:
    ```bash
    npm run dev
    ```

2.  **Open Cypress Test Runner**:
    ```bash
    npm run test:e2e
    ```

3.  **Run Tests**:
    In the Cypress window, choose "E2E Testing" and select a browser (e.g., Chrome). You can then run individual spec files like `login.cy.ts`.

### Unit Testing

The project also includes Unit Tests using Jest and React Testing Library.

1.  **Run Unit Tests**:
    ```bash
    npm test
    ```

2.  **Run in Watch Mode**:
    ```bash
    npm run test:watch
    ```

---
Built with ❤️ by the HelpDeskPro Team.
