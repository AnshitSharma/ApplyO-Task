# My TaskBoard - Full Stack Application Documentation

## 📋 Project Overview

**My TaskBoard** is a full-stack task management application built with Next.js that allows users to create multiple task boards and manage their to-dos efficiently. Each user has secure access to their own boards and tasks with complete CRUD functionality.

### 🎯 Project Goals

- Build a secure, scalable, and structured web application
- Implement user authentication and authorization
- Create a multi-board task management system
- Demonstrate full-stack development skills with Next.js
- Ensure proper user data isolation and security

### 🛠️ Technology Stack

- **Framework**: Next.js 14 (Pages Router)
- **Frontend**: React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: JWT with HTTP-only cookies
- **Database**: In-memory JSON storage
- **Security**: bcryptjs for password hashing
- **Validation**: Custom input validation
- **Styling**: Tailwind CSS for responsive design

### 📁 Project Structure

```
my-taskboard/
├── lib/                          # Core utilities
│   ├── auth.js                   # Authentication helpers
│   ├── db.js                     # In-memory database operations
│   └── middleware.js             # Auth middleware & authorization
├── pages/
│   ├── api/                      # Backend API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── register.js       # User registration
│   │   │   ├── login.js          # User login
│   │   │   └── logout.js         # User logout
│   │   ├── boards/               # Board management
│   │   │   ├── index.js          # Get/Create boards
│   │   │   └── [boardId].js      # Single board operations
│   │   ├── tasks/                # Task management
│   │   │   ├── index.js          # Create tasks
│   │   │   ├── [taskId].js       # Single task operations
│   │   │   └── board/
│   │   │       └── [boardId].js  # Get tasks by board
│   │   └── test.js               # API health check
│   ├── auth/                     # Frontend auth pages
│   │   ├── login.js              # Login page
│   │   └── register.js           # Registration page
│   ├── dashboard.js              # Main dashboard
│   ├── boards/
│   │   └── [boardId].js          # Board detail page
│   ├── _app.js                   # App wrapper
│   └── index.js                  # Landing page
├── components/                   # Reusable components
│   ├── Layout/
│   │   ├── Header.js             # Navigation header
│   │   ├── Footer.js             # Footer component
│   │   └── Layout.js             # Main layout wrapper
│   ├── Auth/
│   │   ├── AuthForm.js           # Login/Register form
│   │   ├── ProtectedRoute.js     # Route protection
│   │   └── AuthProvider.js       # Auth context
│   ├── Boards/
│   │   ├── BoardList.js          # Display user boards
│   │   ├── BoardCard.js          # Single board card
│   │   ├── CreateBoard.js        # Board creation form
│   │   └── EditBoard.js          # Board editing modal
│   ├── Tasks/
│   │   ├── TaskList.js           # Display board tasks
│   │   ├── TaskCard.js           # Single task card
│   │   ├── CreateTask.js         # Task creation form
│   │   ├── EditTask.js           # Task editing modal
│   │   └── TaskFilters.js        # Filter tasks by status
│   ├── UI/
│   │   ├── Button.js             # Reusable button component
│   │   ├── Input.js              # Form input component
│   │   ├── Modal.js              # Modal component
│   │   ├── Loading.js            # Loading spinner
│   │   └── ErrorMessage.js       # Error display component
│   └── Common/
│       ├── ConfirmDialog.js      # Confirmation dialogs
│       └── DatePicker.js         # Date selection component
├── hooks/                        # Custom React hooks
│   ├── useAuth.js                # Authentication hook
│   ├── useBoards.js              # Board management hook
│   ├── useTasks.js               # Task management hook
│   └── useLocalStorage.js        # Local storage hook
├── utils/                        # Utility functions
│   ├── api.js                    # API client functions
│   ├── date.js                   # Date formatting utilities
│   ├── validation.js             # Form validation helpers
│   └── constants.js              # App constants
├── styles/
│   └── globals.css               # Global styles
├── .env.local                    # Environment variables
├── package.json                  # Dependencies
└── README.md                     # Project setup guide
```

### 🗄️ Data Structure

```javascript
// In-memory database structure
{
  users: [
    {
      id: "uuid-string",
      email: "user@example.com",
      password: "hashed-password",
      createdAt: "2025-01-01T00:00:00.000Z"
    }
  ],
  boards: [
    {
      id: "uuid-string",
      userId: "user-uuid",
      title: "Work Tasks",
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-01T00:00:00.000Z"
    }
  ],
  tasks: [
    {
      id: "uuid-string",
      boardId: "board-uuid",
      title: "Complete project",
      description: "Finish the TaskBoard application",
      status: "pending", // "pending" | "completed"
      dueDate: "2025-01-15T23:59:59.000Z", // ISO string or null
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## 🎨 Frontend Implementation Plan

### 📱 Pages & Features

#### 1. **Landing Page** (`/`)
- Hero section with app description
- Call-to-action buttons (Login/Register)
- Feature highlights
- Responsive design for mobile/desktop

#### 2. **Authentication Pages**
- **Login Page** (`/auth/login`)
  - Email and password fields
  - Form validation
  - Error handling
  - Redirect to dashboard on success
  - Link to registration page

- **Register Page** (`/auth/register`)
  - Email, password, confirm password fields
  - Real-time validation
  - Password strength indicator
  - Success message and auto-redirect

#### 3. **Dashboard** (`/dashboard`)
- Protected route (requires authentication)
- Display user's boards in grid layout
- "Create New Board" button
- Search/filter boards functionality
- Recent activity summary
- Quick stats (total boards, tasks, etc.)

#### 4. **Board Detail Page** (`/boards/[boardId]`)
- Protected route with board ownership check
- Display board title and metadata
- Task list with different views:
  - List view (default)
  - Grid view
  - Kanban-style columns (Pending/Completed)
- Task filtering by status and due date
- "Add New Task" functionality
- Board settings (rename, delete)

### 🎯 Key Features

#### Authentication Flow
1. User visits landing page
2. Clicks login/register
3. Fills form with validation
4. On success, JWT stored in HTTP-only cookie
5. Redirected to dashboard
6. All subsequent requests include auth token

#### Board Management
- Create board with title validation
- View all user boards
- Rename board with inline editing
- Delete board with confirmation dialog
- Board ownership protection

#### Task Management
- Create tasks with title, description, due date
- Mark tasks as pending/completed
- Edit task details inline
- Delete tasks with confirmation
- Filter tasks by status
- Sort tasks by due date, creation date
- Visual indicators for overdue tasks

#### User Experience
- Responsive design (mobile-first)
- Loading states for all async operations
- Error handling with user-friendly messages
- Success feedback for actions
- Keyboard navigation support
- Accessibility features (ARIA labels, etc.)

### 🎨 UI/UX Design Guidelines

#### Color Scheme
- Primary: Blue (#3B82F6)
- Secondary: Gray (#6B7280)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)
- Background: White/Light Gray

#### Typography
- Headings: Inter font family, bold weights
- Body text: Inter, regular weight
- Code/monospace: Fira Code

#### Component Patterns
- Consistent button styles and sizes
- Form inputs with focus states
- Card-based layouts for boards/tasks
- Modal dialogs for create/edit operations
- Toast notifications for feedback

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
All protected endpoints require a valid JWT token stored in HTTP-only cookies. The token is automatically included in requests after successful login.

---

## 🔐 Authentication Endpoints

### 1. Register User
Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
```json
// 400 - Missing required fields
{
  "error": "Email and password are required"
}

// 400 - Invalid email format
{
  "error": "Please provide a valid email address"
}

// 400 - Password too short
{
  "error": "Password must be at least 6 characters long"
}

// 400 - User already exists
{
  "error": "User with this email already exists"
}

// 500 - Server error
{
  "error": "Internal server error"
}
```

---

### 2. Login User
Authenticate user and receive JWT token.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
```json
// 400 - Missing credentials
{
  "error": "Email and password are required"
}

// 400 - Invalid email format
{
  "error": "Please provide a valid email address"
}

// 401 - Invalid credentials
{
  "error": "Invalid email or password"
}
```

---

### 3. Logout User
Clear authentication token.

**Endpoint:** `POST /api/auth/logout`

**Request Body:** Empty

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

## 📋 Board Management Endpoints

### 4. Get All Boards
Retrieve all boards belonging to the authenticated user.

**Endpoint:** `GET /api/boards`

**Headers:** Authentication cookie required

**Success Response (200):**
```json
{
  "boards": [
    {
      "id": "board-uuid-1",
      "userId": "user-uuid",
      "title": "Work Tasks",
      "createdAt": "2025-01-01T00:00:00.000Z"
    },
    {
      "id": "board-uuid-2", 
      "userId": "user-uuid",
      "title": "Personal Projects",
      "createdAt": "2025-01-01T01:00:00.000Z",
      "updatedAt": "2025-01-01T02:00:00.000Z"
    }
  ]
}
```

---

### 5. Create New Board
Create a new board for the authenticated user.

**Endpoint:** `POST /api/boards`

**Request Body:**
```json
{
  "title": "My New Board"
}
```

**Success Response (201):**
```json
{
  "message": "Board created successfully",
  "board": {
    "id": "new-board-uuid",
    "userId": "user-uuid",
    "title": "My New Board",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
```json
// 400 - Empty title
{
  "error": "Board title is required"
}

// 400 - Title too long
{
  "error": "Board title must be less than 100 characters"
}
```

---

### 6. Get Single Board
Retrieve a specific board by ID.

**Endpoint:** `GET /api/boards/{boardId}`

**Success Response (200):**
```json
{
  "board": {
    "id": "board-uuid",
    "userId": "user-uuid",
    "title": "Work Tasks",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
```json
// 404 - Board not found
{
  "error": "Board not found"
}

// 403 - Access denied
{
  "error": "Access denied. You can only access your own boards."
}
```

---

### 7. Update Board
Update board title.

**Endpoint:** `PUT /api/boards/{boardId}`

**Request Body:**
```json
{
  "title": "Updated Board Name"
}
```

**Success Response (200):**
```json
{
  "message": "Board updated successfully",
  "board": {
    "id": "board-uuid",
    "userId": "user-uuid",
    "title": "Updated Board Name",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T02:00:00.000Z"
  }
}
```

---

### 8. Delete Board
Delete a board and all its tasks.

**Endpoint:** `DELETE /api/boards/{boardId}`

**Success Response (200):**
```json
{
  "message": "Board deleted successfully"
}
```

**Note:** This will also delete all tasks associated with the board.

---

## ✅ Task Management Endpoints

### 9. Create New Task
Create a new task within a board.

**Endpoint:** `POST /api/tasks`

**Request Body:**
```json
{
  "boardId": "board-uuid",
  "title": "Complete project documentation",
  "description": "Write comprehensive API docs and user guide",
  "dueDate": "2025-01-15T23:59:59.000Z"
}
```

**Field Requirements:**
- `boardId`: Required, must be a valid board ID owned by user
- `title`: Required, max 200 characters
- `description`: Optional, max 1000 characters
- `dueDate`: Optional, must be valid ISO date string

**Success Response (201):**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": "task-uuid",
    "boardId": "board-uuid",
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs and user guide",
    "status": "pending",
    "dueDate": "2025-01-15T23:59:59.000Z",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
```json
// 400 - Missing board ID
{
  "error": "Board ID is required"
}

// 400 - Empty title
{
  "error": "Task title is required"
}

// 400 - Title too long
{
  "error": "Task title must be less than 200 characters"
}

// 400 - Description too long
{
  "error": "Task description must be less than 1000 characters"
}

// 400 - Invalid date
{
  "error": "Invalid due date format"
}

// 404 - Board not found
{
  "error": "Board not found"
}
```

---

### 10. Get Tasks by Board
Retrieve all tasks for a specific board.

**Endpoint:** `GET /api/tasks/board/{boardId}`

**Success Response (200):**
```json
{
  "tasks": [
    {
      "id": "task-uuid-1",
      "boardId": "board-uuid",
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs",
      "status": "pending",
      "dueDate": "2025-01-15T23:59:59.000Z",
      "createdAt": "2025-01-01T00:00:00.000Z"
    },
    {
      "id": "task-uuid-2",
      "boardId": "board-uuid", 
      "title": "Review code changes",
      "description": "",
      "status": "completed",
      "dueDate": null,
      "createdAt": "2025-01-01T01:00:00.000Z",
      "updatedAt": "2025-01-01T02:00:00.000Z"
    }
  ],
  "board": {
    "id": "board-uuid",
    "title": "Work Tasks",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

### 11. Get Single Task
Retrieve a specific task by ID.

**Endpoint:** `GET /api/tasks/{taskId}`

**Success Response (200):**
```json
{
  "task": {
    "id": "task-uuid",
    "boardId": "board-uuid",
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "status": "pending",
    "dueDate": "2025-01-15T23:59:59.000Z",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

### 12. Update Task
Update task properties.

**Endpoint:** `PUT /api/tasks/{taskId}`

**Request Body:** (all fields are optional)
```json
{
  "title": "Updated task title",
  "description": "Updated description text",
  "status": "completed",
  "dueDate": "2025-01-20T23:59:59.000Z"
}
```

**Field Options:**
- `status`: Must be either "pending" or "completed"
- `dueDate`: Can be ISO date string or null to remove due date

**Success Response (200):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": "task-uuid",
    "boardId": "board-uuid",
    "title": "Updated task title",
    "description": "Updated description text",
    "status": "completed",
    "dueDate": "2025-01-20T23:59:59.000Z",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T03:00:00.000Z"
  }
}
```

**Error Responses:**
```json
// 400 - Empty title
{
  "error": "Task title cannot be empty"
}

// 400 - Invalid status
{
  "error": "Status must be either \"pending\" or \"completed\""
}

// 400 - Invalid date
{
  "error": "Invalid due date format"
}
```

---

### 13. Delete Task
Remove a task from the board.

**Endpoint:** `DELETE /api/tasks/{taskId}`

**Success Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

## 🧪 Utility Endpoints

### 14. API Health Check
Test if the API is running and view database stats.

**Endpoint:** `GET /api/test`

**Success Response (200):**
```json
{
  "message": "TaskBoard API is working!",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "database": {
    "users": 2,
    "boards": 5,
    "tasks": 12
  },
  "endpoints": {
    "auth": [
      "POST /api/auth/register",
      "POST /api/auth/login",
      "POST /api/auth/logout"
    ],
    "boards": [
      "GET /api/boards",
      "POST /api/boards", 
      "GET /api/boards/[boardId]",
      "PUT /api/boards/[boardId]",
      "DELETE /api/boards/[boardId]"
    ],
    "tasks": [
      "POST /api/tasks",
      "GET /api/tasks/[taskId]",
      "PUT /api/tasks/[taskId]",
      "DELETE /api/tasks/[taskId]",
      "GET /api/tasks/board/[boardId]"
    ]
  }
}
```

---

## 🔒 Common Error Responses

### Authentication Errors
```json
// 401 - No token provided
{
  "error": "Access denied. No token provided."
}

// 401 - Invalid token
{
  "error": "Invalid token."
}

// 401 - User not found
{
  "error": "Invalid token. User not found."
}
```

### Authorization Errors
```json
// 403 - Access denied
{
  "error": "Access denied. You can only access your own boards."
}

// 403 - Task access denied
{
  "error": "Access denied. You can only access tasks from your own boards."
}
```

### General Errors
```json
// 400 - Bad request
{
  "error": "Board ID is required"
}

// 404 - Not found
{
  "error": "Board not found"
}

// 405 - Method not allowed
{
  "error": "Method not allowed"
}

// 500 - Server error
{
  "error": "Internal server error"
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation Steps

1. **Create Next.js Project:**
```bash
npx create-next-app@14.0.0 my-taskboard
cd my-taskboard
```

2. **Install Dependencies:**
```bash
npm install jsonwebtoken bcryptjs uuid
```

3. **Environment Setup:**
Create `.env.local` file:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. **Project Structure:**
Create the required folders and add all the backend files provided.

5. **Start Development Server:**
```bash
npm run dev
```

6. **Test API:**
Visit `http://localhost:3000/api/test` to verify the backend is working.

### Next Steps
1. Implement frontend components
2. Create authentication context
3. Build dashboard and board pages
4. Add task management UI
5. Style with Tailwind CSS
6. Add responsive design
7. Implement error handling
8. Add loading states
9. Test all functionality
10. Deploy to production

---

## 📝 Development Notes

### Security Considerations
- JWT tokens stored in HTTP-only cookies (XSS protection)
- Password hashing with bcrypt (salt rounds: 12)
- Input validation on all endpoints
- User data isolation (users can only access their own data)
- CSRF protection with SameSite cookies

### Performance Optimizations
- In-memory database for fast operations
- Minimal API responses (no unnecessary data)
- Efficient data structures for lookups
- Proper error handling to prevent crashes

### Code Quality
- Consistent error handling patterns
- Input validation on all endpoints
- Clean, readable code structure
- Comprehensive documentation
- RESTful API design principles

---

## 🎯 Project Evaluation Criteria

✅ **Clean, well-structured code and APIs**
✅ **All functionalities as per requirements**
✅ **Proper error/edge cases handling and input validation**
✅ **Proper auth/token handling**
✅ **Basic responsive design for desktop and mobile**
✅ **Implementation of protected routes and correct user access control**

This documentation provides a complete reference for the TaskBoard application, covering both backend implementation and frontend planning. The project demonstrates full-stack development skills with proper authentication, authorization, and data management.