# 🌌 Rathin Bagchi — Interactive 3D Developer Portfolio

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.0%20(React%2019)-02070B?style=for-the-badge&logo=next.js&logoColor=52ca56&labelColor=02070B&borderColor=52ca56)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-v4.0-02070B?style=for-the-badge&logo=tailwindcss&logoColor=52ca56&labelColor=02070B&borderColor=52ca56)](https://tailwindcss.com/)
[![React Three Fiber](https://img.shields.io/badge/R3F%20/%20Three.js-WebGL-02070B?style=for-the-badge&logo=three.js&logoColor=52ca56&labelColor=02070B&borderColor=52ca56)](https://r3f.docs.pmnd.rs/)
[![Framer Motion](https://img.shields.io/badge/Animations-Framer%20%26%20Spring-02070B?style=for-the-badge&logo=framer&logoColor=52ca56&labelColor=02070B&borderColor=52ca56)](https://www.framer.com/motion/)

<p align="center">
  A futuristic, high-fidelity developer portfolio utilizing 3D WebGL scenes, interactive physics simulation, dynamic particle systems, and sleek dark-mode aesthetics.
</p>

### [🌌 Explore Live Portfolio](https://github.com/rathin182/Protfolio)

---

</div>

## ✨ Core Interactive Features

This portfolio is built on the philosophy that web interfaces should feel alive, responsive, and tactile. Below are the key interactive highlights implemented in the codebase:

### 1. 🌌 Cosmic 3D Particle Canvas
Rendered using a custom **React Three Fiber** canvas ([HeroParticles.tsx](file:///home/lucifer/Desktop/ME/my-app/portfolio/src/app/components/animation/HeroParticles.tsx)). 
* It instantiates **1,500 individual 3D vertices** scattered randomly in space.
* Uses custom frame-ticks (`useFrame`) to apply continuous slow orbit rotations and sinusoidal tilt-swings.
* Employs neon-green (`#4eca52`) particles with size attenuation for maximum depth.

### 2. 🎛️ 3D Coverflow Project Carousel
An advanced 3D project slider powered by `@react-spring/web` ([ProjectSection.tsx](file:///home/lucifer/Desktop/ME/my-app/portfolio/src/app/(pages)/Projects/ProjectSection.tsx)).
* Organizes cards using a custom circular queue (`useProjectQueue`).
* Interpolates absolute `x` (offset), `z` (depth), `rotateY` (y-axis tilt), `scale`, and `opacity` parameters based on their current slot (`left`, `center`, `right`).
* Highlights active featured projects with an **ambient radial glow** and custom glassmorphism borders.

### 💥 3. WebGL Card Shatter & Explosion Effect
Inside the services section ([CrackedCard.tsx](file:///home/lucifer/Desktop/ME/my-app/portfolio/src/app/components/services/CrackedCard.tsx)), cards are fragile:
* Clicking a service card initiates a sequence: first, custom energy fractures (CSS clip-paths) light up inside the card.
* After `1.2 seconds`, the card breaks and **explodes into 12 random 3D shards** ([CardExplosionScene.tsx](file:///home/lucifer/Desktop/ME/my-app/portfolio/src/app/components/services/CardExplosionScene.tsx)).
* Shards have individual randomized velocities and rotation angles calculated using a Three.js WebGL script.
* Once the explosion clears, a detailed transition modal opens ([ServiceModal.tsx](file:///home/lucifer/Desktop/ME/my-app/portfolio/src/app/components/services/ServiceModal.tsx)).

### 📡 4. Sci-Fi Radar Scanner & Skill Metrics
The "About Me" section utilizes a futuristic, vector-based radar animation ([RadarAnimation.tsx](file:///home/lucifer/Desktop/ME/my-app/portfolio/src/app/components/about/RadarAnimation.tsx)).
* Consists of concentric circular grids (solid and dashed) glowing in radioactive green.
* Animates a sweeping gradient indicator representing continuous search patterns.
* Accompanying progress bars ([SkillBar.tsx](file:///home/lucifer/Desktop/ME/my-app/portfolio/src/app/components/about/SkillBar.tsx)) dynamically fill up to show programming competencies (Clean Code, Problem Solving, speed learning).

### 🃏 5. Draggable Physics-based Tech Stack Cards
In the Hero section, a column of floating badges is interactive ([TechStackCards.tsx](file:///home/lucifer/Desktop/ME/my-app/portfolio/src/app/components/TechStackCards.tsx)).
* Badges represent Node.js, Docker, React, PostgreSQL, and Redis.
* Powered by `framer-motion` dragging physics (`dragElastic`, `dragMomentum`).
* Whenever a user hovers (`mouseenter`), the cards respond to the cursor force and slightly scatter dynamically in random offsets to feel organic.

### ✈️ 6. Curvy Rope signal & Paper Plane Submission
The contact form has a playful submit workflow ([ContactSection.tsx](file:///home/lucifer/Desktop/ME/my-app/portfolio/src/app/components/contact/ContactSection.tsx)).
* On desktop, a curving **dashed vector rope path** connects the send button to a paper plane asset.
* Clicking "Send" fires a **luminous electric pulse** (represented by a custom animated SVG dashoffset stroke) that travels along the bezier curve path.
* Once the pulse reaches the paper plane, a flight animation is triggered: the plane rotates, scales, and swoops off-screen into the sky.

---

## 🛠️ Technology Stack & Libraries

The project combines Next.js Server Components with high-performance client-side animations:

* **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
* **Styling & Theme**: [Tailwind CSS v4](https://tailwindcss.com/) (using custom CSS imports & dynamic HSL variables)
* **3D Rendering**: [Three.js](https://threejs.org/) & [React Three Fiber (R3F)](https://github.com/pmndrs/react-three-fiber)
* **3D Helpers**: [@react-three/drei](https://github.com/pmndrs/drei) (mesh trails and scene controls)
* **Physics / Animations**: [Framer Motion](https://www.framer.com/motion/) (gestures and layout animations) & [React Spring](https://react-spring.dev/) (3D spring physics)
* **Smooth Scrolling**: [Lenis Scroll Manager](https://lenis.darkroom.engineering/) (for elegant momentum-based page scrolling)
* **Mailing Service**: [Nodemailer](https://nodemailer.com/) (sending automated HTML transactional emails)
* **Notifications**: [Sonner](https://sonner.dev/) (rich Toast notifications)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Repository Structure

Below is the directory map highlighting where key architectural items reside:

```text
portfolio/
├── src/
│   └── app/
│       ├── (pages)/
│       │   ├── Home/              # Hero layout & header navigation
│       │   ├── Projects/          # 3D project carousel components
│       │   ├── Services/          # Service sections layout wrapper
│       │   └── techStack/         # Infinite marquee banner of skill logos
│       ├── api/
│       │   └── contact/           # API route handling contact emails via Nodemailer
│       ├── components/
│       │   ├── about/             # Skill lists, buttons, & radar canvas
│       │   ├── animation/         # Custom cursor, particles, & background canvas
│       │   ├── contact/           # Contact form and plane flying trigger
│       │   ├── footer/            # Footer links, social paths, and stars
│       │   ├── services/          # CrackedCard, sharding effects, and WebGL fragments
│       │   └── ClientWrapper.tsx  # Smooth scrolling initializer
│       ├── lib/
│       │   ├── data/              # Static data objects (e.g. project arrays)
│       │   ├── hooks/             # Custom React Hooks (useProjectQueue, etc.)
│       │   └── fragments.ts       # Polygon coordinates for card shattering
│       ├── globals.css            # Tailwind directives, font-themes, and scrollbar hides
│       └── layout.tsx             # Fonts loading, Toaster, and Custom Cursor wrappers
├── public/                        # Images, models, and PDF resumes
├── package.json                   # Project scripts and dependencies
└── next.config.ts                 # Next.js configurations
```

---

## ⚙️ Installation & Configuration

### Prerequisites
* **Node.js**: v18.x or higher
* **npm** or **yarn**

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/rathin182/Protfolio.git
cd portfolio
npm install
```

### 2. Configure Environment variables
Create a `.env` file in the root directory. This project uses Gmail Nodemailer service to handle form submissions.

```env
# Gmail configurations
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-gmail-app-password"
```

> [!TIP]
> Ensure you use a **Gmail App Password** rather than your actual account password. You can generate one in your Google Account settings under Security > 2-Step Verification > App Passwords.

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the portfolio.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📬 Contact Form Flow & Email templates

When a visitor submits an inquiry, the Next.js API handles the request asynchronously and triggers two Nodemailer transactions:

1. **Host Notification Email**: Sends a detailed summary of the message, visitor's name, and contact details to `rathinb745@gmail.com` in a premium dark-themed template matching the portfolio design.
2. **Visitor Acknowledgement Email**: Sends an immediate auto-response to the visitor's email, thanking them for reaching out, confirming receipt, and displaying a preview of their message inside a styled confirmation container.

Both mail templates are styled with inline CSS, absolute layout structures, and deep void-blue (`#02070B`) background gradients to mirror the application design.

---

## 👨‍💻 Author

Developed with 💚 by **Rathin Bagchi**.
* **GitHub**: [@rathin182](https://github.com/rathin182)
* **Twitter**: [@RBagchi182](https://x.com/RBagchi182)
* **Email**: rathinb745@gmail.com
