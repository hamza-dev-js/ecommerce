# 🛍️ E-Commerce Platform

A modern full-stack e-commerce application built with React.js frontend and Node.js backend.

## 🌟 Features

### Frontend
- 🎨 Modern responsive UI with Tailwind CSS
- 🛒 Shopping cart functionality
- 🔍 Product search and filtering
- 📱 Mobile-friendly design
- ⚡ Fast loading with React best practices
- 🖼️ Product image gallery with fallbacks

### Backend
- 🚀 RESTful API with Express.js
- 💾 MySQL database integration
- 🔒 Secure authentication ready
- 📊 Product management system
- 🛡️ CORS enabled for cross-origin requests
- 📝 Comprehensive error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ecommerce
   PORT=5000
   NODE_ENV=development
   ```

4. **Set up database**
   ```sql
   CREATE DATABASE ecommerce;
   ```

5. **Run database migrations** (if any)
   ```bash
   npm run seed
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

## 🗄️ Database Schema

### Products Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/products/search/:query` | Search products |
| GET | `/api/products/category/:category` | Get products by category |



## 🎨 Features in Detail

### Product Management
- Add new products with images
- Edit existing product details
- Delete products
- Real-time stock management

### User Experience
- Responsive design for all devices
- Fast product search
- Category-based filtering
- Shopping cart persistence

### Admin Features
- Product CRUD operations
- Stock management
- Order management (ready for implementation)

## 🚧 Development

### Running in Development Mode
```bash
# Backend (terminal 1)
cd backend && npm run dev

# Frontend (terminal 2)
cd frontend && npm run dev
```

### Building for Production
```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm start
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 TODO Features

- [ ] User authentication & authorization
- [ ] Order management system
- [ ] Payment integration
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Inventory management
- [ ] Shipping calculation
- [ ] Multi-language support

## 🐛 Troubleshooting

### Common Issues

1. **Database connection failed**
   - Verify MySQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **CORS errors**
   - Backend CORS is configured for `http://localhost:3000`

3. **Port already in use**
   - Change PORT in `.env` or kill existing process


## 👨‍💻 Author

**Hamza**
- GitHub: [@hamza-dev-js](https://github.com/hamza-dev-js)

## 🙏 Acknowledgments

- React.js community
- Tailwind CSS team
- Express.js contributors
- MySQL team

---

**⭐ Star this repo if you found it helpful!**

---

