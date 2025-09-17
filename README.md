# FasalGuru - Farmer-First Progressive Web App

FasalGuru is a comprehensive farming assistance platform designed specifically for Indian farmers. Get practical guidance, book lab tests, and connect directly with buyers - all in Hindi and English.

## ✨ Features

### 🌱 **Smart Farming Guidance**
- Expert articles on pests, soil health, irrigation, and crop management
- Voice-enabled AI assistant supporting Hindi and English
- Practical, locally-relevant farming advice

### 🔬 **Easy Lab Testing**
- Find and book nearby certified agricultural laboratories
- Simple booking system with SMS/WhatsApp confirmations  
- Soil, water, and crop testing services

### 🏪 **Direct Marketplace**
- Farmers can sell produce directly to hotels and restaurants
- Skip middlemen for better prices
- Verified seller profiles and ratings

### 🎯 **Designed for Farmers**
- Mobile-first, works on any device
- Large touch targets (44px+) for easy use
- High contrast, readable typography (16px+ body text)
- Bilingual interface (English/Hindi)
- Works well on low bandwidth

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui with farming-themed variants
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Accessibility**: WCAG 2.1 AA compliant

## 🎨 Design System

FasalGuru uses a warm, earthy color palette that feels familiar to rural users:

- **Primary**: Earthy green (representing growth and nature)
- **Accent**: Warm yellow (sunshine and harvest)  
- **Secondary**: Terracotta (earthy, familiar tone)
- **Success**: Deep green for positive actions
- **Warning**: Warm orange for alerts

All colors follow HSL format for consistent theming and meet accessibility contrast requirements (>4.5:1).

## 📱 Progressive Web App Features

- Installable on mobile devices
- Offline-friendly with cached content
- Fast loading with optimized images
- Push notifications for important updates

## 🌍 Localization

Full bilingual support with:
- English and Hindi (Devanagari script)
- Context-appropriate translations
- Voice interface in both languages
- Cultural sensitivity in design and copy

## 🛠️ Setup & Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd fasalguru

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base shadcn components
│   ├── Header.tsx      # Main navigation header
│   ├── LanguageToggle.tsx
│   └── QuickActionCard.tsx
├── pages/              # Route pages
│   ├── Index.tsx       # Landing page
│   ├── Articles.tsx    # Guidance articles
│   ├── ChatBot.tsx     # AI assistant
│   ├── LabBooking.tsx  # Lab test booking
│   └── Marketplace.tsx # Produce marketplace
├── assets/             # Images and static files
├── hooks/              # Custom React hooks
└── lib/                # Utilities and helpers
```

## 🎯 Key Features Implementation

### Accessibility (WCAG 2.1 AA)
- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support  
- High contrast color ratios
- Screen reader friendly
- Large touch targets (minimum 44px)

### Mobile-First Design
- Responsive breakpoints (sm: 640px, md: 768px, lg: 1024px)
- Touch-optimized interactions
- Readable typography on small screens
- Efficient data usage

### Performance Optimizations
- Lazy loading for images
- Code splitting by routes
- Optimized bundle sizes
- Efficient re-rendering with React Query

## 🔗 Integration Points

The app is designed to integrate with:

- **SMS/WhatsApp APIs**: Twilio or local providers for notifications
- **Payment Gateways**: Razorpay for Indian market
- **Maps**: Google Maps or MapBox for location services
- **Voice Services**: Web Speech API + cloud STT/TTS
- **Backend**: Supabase or custom API for data management

## 📊 Analytics & Monitoring

Built-in support for:
- User interaction tracking
- Performance monitoring (Lighthouse scores 90+)
- Conversion tracking for bookings and sales
- Error reporting and debugging

## 🔒 Security & Privacy

- Minimal data collection (phone-only signup)
- Secure handling of farmer and buyer data
- HTTPS enforcement
- Input validation and sanitization

## 🌟 Sample Content

The app includes sample content in both languages:

- **8-10 farming articles** covering common issues
- **3 sample farm listings** with realistic data  
- **2 sample laboratories** with booking flows
- **Bilingual microcopy** throughout the interface

## 📝 Contributing

1. Follow the existing code style and patterns
2. Ensure all new features are mobile-friendly
3. Add proper TypeScript types
4. Include both English and Hindi translations
5. Test accessibility with screen readers
6. Maintain design system consistency

## 📄 License

Built for farmers, by developers who care about rural India.

---

**FasalGuru** - *Help for your crops, right when you need it*
*आपकी फसल के लिए सहायता, जब आपको जरूरत हो*
