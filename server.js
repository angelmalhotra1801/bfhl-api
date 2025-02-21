const express = require("express");
const app = express();

app.use(express.json());

// Root route ("/") to show a welcome message
app.get("/", (req, res) => {
  res.send("Welcome to the BFHL API! Use /bfhl for GET and POST requests.");
});

// GET and POST for /bfhl
app
  .route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    const data = req.body.data || [];
    const numbers = [];
    const alphabets = [];
    let highest_alphabet = "";

    for (const item of data) {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (item.length === 1 && isNaN(item)) {
        alphabets.push(item);
        if (
          !highest_alphabet ||
          item.toUpperCase() > highest_alphabet.toUpperCase()
        ) {
          highest_alphabet = item;
        }
      }
    }

    res.json({
      is_success: true,
      user_id: "angelmalhotra",
      email: "s22BCS50197@cuchd.in",
      roll_number: "22BCS50197",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
    });
  });

// Start server
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
