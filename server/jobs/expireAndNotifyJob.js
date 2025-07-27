import cron from "node-cron";
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/email.utils.js";

export const startExpireAndNotifyJob = () => {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    console.log("🔁 Cron running at", now.toISOString());

    try {
      // 1. Mark expired subscriptions
      const expired = await Subscription.updateMany(
        {
          renewalDate: { $lt: now },
          status: "active",
        },
        {
          $set: { status: "expired", expiredAt: now, isExpired: true },
        }
      );
      console.log(
        `✅ Marked ${expired.modifiedCount} subscriptions as expired`
      );

      // 2. Calculate "7 days from now" window
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 7);

      const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

      // 3. Find subscriptions whose renewal is 7 days away
      const subscriptionsToRemind = await Subscription.find({
        status: "active", // only active ones
        renewalDate: { $gte: startOfDay, $lte: endOfDay },
      }).populate("user");

      // 4. Send email reminders
      for (const sub of subscriptionsToRemind) {
        const userEmail = sub.user.email;
        await sendReminderEmail(userEmail, sub.name, sub.renewalDate);
        sub.reminderCount = (sub.reminderCount || 0) + 1;
        await sub.save();
        console.log(
          `📧 Sent reminder to ${userEmail} for "${
            sub.name
          }" (renewal: ${sub.renewalDate.toDateString()})`
        );
      }
    } catch (err) {
      console.error("❌ Cron job error:", err.message);
    }
  });
};
