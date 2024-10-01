import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  shippingAddresses: [
    {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
      isPrimary: { type: Boolean, default: false },
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, default: 1 },
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  recentlyViewedItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      index: true,
    },
  ],
  paymentMethods: [
    {
      cardType: String,
      last4Digits: String,
      expirationDate: String,
      cardholderName: String,
      billingAddress: {
        street: String,
        city: String,
        state: String,
        zip: String,
        country: String,
      },
    },
  ],
  accountSettings: {
    emailPreferences: { type: Boolean, default: true },
    notifications: { type: Boolean, default: true },
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  enrolledCourses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course', // Assuming you have a 'Course' model
      },
      currentLessonIndex: {
        type: Number,
        default: 0, // Tracks the current lesson in the course
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare given password with the hashed one in the database
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Clear model cache
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model('User', userSchema);

export default User;
