# Sayeeda Jabri's Portfolio

A modern, responsive personal portfolio website built with React, showcasing the professional journey and achievements of Sayeeda Jabri - Cofounder of Hyderabad Hustlers and IMF Fellow at EdVenture Park.

## Features

### 🎨 Modern Design
- **Elegant Splash Screen**: Beautiful "SJ" monogram in cursive font with smooth animations
- **Dark Theme**: Professional black (#000000) background with gold (#febd59) accents
- **Fluid Animations**: Smooth transitions and scroll-triggered animations using Framer Motion
- **Responsive Layout**: Mobile-first design that adapts to all screen sizes

### 📱 Fully Responsive
- Desktop, tablet, and mobile optimized
- CSS Grid and Flexbox for flexible layouts
- Touch-friendly navigation and interactions

### 🚀 Performance Optimized
- React 18 with modern hooks
- Intersection Observer for efficient scroll animations
- Optimized fonts and assets
- Clean, semantic HTML structure

### 📊 Content Sections

1. **Hero Section**: Name, professional image placeholder, main titles, and call-to-action buttons
2. **About Section**: Personal introduction, mission statement, and key highlights
3. **Experience Timeline**: Comprehensive career journey with interactive timeline
4. **Media Gallery**: Tabbed interface for podcasts/YouTube videos and Instagram reels
5. **Contact Form**: Professional inquiry form with social media links
6. **Footer**: Copyright and policy links

## Technology Stack

- **Frontend**: React 18
- **Animations**: Framer Motion
- **Styling**: CSS3 with CSS Variables
- **Fonts**: Inter (primary), Dancing Script (cursive)
- **Icons**: Emoji-based for universal compatibility
- **Build Tool**: Create React App

## Project Structure

```
src/
├── components/
│   ├── SplashScreen.js/.css
│   ├── Hero.js/.css
│   ├── About.js/.css
│   ├── Experience.js/.css
│   ├── Media.js/.css
│   └── Contact.js/.css
├── App.js
├── App.css
├── index.js
└── index.css
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sayeeda-jabri-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (irreversible)

## Customization

### Colors
The color scheme is defined in CSS variables in `src/index.css`:
```css
:root {
  --primary-black: #000000;
  --primary-gold: #febd59;
  --text-white: #ffffff;
  --text-gray: #888888;
  --text-light-gray: #cccccc;
}
```

### Content
Update the content in each component file:
- **Personal Info**: Edit `src/components/Hero.js`
- **About Text**: Modify `src/components/About.js`
- **Experience Data**: Update the experiences array in `src/components/Experience.js`
- **Media Content**: Add real URLs in `src/components/Media.js`
- **Contact Info**: Update social links in `src/components/Contact.js`

### Fonts
The project uses Google Fonts (Inter and Dancing Script). Update the font imports in `public/index.html` to change typography.

## Deployment

### Build for Production
```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deployment Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use `gh-pages` package
- **Firebase Hosting**: Use Firebase CLI

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast color scheme
- Responsive font sizes

## Performance Features

- Lazy loading with Intersection Observer
- Optimized animations with `will-change`
- Minimal bundle size
- Efficient re-renders with React hooks

## External Component Compatibility

The project is structured to be compatible with popular React component libraries:
- **ReactBits**: Can integrate utility components
- **Aceternity**: UI components can be added seamlessly
- **21st.dev**: Component library integration ready

## License

This project is private and proprietary. All rights reserved.

## Contact

For questions or customization requests, please contact through the portfolio website's contact form.

---

Built with ❤️ using React and modern web technologies. 