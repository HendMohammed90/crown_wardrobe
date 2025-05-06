# Crown Wardrobe

Crown Wardrobe is a React-based e-commerce application featuring a fully functional shopping experience, including user authentication, category browsing, cart management, and more. The app utilizes Firebase for authentication and database services.

## 🚀 Features

- **User Authentication**: Login and signup functionality using Firebase Authentication.
- **Category Pages**: Dynamic display of product categories.
- **Shopping Cart**: Add, remove, and manage products in the cart.
- **Responsive Design**: Optimized for desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: React 18.3.1
- **Routing**: `react-router-dom`
- **Forms**: React controlled forms with custom validation
- **Firebase**: For authentication (using redirect-based auth) and real-time database
- **Styling**: Sass (1.79.4)
- **Icons**: `react-icons`
- **Build Tool**: Vite
- **TypeScript**: 5.5.3
- **Linting**: ESLint

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd crown_wardrobe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Configure authentication and database.
   - Add Firebase configuration to the project.

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint.
- `npm run preview`: Previews the built app.

## 📁 Folder Structure

```
📂 crown_wardrobe
├── 📂 src
│   ├── 📂 layout           # BaseLayout components
│   ├── 📂 pages            # Login, Signup, Cart, Category pages
│   ├── 📂 services         # Firebase setup and services
│   ├── 📂 assets           # Images, icons, and styles
│   └── 📂 utils            # Helper functions
└── package.json
```

## 🤝 Contributing

Feel free to submit issues and pull requests to help improve the app.
