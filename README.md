# Item Box (Next.js + Express/Mongo-style Catalog)

Item Box is a simple catalog application built with **Next.js 15/16 (App Router)**. It includes a public landing page, public item listing and item details pages, and an optional protected flow to add new items after authentication. The UI follows a calm, vintage-inspired palette (mint, warm beige, and soft neutrals).

---

## Project Description (Short)

- Public users can browse a list of items and open a dedicated details page for each item.
- Authentication is implemented using **NextAuth.js** (Credentials + optional Google).
- Authenticated users can access a protected **Add Items** page to create new items stored in **MongoDB**.

---

## Setup & Installation

### 1) Clone & install

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YOUR_SECRET

# Google OAuth (optional, only if using Google Provider)
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

# MongoDB
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
DBNAME=YOUR_DB_NAME

## Route Summary:
### Public Routes
- / — Landing page (7 sections + Navbar + Footer)
- /all-page — All items page (search, filter, pagination)
- /all-page/[id] — Item details page
- /login — Login page (Credentials + optional Google)
- /register — Registration page

### Protected Routes
- /add-items — Add a new item (requires authentication)
- API Routes
- /api/auth/[...nextauth] — NextAuth handler (Credentials + Google)
- /api/auth/register — Register a user (stores in MongoDB)

---

## Implemented Features
- Landing Page
- Includes 7 total sections (excluding Navbar/Footer):
- Hero section
- Featured Items (shows 3 items)
- Features / Value Props
- How It Works (3 steps)
- Categories Preview (dynamic)
- FAQ (accordion)
- Final CTA

---

## Authentication (NextAuth.js)
- Credentials login (email + password) using stored hashed password in MongoDB
- Google login (optional) via OAuth provider
- Session uses JWT strategy
- Custom login page configured via pages.signIn = "/login"
- Registration
- POST /api/auth/register creates new user in MongoDB

Validations included:
- All fields required
- Email format validation
- Password rules (min length, uppercase, lowercase)
- Prevent duplicate registration by email or NID
- Passwords are stored using bcrypt hashing
- Items / Catalog
- Items list and details pages are publicly accessible
- Items are fetched from MongoDB using server functions:
- getItems()
- getSingleItem(id)

Supports:
- Search by keyword
- Category filter
- Sorting
- Pagination
- Add Item (Protected)
- Accessible only when logged in

Adds item data to MongoDB via server action:
createItem(payload)
Includes:
- Form validation
- Live preview card (no images)
- Success feedback and redirect to new item’s details page
- Edge Cases + UX Enhancements

Global:
- app/loading.jsx (skeleton)
- app/not-found.jsx (404)
- app/error.jsx (error boundary with retry)
- Route-level skeletons:
- /all-page/loading.jsx
- /all-page/[id]/loading.jsx
- /add-items/loading.jsx

Graceful handling of:
- Empty item list / no matches
- Invalid item id → not found
- Long text overflow in cards
- Form validation failures and server errors
- Brief Explanation of How It Works
- Data Flow (Items)
- Pages use server functions to query MongoDB collections (Items).
- List page supports filtering/sorting/pagination from query params.
- Details page loads one item by id and shows a structured “dossier” view.
- Auth Flow (NextAuth)
- Users can sign in using credentials or Google.
- Credentials login validates user by email + bcrypt password compare.
- Session info (user id + role) is stored in JWT and exposed to the UI via session.user.
- Protected Pages
- The /add-items route checks the session on the server and redirects unauthenticated users to:
- /login?next=/add-items

---

Tech Stack
- Next.js 15/16 (App Router)
- Tailwind CSS + daisyUI
- NextAuth.js (Credentials + Google)
- MongoDB (via official MongoDB Node driver)
- bcryptjs for password hashing
```
