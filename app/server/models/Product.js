const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  category: { 
    type: String, 
    required: true,
    enum: ['sneakers', 'hoodies', 'tshirts', 'longsleeves', 'polos', 'jeans', 'cargos', 'sweatpants', 'tracksuits', 'jackets', 'hijabs', 'caps', 'beanies', 'chains', 'watches', 'sunglasses', 'crossbags', 'backpacks', 'belts', 'durags', 'rings']
  },
  subcategory: { type: String },
  brand: { type: String, required: true },
  images: [{ type: String, required: true }],
  sizes: [sizeSchema],
  description: { type: String, required: true },
  features: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isOnSale: { type: Boolean, default: false },
  tags: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update timestamp on save
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for search
productSchema.index({ name: 'text', description: 'text', brand: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
