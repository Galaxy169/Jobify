import jwt from "jsonwebtoken";

export const authMiddleware = (request, response, next) => {
  try {
    // get token from the authorization header expect bearer token.
    // ? means optional chaning, it saves us from a crash if the header is missing and just return undefined
    const token = request.headers.authorization?.split(" ")[1];

    // if the header is empty or token is not there, send 401 - Unauthorized error and return;
    if (!token) return response.status(401).json({ message: "No token found" });

    // verify the token using out secert key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user data to the request object so the next function can use it.
    request.user = decoded;

    // if everything is okay, move to the next middleware or controller
    next();
  } catch (error) {
    // If the token is expired or tampered with, jwt.verify throws an error
    // We catch that here and tell the user they aren't authorized
    console.error("Auth error:", error.message);
    response.status(401).json({ message: "Invalid token" });
  }
};
