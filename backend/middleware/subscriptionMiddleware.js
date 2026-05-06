export const subscriptionMiddleware = (req, res, next) => {
  // If no user → treat as free user
  if (!req.user) {
    req.subscription_type = "free";
    return next();
  }

  req.subscription_type = req.user.subscription_type;
  next();
};
