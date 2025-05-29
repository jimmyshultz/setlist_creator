/**
 * Brand colors for Setlist Sequence
 * These colors are also defined in tailwind.config.js as brand.primary, brand.secondary, brand.tertiary
 */

export const BRAND_COLORS = {
  // Primary Blue - Interactive elements, buttons, links, checkmarks
  PRIMARY: '#0029FF',
  
  // Secondary Yellow - Background accents, highlights, hover states
  SECONDARY: '#F9E793',
  
  // Tertiary Brown - Text, borders, grounding elements
  TERTIARY: '#7F4A16',
} as const;

// Opacity variations for consistent usage
export const BRAND_COLORS_WITH_OPACITY = {
  PRIMARY: BRAND_COLORS.PRIMARY,
  PRIMARY_20: `${BRAND_COLORS.PRIMARY}33`, // 20% opacity
  PRIMARY_30: `${BRAND_COLORS.PRIMARY}4D`, // 30% opacity
  
  SECONDARY: BRAND_COLORS.SECONDARY,
  SECONDARY_10: `${BRAND_COLORS.SECONDARY}1A`, // 10% opacity
  SECONDARY_20: `${BRAND_COLORS.SECONDARY}33`, // 20% opacity
  SECONDARY_30: `${BRAND_COLORS.SECONDARY}4D`, // 30% opacity
  SECONDARY_40: `${BRAND_COLORS.SECONDARY}66`, // 40% opacity
  
  TERTIARY: BRAND_COLORS.TERTIARY,
  TERTIARY_60: `${BRAND_COLORS.TERTIARY}99`, // 60% opacity (for light text)
  TERTIARY_70: `${BRAND_COLORS.TERTIARY}B3`, // 70% opacity (for body text)
  TERTIARY_80: `${BRAND_COLORS.TERTIARY}CC`, // 80% opacity
} as const;

// Usage examples:
// import { BRAND_COLORS } from '@/utils/colors';
// style={{ backgroundColor: BRAND_COLORS.PRIMARY }}
// or with Tailwind: className="bg-brand-primary text-brand-tertiary" 