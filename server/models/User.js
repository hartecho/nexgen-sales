import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  preferredName: {
    type: String,
    required: false
  },
  dateOfBirth: {
    type: Date,
    required: false, // Set to true if you want to make it mandatory
    validate: {
      validator: function(value) {
        // Ensure the date of birth is in the past
        return value <= new Date();
      },
      message: 'Date of birth must be in the past.',
    },
    default: null, // Can be null initially, no default date
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
    default: "lakshop8208ydgfu839yWOUGDFasd08y23089yqwe"
  },
  profilePicture: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  contact: {
    phone: {
      type: String,
      default: '',
    },
    street: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    zip: {
      type: String,
      default: '',
    },
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
    emailPreferences: {
      marketingEmails: { type: Boolean, default: true },
      offerEmails: { type: Boolean, default: true },
      transactionalEmails: { type: Boolean, default: true }, // e.g., order confirmations
      newsletterEmails: { type: Boolean, default: true },
    },
    browserNotifications: {
      promotional: { type: Boolean, default: true }, // Browser notifications for offers
      orderUpdates: { type: Boolean, default: true }, // Updates about order status
      newFeatures: { type: Boolean, default: true }, // Alerts for new platform features
      personalizedRecommendations: { type: Boolean, default: true }, // Notifications for recommended products
    },
    appPreferences: {
      theme: { type: String, enum: ['light', 'dark'], default: 'light' }, // User-selected theme
      language: { type: String, default: 'en' }, // Language preference
      timeZone: { type: String, default: 'UTC' }, // Timezone setting for user
    },
    dataPrivacy: {
      allowPersonalization: { type: Boolean, default: true }, // Use data for personalized recommendations
      shareDataWithPartners: { type: Boolean, default: false }, // Consent to share data with third-party partners
    },
    notifications: {
      enableAllNotifications: { type: Boolean, default: true }, // A master toggle for all notifications
    },
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
        ref: 'Course',
      },
      name: {
        type: String,
        default: ''
      },
      currentTrainingIndex: {
        type: Number,
        default: 0,
      },
      completionDate: {
        type: Date,
      },
      testResults: [
        {
          question: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
  onboardingStatus: {
    type: String,
    enum: ['incomplete', 'accepted', "rejected"],
    default: 'incomplete',
  },
  grade: {
    type: String,
    enum: ['Highly Promising', 'Promising', 'Average', 'Needs Improvement', 'Not Suitable', 'Ungraded'],
    default: 'Ungraded', // Default value for new users
  },
  adminDescription: {
    type: String,
    default: '', // Admin feedback about the user's potential
  },
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
