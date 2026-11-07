/**
 * The single source of truth for the site's origin.
 * Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://your-domain.com). Nothing else hardcodes a domain.
 */
const fallback = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fallback).replace(/\/$/, "");
