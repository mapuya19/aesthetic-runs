const jwt = require("jsonwebtoken");
const prisma = require("./db/prisma");

module.exports = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(401).json({
        error: new Error("No token provided!"),
      });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      return response.status(401).json({
        error: new Error("User not found!"),
      });
    }

    request.user = user;
    next();
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
