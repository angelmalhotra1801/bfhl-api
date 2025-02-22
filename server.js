const express = require("express");
const cors = require("cors"); // Import CORS

const app = express();

// Enable CORS for all requests
app.use(
  cors({
    origin: "https://bfhl-frontend-7sng.onrender.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Root route ("/")
app.get("/", (req, res) => {
  res.send("Welcome to the BFHL API! Use /bfhl for GET and POST requests.");
});

// GET /bfhl
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST /bfhl
app.post("/bfhl", (req, res) => {
  // Add CORS headers manually
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://bfhl-frontend-7sng.onrender.com"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    if (!req.body || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' must be an array.",
      });
    }

    const data = req.body.data;
    const numbers = [];
    const alphabets = [];
    let highest_alphabet = "";

    for (const item of data) {
      if (/^\d+$/.test(item)) {
        numbers.push(item);
      } else if (typeof item === "string" && item.length === 1 && isNaN(item)) {
        alphabets.push(item);
        if (
          !highest_alphabet ||
          item.toUpperCase() > highest_alphabet.toUpperCase()
        ) {
          highest_alphabet = item;
        }
      }
    }

    res.status(200).json({
      is_success: true,
      user_id: "angelmalhotra_18012005",
      email: "22BCS50197@cuchd.in",
      roll_number: "22BCS50197",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error",
    });
  }
});

// Start server
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
