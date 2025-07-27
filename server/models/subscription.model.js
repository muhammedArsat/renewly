import mongoose from "mongoose";

const subscritptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "INR"],
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "Sports",
        "Entertainment",
        "Lifestyle",
        "Technology",
        "Finance",
        "Politics",
        "Other",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      // validate: {
      //   validator: (value) => value <= new Date(),
      //   message: "Start date must be in the past",
      // },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          value > this.startDate;
        },
        message: "renewal date must be after the start date",
      },
    },
    reminderCount: {
      type: Number,
      default: 0,
    },
    expiredAt: {
      type: Date,
      default: null,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
    bg:{
      type:String
    },
    text:{
      type:String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

//auto calculate renewal date if missing
subscritptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
    this.isExpired=true;
  }

  next();
});
const Subscription = mongoose.model("Subscription", subscritptionSchema);
export default Subscription;
