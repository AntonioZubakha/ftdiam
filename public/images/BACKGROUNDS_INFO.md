# Background SVG Assets

This directory contains a collection of SVG background patterns that are designed to be used across different sections of the website. These backgrounds are intentionally light, subtle, and use minimal brand colors to provide visual interest without overwhelming the content.

## Available Backgrounds

1. **background-geometric.svg**
   - Diamond/square geometric pattern with subtle brand-colored elements
   - Best for: Intro sections, feature highlights

2. **background-waves.svg**
   - Subtle wave patterns with horizontal lines
   - Best for: Product sections, statistics areas

3. **background-grid.svg**
   - Light grid pattern with accent elements
   - Best for: Technology sections, specification displays

4. **background-lattice.svg**
   - Diamond lattice with diagonal lines and accent points
   - Best for: Quality sections, technical descriptions

5. **background-dots.svg**
   - Subtle dot pattern with minimal accent dots
   - Best for: Contact sections, footer areas

## Usage in CSS

You can use these backgrounds in your CSS as follows:

```css
.your-section {
  background-image: url('/images/background-geometric.svg');
  background-size: cover;
  background-position: center;
}
```

## Usage in React Components

To use these backgrounds in React components, you can do:

```typescript
const sectionStyle = {
  backgroundImage: `url(/images/background-waves.svg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

return (
  <section style={sectionStyle}>
    {/* Your content here */}
  </section>
);
```

## Design Principles

These backgrounds follow these design principles:

1. **Subtlety**: Very light opacity (0.03-0.07) to avoid distracting from content
2. **Brand Consistency**: Minimal use of brand colors (#241e46 and #00837f)
3. **Scalability**: Vector-based designs that scale well on all devices
4. **Performance**: Optimized SVGs with minimal complexity for faster loading

## Customization

If needed, you can customize these backgrounds by:
- Adjusting the opacity values in the SVG files
- Changing colors to match specific section themes
- Modifying the sizes or density of patterns 