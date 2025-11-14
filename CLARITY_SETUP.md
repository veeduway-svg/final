# Microsoft Clarity Setup Guide

This document explains how to configure Microsoft Clarity session recording for the VeeduWay website.

## Overview

Microsoft Clarity has been integrated to capture anonymous usage patterns and improve user experience through:
- Session replays
- Heatmaps (click and scroll data)
- User journey analysis
- Modal interaction tracking

## Configuration

### 1. Get Your Clarity Project ID

1. Go to https://clarity.microsoft.com
2. Sign in with your Microsoft account
3. Create a new project for "VeeduWay"
4. Copy your Project ID (it will look like: `abcdef1234`)

### 2. Update Environment Variable

In your production environment (hosting platform), set the environment variable:

```
VITE_CLARITY_PROJECT_ID=your_actual_project_id_here
```

**Important:** Replace `YOUR_CLARITY_PROJECT_ID` in `.env` with your actual Clarity Project ID before deploying to production.

### 3. Deploy to Production

The Clarity script will:
- ✅ Load **ONLY** in production builds (`NODE_ENV=production`)
- ✅ Skip loading if `VITE_CLARITY_PROJECT_ID` is not set or equals `YOUR_CLARITY_PROJECT_ID`
- ✅ Load asynchronously (no performance impact)
- ✅ Not load during local development or preview builds

## Verification

### Development Environment
When running `npm run dev`, you should see in the console:
```
[Clarity] Skipped: Not in production or ID not configured
```

### Production Environment
After deploying with a valid Project ID:

1. Open your live website
2. Open browser DevTools → Network tab
3. Search for `clarity.ms/tag`
4. You should see a **200 OK** response

### In Clarity Dashboard
After 30 minutes of production traffic:

1. Go to https://clarity.microsoft.com
2. Select your VeeduWay project
3. Navigate to **Recordings** → you should see session replays
4. Navigate to **Heatmaps** → you should see click and scroll data

## Privacy Compliance

The Privacy Policy page (`/privacy`) has been updated with a disclosure:

> "We use Microsoft Clarity to capture anonymous usage patterns to improve our user experience. No personal information is stored."

## Technical Implementation

### Files Modified:
1. **`.env`** - Added `VITE_CLARITY_PROJECT_ID` variable
2. **`src/components/Clarity.tsx`** - React component that loads Clarity script
3. **`src/App.tsx`** - Includes Clarity component
4. **`src/vite-env.d.ts`** - TypeScript type definitions
5. **`src/pages/Privacy.tsx`** - Added privacy disclosure

### How It Works:
- The `Clarity` component runs a `useEffect` hook on mount
- Checks if running in production and if Project ID is configured
- Dynamically injects the Clarity script into the DOM
- Script loads asynchronously without blocking page render

## Troubleshooting

**Problem:** Clarity not loading in production
- **Solution:** Verify `VITE_CLARITY_PROJECT_ID` is set correctly in your hosting environment variables

**Problem:** Console shows "Already loaded"
- **Solution:** This is normal if the component re-renders. The script only loads once.

**Problem:** No data in Clarity dashboard
- **Solution:** Wait 30 minutes for data to populate. Ensure you have actual user traffic.

## Support

For questions about Clarity setup, contact the development team or refer to:
- Microsoft Clarity Documentation: https://learn.microsoft.com/en-us/clarity/
