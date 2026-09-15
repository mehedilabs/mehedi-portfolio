# Mehedi Hasan — Full-Stack Portfolio

A modern, responsive full-stack developer portfolio built to showcase my projects, technical skills, engineering mindset, and development journey.

The portfolio is being built with a React + TypeScript frontend and a Node.js + Express + MongoDB backend.

---

## 🌐 Links

- **Live Website:** https://mehedi-dev-portfolio.netlify.app/
- **GitHub:** https://github.com/mehedilabs
- **Status:** 🚧 Work in Progress — actively under development

> **Note:** The live website is currently available for preview. Some sections and features are still being developed and will be completed in upcoming updates.

---

## 👨‍💻 About

I'm Mehedi Hasan, a Full-Stack Web Developer focused on building clean, useful, and user-friendly digital products.

I enjoy working across the stack — from creating responsive interfaces to building backend APIs and working with databases.

My goal is to build products that are not only functional, but also simple, maintainable, and enjoyable to use.

---

## ✨ Features

### Frontend

- Responsive portfolio website
- React component-based architecture
- TypeScript for type safety
- React Router for page navigation
- Tailwind CSS for styling
- DaisyUI components
- Responsive project cards
- Project details pages
- Skills and technology sections
- Contact section
- Mobile-friendly navigation

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- REST API
- Project API
- Contact message API

### Planned Features

- Admin authentication
- Admin dashboard
- Project CRUD
- Featured project management
- Contact message management
- Secure admin access

---

## 🛠️ Technologies

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- DaisyUI
- React Icons
- Framer Motion

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Zod

### Tools

- Git
- GitHub
- VS Code
- MongoDB Atlas

---

## 📁 Project Structure

```text
mehedi-portfolio/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   │   └── server.ts
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

---

## 📄 Main Pages

| Route             | Purpose                |
| ----------------- | ---------------------- |
| `/`               | Home page              |
| `/about`          | About Me               |
| `/projects`       | All projects           |
| `/projects/:slug` | Project details        |
| `/skills`         | Technical skills       |
| `/thinking`       | Engineering philosophy |
| `/contact`        | Contact                |

---

## 🚀 Current Backend API

### Health Check

```text
GET /api/health
```

Used to check whether the backend server is running.

### Projects

```text
GET /api/projects
```

Returns all projects.

```text
GET /api/projects/:slug
```

Returns a single project by its slug.

### Messages

```text
POST /api/messages
```

Used to send a contact message to the backend.

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello Mehedi!"
}
```

---

## ⚙️ Local Development

### 1. Clone the repository

```bash
git clone https://github.com/mehedilabs/mehedi-portfolio.git
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

### 4. Install backend dependencies

```bash
cd server
npm install
```

### 5. Create environment variables

Create:

```text
server/.env
```

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Never commit the `.env` file to GitHub.

### 6. Start the backend

```bash
npm run dev
```

---

## 🗄️ Database

The backend uses **MongoDB** with **Mongoose**.

MongoDB Atlas is used as the cloud database environment.

The current database models include:

- Project
- Message
- Admin (authentication system in progress)

---

## 🧩 Project Architecture

The project follows a separated frontend and backend architecture.

```text
React + TypeScript
        ↓
Frontend UI
        ↓
REST API
        ↓
Express + Node.js
        ↓
Mongoose
        ↓
MongoDB
```

This separation makes the application easier to maintain and allows the backend to manage data independently from the frontend.

---

## 🎯 Engineering Philosophy

> Anyone can make a website work.
> I care about making it worth using.

Good engineering is not about writing more code.

It is about understanding the problem well enough to remove unnecessary complexity.

My approach is:

```text
Understand
    ↓
Break it down
    ↓
Build
    ↓
Test
    ↓
Improve
```

---

## 📸 Screenshots

Screenshots will be added after the final UI and responsive design are completed.

---

## 🔐 Admin System

The portfolio will include an admin dashboard where I can manage portfolio content without changing the frontend code manually.

Planned functionality:

- Admin login
- Project creation
- Project editing
- Project deletion
- Featured project management
- Contact message management

This section will be updated when the admin system is fully implemented.

---

## 📱 Responsive Design

The portfolio is being designed to work across:

- Mobile
- Tablet
- Laptop
- Desktop

Responsive behavior and final visual polish will be completed during the final development stages.

---

## 📈 Development Progress

Current progress:

- [x] Frontend project setup
- [x] React + TypeScript setup
- [x] Routing
- [x] Navbar
- [x] Layout and Footer
- [x] Home page
- [x] About page
- [x] Skills page
- [x] Thinking page
- [x] Contact page
- [x] Project data structure
- [x] Project cards
- [x] Projects page
- [x] Project details page
- [x] Featured projects
- [x] Backend setup
- [x] Express API
- [x] MongoDB/Mongoose setup
- [x] Project API
- [x] Contact message API
- [x] Frontend API service
- [x] Projects fetched from backend
- [ ] Admin authentication
- [ ] Admin dashboard
- [ ] Project CRUD
- [ ] Message management
- [ ] Responsive polish
- [ ] Animation
- [ ] SEO and production polish
- [ ] Deployment

---

## 📬 Contact

If you'd like to discuss a project, collaboration, or development opportunity:

- **GitHub:** https://github.com/mehedilabs
- **LinkedIn:** Add your LinkedIn URL
- **Email:** Add your email

---

## 📄 License

This project is created for my personal developer portfolio.

The source code is available for learning and reference, but the personal content, images, and branding belong to me.
