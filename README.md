# 📘 Internal Marks Calculator
A clean, fast, and **CSP-compliant SGPA & Internal Marks Calculator** that helps students compute their SGPA with internal assessment marks for:

- 📝 Theory subjects  
- 🧪 Practical subjects  
- 🔄 Hybrid (Theory + Practical)  
- 🎯 MSTs, Assignments, Experiments, Attendance & more  
- 📊 Real-time SGPA estimation with multiple scenarios  
- 📥 CSV Import/Export & Excel generation  

---

[![View Live](https://img.shields.io/badge/🔗%20View%20Live-SGPA%20Estimator-blue?style=for-the-badge)](https://imdilshan.github.io/Internal-Marks-Calculator/)

---

## � File Structure

| File | Purpose |
|------|---------|
| **`index.html`** | Main application - Complete SGPA calculator with internal marks tracking, scenario-based estimation, and data export features. Features CSP-compliant event handling and real-time calculations. |
| **`older.html`** | Legacy version - Original simple internal marks calculator for basic calculations only. |
| **`uncompressed.html`** | Development version - Uncompressed/formatted version of index.html for easier debugging and development. |
| **`README.md`** | This file - Documentation and setup instructions. |

---

## 🛠️ Features

### Core Functionality
- ✅ **SGPA Calculator** - Real-time weighted SGPA calculation based on credits and grade points
- ✅ **Multi-subject Support** - Track marks across 7 subjects with different assessment patterns
- ✅ **Smart Calculations** - Handles theory, practical, hybrid, and soft skills subjects differently
- ✅ **Grade Conversion** - Automatic percentage-to-grade-point conversion (O/A+/A/B+/B/C/P/F)

### Data Management
- 📥 **CSV Import** - Upload saved marks from CSV files
- 📤 **CSV Export** - Download detailed marks or summary as CSV
- 📊 **Excel Export** - Generate formatted Excel files with multiple sheets (Summary & Detailed)
- 📋 **CSV Template** - Download template to fill marks offline

### Scenario Planning  
- 🎯 **Low Scenario** (50% external) - Conservative estimate
- 🎯 **Mid Scenario** (70% external) - Realistic estimate  
- 🎯 **High Scenario** (85% external) - Optimistic estimate

### User Experience
- 🌓 **Dark/Light Theme** - Toggle with smooth view transitions
- 📱 **Responsive Design** - Works seamlessly on mobile & desktop
- 🎉 **Celebrations** - Confetti animations for excellent SGPA
- ♿ **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- 🔒 **Security** - Content Security Policy (CSP) compliance with no inline event handlers

---

## 🧾 Tech Stack

- **HTML5** - Semantic markup with proper ARIA attributes
- **CSS3** - Modern features including CSS Grid, Flexbox, and View Transitions API
- **JavaScript (Vanilla)** - No dependencies, event-driven architecture
- **SheetJS (XLSX)** - For Excel file generation (loaded dynamically from CDN)
- **Confetti.js** - For celebration animations (loaded from CDN)

---

## 🔐 Security Features

- ✅ **Content Security Policy (CSP)** - Strict CSP headers to prevent injection attacks
- ✅ **No Inline Event Handlers** - All events bound via JavaScript listeners
- ✅ **No Data Storage** - All calculations are local; no data sent to servers
- ✅ **HTTPS Ready** - Safe for deployment on GitHub Pages or similar platforms

---

## 🚀 Try It Now

👉 **https://imdilshan.github.io/Internal-Marks-Calculator/**

---

## 📸 Preview
![Preview](./preview.png)

