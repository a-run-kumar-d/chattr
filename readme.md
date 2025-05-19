# chattr.io 💬

**chattr.io** is a real-time chat application that allows users to create or join chat lobbies and communicate instantly. Built with modern web technologies, this project demonstrates real-time data flow using WebSockets and a full-stack implementation with authentication and database support.

## 🚀 Features

- 🔐 **User Authentication** using Firebase Auth
- 🏠 **Lobby System**: Create a new chat lobby or join an existing one via code or from the public list
- 🧑‍🤝‍🧑 **Real-Time User Presence**: See who is currently in the lobby
- 💬 **Real-Time Messaging** powered by Socket.io
- ⚡ **Built with Vite** for fast frontend development

## 🛠️ Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| Language   | TypeScript             |
| Frontend   | React + Vite           |
| Backend    | Node.js + Express      |
| Database   | MongoDB                |
| Auth       | Firebase Authentication|
| Realtime   | Socket.io              |

## 📸 demoVideo

- https://drive.google.com/file/d/1yf3YfZKn5mRO_Abrsm0OW9Qfo9cc-B2K/view?usp=drive_link


## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chattr.io.git
cd chattr
cd backend
npm install
# Set environment variables in a .env file (Mongo URI, Firebase credentials, etc.)
npm start
```

### 2. front end
```bash
npm run dev
cd client
npm install
npm run dev
```

### 3. .env File setup
- frontend
  ```bash
  VITE_API_URL : (server link)
  ```
- backend
  ```bash
  MONGODB_URI=your_mongodb_connection_string
  PORT=5000
  ```
### Built with ❤️ by Arunkumar D


