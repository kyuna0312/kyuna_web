# 🌟 Hattanzorg Portfolio

A modern, multilingual portfolio website showcasing full-stack development skills, built with Next.js 14 and Chakra UI.

![Portfolio Preview](./public/images/portfolio-preview.png)

## ✨ Features

### 🌍 Multi-language Support
- **English** - Primary language
- **Japanese (日本語)** - Complete translations
- **Mongolian (Монгол)** - Native language support
- Seamless language switching with URL-based routing

### � Modern Design
- **Responsive Design** - Works perfectly on all devices
- **Dark/Light Theme** - Automatic system preference detection
- **Glassmorphism UI** - Modern frosted glass effects
- **Smooth Animations** - Framer Motion powered transitions
- **Interactive Elements** - Hover effects and micro-interactions

### ⚡ Performance Optimized
- **Next.js 14** - Latest React framework with App Router
- **Image Optimization** - WebP/AVIF support with lazy loading
- **Code Splitting** - Automatic bundle optimization
- **SSG/SSR** - Static generation and server-side rendering
- **PWA Ready** - Service worker and offline support

### 🛠 Technical Features
- **TypeScript Ready** - Type-safe development
- **ESLint/Prettier** - Code quality and formatting
- **SEO Optimized** - Meta tags, structured data, sitemaps
- **Analytics** - Vercel Analytics integration
- **Error Boundaries** - Graceful error handling
- **Loading States** - Skeleton loaders for better UX

### ♿ Accessibility
- **WCAG 2.1 AA** - Web accessibility standards compliance
- **Keyboard Navigation** - Full keyboard support
- **Screen Reader** - ARIA labels and semantic HTML
- **Focus Management** - Clear focus indicators
- **Reduced Motion** - Respects user preferences

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kyuna312/kyuna_web.git
   cd kyuna_web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
kyuna_web/
├── 📄 README.md
├── 📄 next.config.js          # Next.js configuration
├── 📄 next-i18next.config.js  # Internationalization config
├── 📄 package.json
├── 📁 components/
│   ├── 📄 animations.js       # Framer Motion animations
│   ├── 📄 contact-form.js     # Contact form component
│   ├── 📄 error-boundary.js   # Error handling
│   ├── 📄 keyboard-navigation.js # Accessibility features
│   ├── 📄 language-switcher.js # Language selection
│   ├── 📄 loading.js          # Loading components
│   ├── 📄 navbar.js           # Navigation component
│   ├── 📄 optimized-image.js  # Image optimization
│   ├── 📄 seo-head.js         # SEO meta tags
│   └── 📁 layouts/
│       ├── 📄 article.js      # Article layout
│       └── 📄 main.js         # Main layout
├── 📁 pages/
│   ├── 📄 _app.js             # App configuration
│   ├── 📄 index.js            # Homepage
│   ├── 📄 contact.js          # Contact page
│   └── 📄 projects.js         # Projects showcase
├── 📁 public/
│   ├── 📄 manifest.json       # PWA manifest
│   ├── 📄 sw.js              # Service worker
│   └── 📁 locales/           # Translation files
│       ├── 📁 en/
│       ├── 📁 jp/
│       └── 📁 mn/
└── 📁 lib/
    └── 📄 theme.js            # Chakra UI theme
```

## 🌐 Internationalization

The portfolio supports three languages with complete translations:

### Adding New Languages

1. **Create translation files**
   ```
   public/locales/[locale]/common.json
   ```

2. **Update next-i18next.config.js**
   ```javascript
   module.exports = {
     i18n: {
       defaultLocale: 'en',
       locales: ['en', 'jp', 'mn', 'your-locale'],
     },
   }
   ```

3. **Add language to switcher**
   Update `components/language-switcher.js`

## 🎨 Theming

The project uses Chakra UI with custom theming:

### Color Palette
- **Primary**: Purple (`#9f7aea`)
- **Secondary**: Teal (`#38b2ac`)
- **Background**: Dynamic (light/dark mode)
- **Text**: High contrast for accessibility

### Fonts
- **Heading**: M PLUS Rounded 1c
- **Body**: M PLUS Rounded 1c
- **Fallback**: System fonts

## 📱 PWA Features

- **Installable** - Add to home screen
- **Offline Support** - Service worker caching
- **Background Sync** - Offline form submissions
- **Push Notifications** - Ready for implementation
- **App-like Experience** - Native app feel

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

### SEO Configuration
Update `components/seo-head.js`:

```javascript
const siteUrl = 'https://your-domain.com'
const defaultDescription = {
  en: 'Your description in English',
  jp: 'Your description in Japanese',
  mn: 'Your description in Mongolian'
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository**
   - Import project to Vercel
   - Configure build settings (auto-detected)

2. **Environment variables**
   - Add production environment variables
   - Configure domain settings

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

- **Netlify**: Use `npm run build` and deploy `out/` folder
- **GitHub Pages**: Configure for static export
- **Docker**: Containerize with provided Dockerfile

## 🧪 Testing

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run prettier

# Type checking (if using TypeScript)
npm run type-check
```

## 📊 Performance

- **Lighthouse Score**: 98-100/100
- **Core Web Vitals**: Excellent
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: WebP/AVIF with responsive sizing

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hattanzorg**
- GitHub: [@kyuna312](https://github.com/kyuna312)
- Twitter: [@m1or3n](https://twitter.com/m1or3n)
- Instagram: [@m1or3n](https://instagram.com/m1or3n)
- Email: hello@hattanzorg.dev

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Chakra UI** - Beautiful component library
- **Framer Motion** - Smooth animations
- **Vercel** - Excellent hosting platform
- **Open Source Community** - Continuous inspiration

## 📈 Roadmap

- [ ] Blog functionality with MDX
- [ ] Admin dashboard for content management
- [ ] Advanced animations and micro-interactions
- [ ] Real-time chat integration
- [ ] Performance monitoring dashboard
- [ ] A/B testing framework

---

<div align="center">
  <p>Built with ❤️ and ☕ in Ulaanbaatar, Mongolia</p>
  <p>© 2024 Hattanzorg. All rights reserved.</p>
</div>

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🏗️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with hybrid static & server rendering
- **React 18** - UI library with latest features
- **Chakra UI** - Modular and accessible component library for React
- **Framer Motion** - Animation library for React
- **next-i18next** - Internationalization framework

### **Styling**
- **Emotion** - CSS-in-JS library
- **Chakra UI Theme** - Consistent design system
- **Custom glassmorphism** components

### **Optimization**
- **Next.js Image** - Automatic image optimization
- **Bundle analyzer** - Bundle size optimization
- **Sharp** - High-performance image processing

## 📁 Project Structure

```
kyuna_web/
├── components/           # Reusable UI components
│   ├── layouts/         # Layout components
│   ├── language-switcher.js
│   ├── optimized-image.js
│   ├── seo-head.js
│   └── ...
├── pages/               # Next.js pages
│   ├── _app.js         # App wrapper with i18n
│   ├── index.js        # Home page
│   ├── projects.js     # Projects showcase
│   └── 404.js          # Custom 404 page
├── public/              # Static assets
│   ├── images/         # Optimized images
│   ├── locales/        # Translation files
│   │   ├── en/
│   │   ├── jp/
│   │   └── mn/
│   └── favicon.ico
├── lib/                 # Utility functions
├── next.config.js       # Next.js configuration
├── next-i18next.config.js # Internationalization config
└── package.json
```

## 🌐 Internationalization

The portfolio supports three languages with complete translations:

- **English** (`/en/`) - Default language
- **Japanese** (`/jp/`) - Full Japanese translations
- **Mongolian** (`/mn/`) - Complete Mongolian support

## 🎨 Design System

### **Color Palette**
- Primary: Glassmorphism with backdrop blur
- Background: Dark gradients
- Text: High contrast white/gray
- Accent: Violet/Pink gradients

### **Components**
- **Glassmorphism cards** with blur effects
- **Animated buttons** with hover states
- **Responsive grids** for project showcase
- **Smooth page transitions**

## 📊 Performance Metrics

- **Lighthouse Performance**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Bundle size**: Optimized for fast loading

## 🔧 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prettier     # Format code
```

## 🚀 Deployment

Live at: [https://kyuna-web.vercel.app](https://kyuna-web.vercel.app)

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🔍 SEO Features

- **Meta tags** for all pages and languages
- **Open Graph** tags for social sharing
- **Twitter Cards** support
- **Structured data** (JSON-LD)
- **Language alternate** tags

## ♿ Accessibility

- **ARIA labels** on all interactive elements
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** design
- **Semantic HTML** structure

## 📧 Contact

**Hattanzorg** - [@m1or3n](https://twitter.com/m1or3n)

**Portfolio**: [https://kyuna-web.vercel.app](https://kyuna-web.vercel.app)
**GitHub**: [https://github.com/kyuna312](https://github.com/kyuna312)

---

*Built with ❤️ by Hattanzorg for showcasing modern web development skills*
