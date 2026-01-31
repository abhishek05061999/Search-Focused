const express = require('express');
const cors = require('cors');
const inventoryData = require('./inventory');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(express.static('public'));

// GET /search endpoint
app.get('/search', (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;

  try {
    let results = inventoryData;

    // Filter by search query (case-insensitive partial match)
    if (q && q.trim() !== '') {
      const query = q.toLowerCase();
      results = results.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    // Filter by category (case-insensitive, supports multiple categories)
    if (category && category.trim() !== '') {
      const categories = category.split(',').map(c => c.trim().toLowerCase());
      results = results.filter(item =>
        categories.includes(item.category.toLowerCase())
      );
    }

    // Filter by minimum price
    if (minPrice !== undefined && minPrice !== '') {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        results = results.filter(item => item.price >= min);
      }
    }

    // Filter by maximum price
    if (maxPrice !== undefined && maxPrice !== '') {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        results = results.filter(item => item.price <= max);
      }
    }

    // Return results
    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server running' });
});

app.listen(PORT, () => {
  console.log(`✅ Inventory Search API running on port ${PORT}`);
  console.log(`📍 Visit: http://localhost:${PORT}`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/search`);
  console.log(`🚀 Environment: ${NODE_ENV}`);
});
