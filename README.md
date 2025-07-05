React URL Shortener 

This is a small React app I built for shortening URLs, kind of like Bitly but much simpler. It supports creating custom or random shortcodes, setting a validity time for the URL, and tracks how many times each link is clicked.

---

## What It Does

- You can input any long URL and get a shorter version of it.
- Optionally, you can choose your own custom shortcode (like `mycollege23`).
- You can also set how long the shortened link should work (in minutes).
- The app keeps track of how many times each link was clicked.
- There's a `/stats` page that shows a summary of all links and their stats.

Everything is stored in your browser's localStorage, so no backend is needed.

---

##  Tech Used

- React (with functional components and hooks)
- React Router for routing and redirects
- Material UI (for the stats table)
- Tailwind CSS (for basic UI styling)
- localStorage (to save the links and stats)

---

##  How to Run

1. Make sure Node.js and npm are installed.
2. Clone this repo or download the source files.
3. In the project directory, run:

```bash
npm install
npm start
This will launch the app on http://localhost:3000.

Usage Instructions
Enter a long URL you want to shorten.

(Optional) Provide a shortcode and how long the link should be valid.

Click "Shorten".

You’ll see the shortcode listed below — click on it to simulate a redirect and increase the click count.

You can also open the shortened URL manually in a new tab:
Example: http://localhost:3000/abc123

Visit http://localhost:3000/stats to view all shortened links with:

Shortcode

Original URL

Number of clicks

Expiry time

Example
If you shorten this:

arduino
Copy
Edit
https://www.rajalakshmi.org/
with shortcode: rlc2025,
validity: 10 minutes,

You can visit:

bash
Copy
Edit
http://localhost:3000/rlc2025
within 10 minutes to be redirected.




