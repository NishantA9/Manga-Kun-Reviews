# **📚 Manga-Kun Reviews**

🔗 **Live Repository:**
https://github.com/NishantA9/Manga-Kun-Reviews

## **🧩 Overview**

Manga-Kun Reviews is a modern full-stack book collection web application built using React and Supabase.

The application allows users to manage a personal collection of books they have read through a clean, responsive, and fully functional CRUD workflow.

Each book entry includes:

📖 **Title**

✍️ **Author**

🔢 **ISBN**

📝 **Description**

⭐ **Personal Rating** (0–10, decimals supported)

📅 **Date Read**

🖼 **Auto-fetched Book Cover**

Book covers are dynamically fetched using the Open Library Covers API based on ISBN.

## **✨ Features**

### **📚 Core Functionality**

- View books in a responsive grid layout
- Add new books with metadata
- Edit existing book entries
- Delete books
- Dedicated book detail page
- Decimal rating support (e.g., 9.5 / 10)
- Automatic cover generation via ISBN

### **🎨 UI & UX**

- Responsive card grid layout
- Centered content structure
- Clean header and footer navigation
- Hover animations on cards
- Styled reusable buttons
- Smooth routing between pages

### **🌐 External Integration**

- Open Library Covers API
- Graceful handling of missing cover images

## **🛠 Tech Stack**

### **Frontend**

⚛️ **React** (Vite)
- React Router
- Custom CSS
- Bootstrap (Navbar utilities)

### **Backend / Database**

🗄 **Supabase** (PostgreSQL)
- Supabase JavaScript Client

### **External APIs**

🌍 **Open Library Covers API**

## **🏗 Architecture**

The application follows a modern client-side architecture:

- React handles UI rendering and routing
- Supabase manages database persistence
- Open Library API provides dynamic book cover images
- Layout component ensures consistent page structure

## **📂 Project Structure**





🔗 Live Repository:
https://github.com/NishantA9/Manga-Kun-Reviews

🧩 Overview

Manga-Kun Reviews is a modern full-stack book collection web application built using React and Supabase.

The application allows users to manage a personal collection of books they have read through a clean, responsive, and fully functional CRUD workflow.

Each book entry includes:

📖 Title

✍️ Author

🔢 ISBN

📝 Description

⭐ Personal Rating (0–10, decimals supported)

📅 Date Read

🖼 Auto-fetched Book Cover

Book covers are dynamically fetched using the Open Library Covers API based on ISBN.

✨ Features
📚 Core Functionality

View books in a responsive grid layout

Add new books with metadata

Edit existing book entries

Delete books

Dedicated book detail page

Decimal rating support (e.g., 9.5 / 10)

Automatic cover generation via ISBN

🎨 UI & UX

Responsive card grid layout

Centered content structure

Clean header and footer navigation

Hover animations on cards

Styled reusable buttons

Smooth routing between pages

🌐 External Integration

Open Library Covers API

Graceful handling of missing cover images

🛠 Tech Stack
Frontend

⚛️ React (Vite)

React Router

Custom CSS

Bootstrap (Navbar utilities)

Backend / Database

🗄 Supabase (PostgreSQL)

Supabase JavaScript Client

External APIs

🌍 Open Library Covers API

🏗 Architecture

The application follows a modern client-side architecture:

React handles UI rendering and routing

Supabase manages database persistence

Open Library API provides dynamic book cover images

Layout component ensures consistent page structure


 ├── components/
 │    ├── Header.jsx
 │    ├── Footer.jsx
 │    └── Layout.jsx
 │
 ├── pages/
 │    ├── Home.jsx
 │    ├── AddBook.jsx
 │    ├── EditBook.jsx
 │    └── BookDetail.jsx
 │
 ├── lib/
 │    └── supabase.js
 │
 └── styles/
      └── main.css

## **⚙️ Local Setup Instructions**

### **1️⃣ Clone Repository**

```bash
git clone https://github.com/NishantA9/Manga-Kun-Reviews.git
cd Manga-Kun-Reviews
```

### **2️⃣ Install Dependencies**

```bash
npm install
```

### **3️⃣ Configure Supabase**

Create a `.env` file in the root directory:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

You can obtain these values from your Supabase project settings.

### **4️⃣ Run Development Server**

```bash
npm run dev
```

Open: http://localhost:5173

## **🚀 Future Enhancements**

- 🔐 User authentication (Supabase Auth)
- 🔎 Search by title or author
- 📊 Sorting filters (rating, date)
- ⭐ Star-based rating UI
- 🌙 Dark mode toggle
- 🖼 Fallback cover image handling
- 🌍 Production deployment

## **💡 Why This Project Matters**

This project demonstrates:

- Full CRUD application development
- Integration with external APIs
- Modern React routing architecture
- Component-based layout design
- Cloud database integration (Supabase)
- Responsive UI design principles

## **👨‍💻 Author**

**Nishant Acharekar**  
Full Stack Developer  
React | PostgreSQL | Supabase | Node