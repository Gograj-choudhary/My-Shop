# AI-Powered E-Commerce Platform

A modern full-stack e-commerce platform with AI-powered product search capabilities, built with React and Node.js.

##  Key Features

- **AI-Powered Product Search**
  - Advanced semantic search functionality
  - Natural language product discovery
  - Context-aware recommendations
  - Vector database integration for efficient similarity search
  - Real-time search suggestions

- **User Features**
  - Customer authentication (JWT + Google OAuth)
  - Product browsing and filtering
  - Shopping cart management
  - Order tracking
  - Secure checkout process

- **Admin Dashboard**
  - Product management (CRUD operations)
  - Order management
  - Customer management
  - Analytics and reporting

##  Tech Stack

### Frontend
- React with Vite
- TailwindCSS for styling
- Custom hooks for state management
- Responsive design
- API integration with Axios

### Backend
- Node.js & Express.js
- PostgreSQL with Sequelize ORM
- JWT & Passport.js for authentication
- Vector database for AI search functionality
- Rate limiting for API protection

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- Docker (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Gograj-choudhary/My-Shop.git
cd My-Shop
```

2. **Backend Setup**
```bash
cd Backend
npm install
# Configure your .env file
node server.js
```

**Backend File Structure**
```base
Backend/
├── config/
│   ├── db.js
│   └── db1.js
├── controllers/
│   ├── adminController.js
│   ├── aiController.js
│   ├── authController.js
│   └── customerController.js
├── middlewares/
│   ├── googleAuth.js
│   ├── jwt.js
│   └── rateLimiter.js
├── models/
│   ├── Address.js
│   ├── Admin.js
│   ├── Cart.js
│   ├── Customer.js
│   ├── Index.js
│   ├── Order.js
│   └── Product.js
├── routes/
│   ├── AdminRoutes.js
│   ├── authRoutes.js
│   └── customerRoutes.js
├── utils/
│   ├── embeddingUtils.js
│   └── vectorDB.js
├── .dockerignore
├── .env
├── .gitignore
├── Dockerfile.backend
├── package.json
└── server.js
```


3. **Frontend Setup**
```bash
cd Frontend
bun install
bun run dev
```

**Frontend File Structure**
```base
Frontend/
├── public/
│   └── images/
├── src/
│   ├── api/
│   │   ├── aboutCountry.json
│   │   ├── adminApi.jsx
│   │   ├── authApi.jsx
│   │   ├── customerApi.jsx
│   │   ├── footerData.json
│   │   └── postApi.jsx
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   └── AppLayout.jsx
│   │   └── UI/
│   │       ├── CustomerCard.jsx
│   │       ├── Footer.jsx
│   │       ├── Header.jsx
│   │       ├── Hero.jsx
│   │       ├── Loader.jsx
│   │       ├── ProductCard.jsx
│   │       ├── ProductDetails.jsx
│   │       └── SearchProduct.jsx
│   ├── hooks/
│   │   ├── useAdmin.jsx
│   │   ├── useAuth.jsx
│   │   └── useCustomer.jsx
│   ├── Pages/
│   │   ├── customerPages/
│   │   │   ├── AiSearchBox.jsx
│   │   │   ├── AllCartItems.jsx
│   │   │   ├── AllOrders.jsx
│   │   │   ├── AllProducts.jsx
│   │   │   ├── CustomerLogin.jsx
│   │   │   ├── CustomerReg.jsx
│   │   │   ├── GoogleAuthSuccess.jsx
│   │   │   ├── ProductDetailsCard.jsx
│   │   │   └── ProductFilterBar.jsx
│   │   ├── About.jsx
│   │   ├── AddProduct.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminReg.jsx
│   │   ├── Contect.jsx
│   │   ├── Home.jsx
│   │   ├── Product.jsx
│   │   └── UpdateProduct.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .dockerignore
├── .gitignore
├── Dockerfile.frontend
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

### Docker Setup
```bash
docker-compose up --build
```
### Docker Images 
```base
Fontend Docker Imaged
docker pull gograj/shipsy-frontend:latest 

Backend Docker Image 
ocker pull gograj/shipsy-backend:latest
```

## 🔍 AI Search Feature

The platform implements an advanced AI-powered search system that enhances the product discovery experience:

### Key Components
- `vectorDB.js`: Manages the vector embeddings database
- `embeddingUtils.js`: Handles text-to-vector transformations
- `aiController.js`: Processes search queries and returns relevant results
- `AiSearchBox.jsx`: Frontend component for AI search interface

### Search Capabilities
- Semantic understanding of user queries
- Product similarity matching
- Natural language processing
- Context-aware suggestions
- Fast and efficient search results

### How It Works
1. Product descriptions are converted to vector embeddings
2. User queries are processed through the same embedding model
3. Vector similarity search finds the most relevant products
4. Results are ranked and returned to the user in real-time

##  Environment Variables

### Backend
```
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/myshop
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173
GEMINI_API_KEY= your_gemini_api
# MySQL Database Configuration

DB_HOST=mysql
DB_USER=root
DB_PASSWORD=use_your_database_password
DB_NAME=myshop
DB_PORT=3306

# Pinecone Vector Database Configuration
PINECONE_API_KEY=use_your_pinecone_api_key
PINECONE_INDEX_NAME=myshop
PINECONE_ENVIRONMENT=use_your_pinecone_environment   # e.g., us-east-1
PINECONE_HOST=use_your_pinecone_host_url

```

### Frontend
```
VITE_API_URL=http://localhost:3000/api/v1
```

##  API Documentation

### Customer Endpoints
- `POST /api/v1/auth/register` - Customer registration
- `POST /api/v1/auth/login` - Customer login
- `GET /api/v1/customer/products` - Get all products
- `POST /api/v1/customer/cart` - Add to cart

### Admin Endpoints
- `POST /api/v1/admin/products` - Add new product
- `PUT /api/v1/admin/products/:id` - Update product
- `GET /api/v1/admin/orders` - Get all orders

### AI Search Endpoints
- `POST /api/v1/customer/search` - AI-powered product search
- `GET /api/v1/customer/suggestions` - Get search suggestions

##  Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Authors

- **Gograj Choudhary** - *Initial work*

---
Made with  by Gograj Choudhary
