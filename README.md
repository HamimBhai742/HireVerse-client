# HireVerse - Job Management Platform

A modern, responsive job management platform built with React and Vite, featuring beautiful UI/UX design with dark mode support.

## 🚀 Project Overview

HireVerse is a comprehensive job management platform that connects freelancers with clients. The platform allows users to post jobs, browse available opportunities, place bids, and manage their freelance business efficiently. Built with modern web technologies and featuring a stunning, responsive design.

## ✨ Key Features

### 🔐 Authentication & User Management
- **Firebase Authentication** - Secure login/register system
- **User Profiles** - Personalized profile pages with social links
- **Role-based Access** - Different permissions for clients and freelancers

### 💼 Job Management
- **Job Posting** - Create detailed job listings with categories and budgets
- **Job Browsing** - Search and filter through available opportunities
- **Job Details** - Comprehensive job information with client details
- **Categories** - Web Development, Graphics Design, Digital Marketing

### 🎯 Bidding System
- **Place Bids** - Submit proposals with custom pricing and timelines
- **Bid Management** - Track submitted bids and their status
- **Bid Requests** - Manage incoming bids for posted jobs
- **Real-time Updates** - Instant notifications for bid activities

### 🎨 Modern UI/UX Design
- **Responsive Design** - Mobile-first approach for all devices
- **Dark Mode Support** - Toggle between light and dark themes
- **Gradient Backgrounds** - Beautiful gradient effects throughout
- **Smooth Animations** - Hover effects and transitions
- **Modern Cards** - Clean, professional card-based layouts

### 📱 Responsive Components
- **Modern Navbar** - Sticky navigation with user dropdown
- **Job Cards** - Beautiful job listing cards with hover effects
- **Profile Pages** - Comprehensive user profile with cover photos
- **Forms** - Modern form designs with icons and validation

## 🛠️ Technologies Used

### Frontend
- **React 19.0.0** - Modern React with latest features
- **Vite 6.1.0** - Fast build tool and development server
- **React Router DOM 7.2.0** - Client-side routing
- **Tailwind CSS 4.0.13** - Utility-first CSS framework
- **DaisyUI 5.0.3** - Tailwind CSS component library

### State Management & Data Fetching
- **TanStack React Query 5.66.7** - Server state management
- **React Hook Form 7.54.2** - Form handling and validation
- **Axios 1.7.9** - HTTP client for API requests

### Authentication & Backend
- **Firebase 11.3.1** - Authentication and backend services
- **React Hot Toast 2.5.2** - Toast notifications
- **SweetAlert2 11.17.2** - Beautiful alert dialogs

### UI Components & Icons
- **React Icons 5.5.0** - Icon library
- **React DatePicker 8.1.0** - Date selection component
- **Lottie React 2.4.1** - Animation library

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS & Autoprefixer** - CSS processing
- **Vite Plugin React** - React integration for Vite

## 🎯 Project Structure

```
src/
├── Components/
│   ├── JobCard/          # Job listing cards
│   ├── Navbar/           # Navigation component
│   ├── Modal/            # Modal dialogs
│   └── Slide/            # Carousel components
├── Pages/
│   ├── Home/             # Landing page
│   ├── JobDetails/       # Job detail view
│   ├── AddJob/           # Job posting form
│   ├── Profile/          # User profile
│   ├── AllJobs/          # Job listings
│   ├── MyBid/            # User's bids
│   ├── MyPostedJob/      # User's posted jobs
│   ├── BidRequest/       # Incoming bid requests
│   ├── Login/            # Authentication
│   ├── Register/         # User registration
│   └── Error/            # Error pages
├── hooks/                # Custom React hooks
├── Firebase/             # Firebase configuration
├── Routes/               # Route definitions
├── styles/               # Global styles
└── assets/               # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd solo-sphers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Design Features

### Modern UI Components
- **Gradient Backgrounds** - Beautiful color transitions
- **Glass Morphism** - Backdrop blur effects
- **Smooth Animations** - Hover and transition effects
- **Responsive Grid** - Flexible layouts for all screens
- **Dark Mode** - Complete dark theme support

### User Experience
- **Intuitive Navigation** - Easy-to-use interface
- **Fast Loading** - Optimized performance with Vite
- **Mobile Friendly** - Touch-optimized for mobile devices
- **Accessibility** - WCAG compliant design

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile Devices** (320px - 768px)
- **Tablets** (768px - 1024px)
- **Desktop** (1024px and above)
- **Large Screens** (1440px and above)

## 🌙 Dark Mode Support

Complete dark mode implementation with:
- **System Preference Detection**
- **Manual Toggle Option**
- **Persistent Theme Storage**
- **Smooth Transitions**

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hamim** - Full Stack Developer

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Firebase for backend services
- All open-source contributors

---

**Built with ❤️ using React + Vite + Tailwind CSS**
