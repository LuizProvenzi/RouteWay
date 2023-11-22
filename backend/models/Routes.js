const mongoose = require('mongoose');

const CoordinateSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
});

const PlaceSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
});

const RoutesSchema = new mongoose.Schema({
  id: Number,
  name: String,
  type: String,
  distance: Number,
  time: Number,
  cords: [CoordinateSchema],
  places: [PlaceSchema],
  isActive: Boolean,
});

const Routes = mongoose.model('Route', RoutesSchema);

module.exports = Routes;
