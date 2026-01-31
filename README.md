# Inventory Search

A modern inventory search system with premium UI and Express REST API.

## Features

-  Search products by name and description
-  Filter by category (Electronics, Audio, Furniture)
-  Filter by price range
-  Responsive design (mobile, tablet, desktop)
-  Real-time search with debouncing
-  Premium UI with smooth animations

## Quick Start

### Installation

```bash
npm install
npm start
```

Open `http://localhost:3000` in your browser.

## API Endpoints

### GET /search

Query parameters:
- `q` - Search query (product name/description)
- `category` - Filter by category
- `minPrice` - Minimum price (₹)
- `maxPrice` - Maximum price (₹)

**Examples:**
```
GET /search?q=laptop
GET /search?category=Electronics&minPrice=5000&maxPrice=50000
GET /search?q=keyboard&category=Electronics
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Gaming Laptop",
      "category": "Electronics",
      "price": 89999,
      "description": "High-performance laptop"
    }
  ]
}
```

## Project Structure

```
├── server.js        # Express server
├── inventory.js     # Sample data
├── package.json     # Dependencies
└── public/
    └── index.html   # Frontend (HTML + CSS + JS)
```

## Technologies

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **UI**: Premium responsive design

## License

MIT
