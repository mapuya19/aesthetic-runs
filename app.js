const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");

// require database connection
const dbConnect = require("./db/dbConnect");
const prisma = require("./db/prisma");
const auth = require("./auth");

// execute database connection
dbConnect();

// security headers
app.use(helmet());

// rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// request logging
app.use(morgan("dev"));

// Landing page for back-end
app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
});

// registration endpoint
app.post("/registration", async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).send({
        message: "Email and password are required"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    response.status(201).send({
      message: "User created successfully",
      result: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return response.status(400).send({
        message: "Email already exists"
      });
    }
    next(error);
  }
});

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User created successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user, maybe email already exists?",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
app.post("/login", async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).send({
        message: "Email and password are required"
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return response.status(404).send({
        message: "Email not found, please try again."
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return response.status(400).send({
        message: "Incorrect password, please try again."
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        userEmail: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    response.status(200).send({
      message: "Login successful!",
      email: user.email,
      token,
    });
  } catch (error) {
    next(error);
  }
});

// bcrypt.hash(request.body.password, 10).then().catch();

// free endpoint
// app.get("/free-endpoint", (request, response) => {
//   response.json({ message: "You are free to access me anytime." });
// });

// authentication endpoint
// app.get("/auth-endpoint", auth, (request, response) => {
//   response.json({ message: "You are authorized to access me." });
// });

// 404 handler
app.use((request, response, next) => {
  response.status(404).json({ message: "Route not found" });
});

// error handling middleware
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(error.status || 500).json({
    message: error.message || "Internal server error",
    error: process.env.NODE_ENV === 'development' ? error : {},
  });
});

module.exports = app;
