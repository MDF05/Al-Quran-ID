# Al-Quran Cloud Indonesia 📖

![Al-Quran Cloud Indonesia Logo](al-quran/my-logo/icon192.jpg)

**Al-Quran Cloud Indonesia** is a comprehensive and user-friendly web application designed to provide an immersive experience for reading, listening to, and understanding the Holy Quran. Built with modern web technologies and Progressive Web App (PWA) standards, it ensures accessibility and performance across all devices, even with limited internet connectivity.

## 🌟 Features

*   **📖 Read the Quran**: Access the complete compiled text of the Quran with clear, readable Arabic fonts and Indonesian translations.
*   **🎧 Audio Recitations**: Listen to beautiful audio recitations of Surahs.
*   **🔍 Search Functionality**: Easily search for specific Surahs by name or number.
*   **📱 Progressive Web App (PWA)**: Install the application on your mobile device or desktop for a native app-like experience. Works offline!
*   **🌙 Responsive Design**: optimized for both mobile and desktop viewing, supporting portrait and landscape orientations.
*   **📑 Tafsir**: Gain deeper insights with Tafsir for refined understanding.

## 🛠️ Technology Stack

This project is built using pure, vanilla web technologies to demonstrate core understanding without reliance on heavy frameworks:

*   **HTML5**: Semantic markup for accessibility and SEO.
*   **CSS3**: Custom styling with Flexbox and Grid layouts, plus Bootstrap 5 for responsive components.
*   **JavaScript (ES6+)**: Core logic for API integration, search, and dynamic content rendering.
*   **PWA**: Service Workers and Web App Manifest for offline capability and installability.
*   **API**: Integrates with public Quran APIs for data retrieval.

## 🚀 Getting Started

To run this project locally on your machine:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Start-Z/Al-Quran-ID.git
    cd Al-Quran-ID
    ```

2.  **Open the Project**:
    Simply open the `index.html` file in your modern web browser.

    *OR*

    Use a local development server (recommended for PWA features):
    ```bash
    # using python
    python -m http.server 8000
    
    # or using VS Code Live Server extension
    ```

3.  **Explore**: Navigate through the Home, Read, and Audio sections.

## 📂 Project Structure

```
Al-Quran-ID/
├── al-quran/           # Assets and images
├── css/                # Stylesheets for different pages
├── home-page/          # Home page logic and views
├── page-audio/         # Audio player page and logic
├── page-dev/           # Developer profile page
├── page-surah/         # Surah reading page and logic
│   ├── javascript/     # Core JS for Surah functionality
│   └── surah/          # Individual Surah rendering
├── unduh-page/         # Download/Install instructions
├── index.html          # Main entry point (Landing Page)
├── manifest.json       # PWA Manifest
├── service-worker.js   # PWA Service Worker configuration
└── README.md           # Project Documentation
```

## 🤝 Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 👤 Author

**Muhammad Dava Fahreza**

*   Website: [Al-Quran Cloud Indonesia](https://al-quran-id.vercel.app/)
*   Github: [@Start-Z](https://github.com/Start-Z)

---

*Verified independently to run on modern browsers.*