# Ashikur Rahman — Portfolio

**Full Stack Web Developer** specializing in ASP.NET Core, C#, and modern JavaScript frameworks.

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-512BD4?style=flat&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/apps/aspnet)
[![Netlify Status](https://img.shields.io/badge/deployed-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)](https://ashikurr-portfolio.netlify.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**🔗 Live Site:** [ashikurr-portfolio.netlify.app](https://ashikurr-portfolio.netlify.app)

---

## 📖 About

This is the source code for my personal developer portfolio — a single-page Angular application showcasing my work experience, technical skills, projects, and certifications as a Full Stack Web Developer. The site is fully responsive, supports light/dark themes, and includes a working contact form.

I'm currently a Full Stack Web Developer at **Islamic Development Bank (BISEW)**, working primarily with **ASP.NET Core, C#, SQL Server**, and modern frontend frameworks like **Angular** and **React**.

---

## ✨ Features

- 🌗 **Light/Dark theme toggle** with saved preference (persists across visits)
- ⌨️ **Animated typing effect** cycling through my roles/specialties
- 📊 **Animated stat counters** and skill proficiency visualizations
- 🕐 **Interactive timeline** for work experience
- 📁 **Project showcase** with tech stack tags and GitHub links
- 📄 **CV preview modal** with direct PDF download
- 📬 **Working contact form** (EmailJS integration, with automatic `mailto:` fallback if not configured)
- ♿ **Accessible** — skip-to-content link, ARIA labels, reduced-motion support
- 📱 **Fully responsive** — optimized for mobile, tablet, and desktop
- 🔍 **SEO-ready** — Open Graph tags, structured data (JSON-LD) for search engines

---

## 🛠️ Tech Stack

| Layer          | Technologies                                      |
|----------------|----------------------------------------------------|
| Frontend       | Angular (standalone components), TypeScript, HTML5, CSS3 |
| Styling        | Custom CSS with CSS variables (theming), responsive grid/flexbox |
| Forms          | Angular Forms (`FormsModule`), EmailJS             |
| Backend focus  | ASP.NET Core MVC, ASP.NET Core Web API, C#, SQL Server, Entity Framework Core |
| Tooling        | Angular CLI, Git, GitHub                            |
| Hosting        | Netlify (CI/CD from GitHub)                         |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/ashikur-255/ashikur-portfolio.git

# Move into the project directory
cd ashikur-portfolio/portfolio

# Install dependencies
npm install
```

### Add your assets

Place the following files in `src/assets/` (exact filenames, no spaces):

```
src/assets/profile.jpg
src/assets/Ashikur_CV.pdf
src/assets/favicon.svg
src/assets/og-cover.jpg
src/assets/projects/doctorappointment.jpg
src/assets/projects/ecommerce.jpg
src/assets/projects/newsportal.jpg
```

### Run locally

```bash
ng serve
```

Then open [http://localhost:4200](http://localhost:4200) in your browser. The app will auto-reload on file changes.

### Build for production

```bash
ng build
```

Build artifacts are output to `dist/portfolio/`.

---

## 📧 Contact Form Setup (Optional)

The contact form uses [EmailJS](https://www.emailjs.com/) to send messages without a backend server. To enable it:

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Set up an Email Service and Email Template
3. In `src/app/app.component.ts`, update the config:

```typescript
private readonly emailjsConfig = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
};
```

If left unconfigured, the form automatically falls back to opening the visitor's default email client instead — nothing breaks.

---

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── app.component.ts       # Main component logic & data
│   │   ├── app.component.html     # Template
│   │   └── app.component.css      # Styles
│   ├── assets/                    # Images, CV, favicon
│   ├── index.html                 # Root HTML + meta tags
│   ├── main.ts                    # Application bootstrap
│   └── styles.css                 # Global styles
├── angular.json                   # Angular CLI configuration
├── package.json
└── README.md
```

---

## 🌐 Deployment

This project is continuously deployed to **Netlify** from the `main` branch on GitHub. Every push automatically triggers a new build and deployment.

**Build settings:**
| Setting            | Value             |
|---------------------|-------------------|
| Build command        | `ng build`        |
| Publish directory    | `dist/portfolio`  |

---

## 👤 Author

**Ashikur Rahman**
Full Stack Web Developer — Mirpur, Dhaka, Bangladesh

- 📧 Email: [ashikurr255@gmail.com](mailto:ashikurr255@gmail.com)
- 📞 Phone/WhatsApp: 01708-588330
- 💼 LinkedIn: [linkedin.com/in/ashikur-rahman-134300159](https://www.linkedin.com/in/ashikur-rahman-134300159)
- 🐙 GitHub: [github.com/ashikur-255](https://github.com/ashikur-255)

---

## 📄 License

This project is licensed under the MIT License — feel free to fork it and use it as a template for your own portfolio, with attribution appreciated.

---

<p align="center">Built with ❤️ using Angular</p>
