# Stripee: Advanced Phishing Awareness & Cyber-Security Educational Platform

Stripee is a sophisticated, full-stack educational tool designed to simulate modern, high-fidelity phishing attacks. Unlike basic phishing simulators, Stripee uses a **"Dynamic Brand Injection"** engine and **"Multi-Step Harvesting"** logic to demonstrate how cybercriminals bypass two-factor authentication (2FA) and exploit user trust through visually consistent, branded traps.

---

## 🎯 Project Mission & Core Philosophy
The primary goal of Stripee is to bridge the gap between theoretical security training and real-world experience. By placing users in a familiar, "safe" financial dashboard environment and then systematically leading them through a phishing tunnel, the platform provides a visceral learning experience that is more effective than traditional video-based training.

---

## 🛣️ The Comprehensive Simulation Journey: An In-Depth Walkthrough

This section provides a granular, step-by-step explanation of the user's path through the Stripee platform, detailing the technical implementation and psychological tactics at every stage.

### Phase 1: The Landing Page (Establishing Credibility)
The journey begins at the root URL. The **Landing Page** is designed to look like a legitimate, high-end financial services product.
- **UI Details**: Features a clean, minimalist design with a "Stripee" logo, professional hero sections, and clear value propositions.
- **Psychological Impact**: By presenting a polished, functional landing page, the platform establishes "Brand Authority". The user's initial interaction is with a professional service, not a security training tool.
- **Technical Note**: Built as a responsive React component using Tailwind's layout utilities to ensure it looks professional on all devices.

### Phase 2: The Registration (The Commitment)
To access the simulation, the user must first engage with the platform's legitimate onboarding.
- **Process**: The user clicks "Register" and provides an email and password.
- **UI Details**: The registration form uses standard security indicators (e.g., password masking, clear error messaging).
- **Psychological Impact**: This is the "Commitment Phase". By creating an account, the user feels a sense of ownership and familiarity with the system's "standard" look and feel.
- **Technical Note**: The frontend communicates with the `server/index.js` Express API to create a simulated user record and issue a JWT.

### Phase 3: Legitimate Login (Setting the Baseline)
After registration, the user performs their first "real" login.
- **Process**: Standard email/password entry.
- **UI Details**: Uses the primary "Stripee" colors (Deep Navy #0A2540 and White).
- **Psychological Impact**: This sets the "Expected Behavior" (the Baseline). The user learns that to get into their account, they see the Stripee logo and the standard login form. Any deviation from this later is what the platform is training them to detect.

### Phase 4: The Home Page / Dashboard (The "Safe" Zone)
Upon successful login, the user is redirected to their financial dashboard.
- **UI Details**: A complex, data-rich interface featuring a sidebar with navigation (Payments, Balances, Customers) and a main content area with interactive charts using **Glassmorphism** effects.
- **Psychological Impact**: The dashboard is a "High-Trust Environment". Users are busy checking their simulated revenue and transactions, making them less likely to notice subtle changes in their surroundings.
- **Technical Note**: Transaction data is simulated in real-time, providing a "living" UI that keeps the user engaged.

### Phase 5: The Bait (Interacting with Clickbait Ads)
While browsing the "safe" dashboard, the user encounters several types of advertisements via the `AdBanner.tsx` component.
- **Ad Types & Tactics**:
    - **Leaderboard Banner**: A rotating strip at the top. *Tactics*: Uses urgency ("Is your SaaS business DYING?") to provoke a click.
    - **Sidebar Float**: A bottom-right popup that appears after a delay. *Tactics*: Uses fear ("YOU ARE BEING HACKED!") to bypass critical thinking.
    - **Sponsored Cards**: Product-focused cards in the dashboard. *Tactics*: Uses curiosity ("Banks HATE this 1 simple trick") to offer "hidden secrets".
- **Technical Interception**: When any ad is clicked, the `simulation=true` and `brand=TargetBrand` parameters are injected into the URL.

### Phase 6: The Interception (The Chameleon Login)
This is where the simulation transitions from "Safe" to "Exploit". The user is redirected back to a login page, but it is **not** the Stripee login they saw in Phase 3.
- **UI Details (Branding Engine)**: The `Login.tsx` component detects the `brand` parameter. If it sees "PaySwift", it swaps the logo to a "Money" icon and changes the primary accent color to `#00dc82`.
- **The Deception**: The page asks for credentials again under the guise of "re-authentication" or "partner login".
- **Psychological Impact**: The "Visual Consistency" between the ad they just clicked and the login page they are now seeing tricks the brain into accepting the change. The user often ignores the fact that they are already logged in to the main platform.

### Phase 7: The Harvest (MFA & OTP Capture)
The simulator mimics a modern "Adversary-in-the-Middle" (AiTM) attack, which is the most common way hackers bypass 2FA today.
- **Step A**: The user enters their email and password.
- **Step B**: The system transitions to a 6-digit OTP entry screen.
- **UX Details**: Features 6 individual input boxes with **Auto-Focus Logic**. When the user types one digit, the cursor moves instantly to the next.
- **Psychological Impact**: The high-quality UX makes the form feel "professional" and "official", which paradoxically makes the user more comfortable handing over their most sensitive security code.

### Phase 8: The Warning (The Educational Reveal)
Immediately after the user "submits" their 6-digit code, the trap is sprung. The UI shifts from a fake login to a high-impact educational modal.
- **UI Details**: A red-themed warning modal with the title "YOU'VE BEEN PHISHED!".
- **The Breakdown**:
    - **The Attack**: Explains how the ad copy used fear/urgency.
    - **The Lesson**: Points out the red flags (e.g., the URL change, the unexpected re-authentication, the branded spoofing).
    - **The Checklist**: Provides 3-4 actionable tips for real-world scenarios.
- **Final Result**: The user clicks "I UNDERSTAND THE RISK" and is returned to the dashboard, now much better equipped to handle real phishing attempts.

---

## 🛠️ Detailed Technical Architecture

### Frontend Architecture (React + Vite)
- **Component Strategy**: Modular components like `AdBanner`, `Navbar`, and `PhishingAwareness` ensure the dashboard remains performant while supporting dynamic content.
- **Styling**: **Tailwind CSS** with custom configuration for financial-grade typography and glassmorphism (backdrop-filters).
- **Icons**: **Lucide React** for consistent, accessible SVG iconography.

### Backend Infrastructure (Node.js)
- **API Server**: An Express server handles legitimate authentication and simulated OTP verification.
- **Security**: Uses JWT for session management to mirror production-grade auth flows.
- **Concurrency**: Uses the `concurrently` package to run both the frontend and backend servers with one terminal command.

---

## 🚀 Installation & Developer Setup

1. **Install Dependencies**: `npm install`
2. **Run Full Stack**: `npm run dev:full`
    - **Frontend**: http://localhost:5173
    - **API Server**: http://localhost:5000

---

## ⚖️ Ethical Use & Safety
Stripee is strictly for **educational purposes**. It is designed to be run locally. No actual user credentials are saved or transmitted to any third-party services.

---

*Built with ❤️ for Cyber-Security Awareness.*
