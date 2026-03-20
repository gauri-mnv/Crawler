

# 🕵️‍♂️ NestJS Web Crawler & Headline Scraper

A lightweight and efficient web crawler built with **NestJS** to extract headlines and discover links from any webpage.

---

## 👤 Contributor

**Gauri Bidwai**

---

## 📖 What is Web Crawling?

Web crawling (also known as *spidering*) is the automated process of browsing the internet to collect data.

A crawler:

* Starts with a URL
* Extracts all links from the page
* Visits those links recursively
* Collects useful data along the way

### 🌍 Real-World Analogy

Imagine you're in a library:

1. You pick up a book about **Space**
2. Inside, you find a reference: *"See Book 405 for Mars"*
3. You go to Book 405
4. That book references another book on **Rockets**

A web crawler does exactly this—but at internet scale and speed.

---

## 🛠 Features

* **🔍 Headline Extraction**
  Extracts all `<h1>`, `<h2>`, and `<h3>` tags from a webpage

* **🔗 Link Discovery**
  Finds all `<a>` tags and returns outgoing links

* **📊 Data Counting**
  Provides counts of extracted headlines and links

* **⚠️ Error Handling**
  Handles blocked sites, invalid URLs, and network issues gracefully

---

## ⚖️ Benefits vs Disadvantages

### ✅ Benefits

* **Data Automation**
  Eliminates manual data collection

* **Market Intelligence**
  Track competitor content, pricing, or updates

* **SEO Auditing**
  Detect missing headings and broken links

---

### ❌ Disadvantages

* **IP Blocking**
  Websites may block your IP if requests are too frequent

* **Legal/Ethical Risks**
  Some sites restrict crawling via `robots.txt`

* **Maintenance Overhead**
  Changes in website structure can break the scraper

---


### 📊 API Response Example

![API Response](https://i.ibb.co/rRfP6V68/basic-Scaper.png)

![API Response](https://i.ibb.co/b5GtSm0m/headings-and-anc.png)

![console Response](https://i.ibb.co/rfcWRCwz/Screenshot-from-2026-03-20-09-51-38.png)



## 🚀 Getting Started

### 1️⃣ Installation

```bash
npm install
```

---

### 2️⃣ Run the Application

```bash
npm run start
```

The server will start at:

```
http://localhost:4005
```

---

## 📡 API Usage

### Endpoint

```
GET /scrape/Headlines
```

### Query Parameter

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| target    | string | URL of the target website |

### Example Request

```
http://localhost:4005/scrape/Headlines?target=https://example.com
```

---

## 📦 Sample Response

```json
{
  "headlines": {
    "h1": ["Example Domain"],
    "h2": [],
    "h3": []
  },
  "links": [
    "https://www.iana.org/domains/example"
  ],
  "counts": {
    "headlines": 1,
    "links": 1
  }
}
```

---

## 🧠 How It Works

1. Accepts a target URL
2. Loads the webpage (using a headless browser or HTTP client)
3. Parses HTML content
4. Extracts:

   * Headings (`h1`, `h2`, `h3`)
   * Links (`<a>` tags)
5. Returns structured JSON data

---

## 🖼 Project Visuals

> 📸 *Add a screenshot of your API response here*

Example:

* Open browser
* Hit your API endpoint
* Capture JSON response
* Paste image below

---

## ⚠️ Best Practices

* Respect `robots.txt`
* Add request delays (rate limiting)
* Avoid scraping sensitive or protected content
* Use for ethical and legal purposes only

---

## 📌 Future Improvements Need TO Do

* Add pagination crawling (multi-page traversal)
* Store results in database
* Add keyword filtering
* Support JavaScript-heavy sites more robustly
* Add authentication & rate limiting

