# Backend 500 Error Fix Guide

Your backend is crashing with a 500 error. Here's what I've fixed and what you need to check:

## Changes Made

1. **Improved error handling** - Settings loading won't crash the entire app
2. **Better health endpoint** - Now shows configuration status
3. **Lazy CORS setup** - CORS won't fail if settings are missing
4. **Clearer error messages** - Better debugging information

## Critical: Check Your Vercel Environment Variables

The most common cause of 500 errors is **missing or incorrect environment variables**.

### Required Environment Variables

Go to your Vercel project → Settings → Environment Variables and verify:

1. **`OPENROUTER_API_KEY`** ✅ **REQUIRED**
   - Must be set
   - Format: `sk-or-v1-...` (your OpenRouter API key)
   - Without this, the app will crash

2. **`CORS_ORIGINS`** ✅ **REQUIRED**
   - Must include your frontend URL
   - Format options:
     - Single URL: `https://your-frontend.vercel.app`
     - Multiple (comma-separated): `https://app1.vercel.app,https://app2.vercel.app`
     - JSON array: `["https://your-frontend.vercel.app"]`

3. **`MODEL_NAME`** (Optional)
   - Default: `meta-llama/llama-3.3-70b-instruct:free`
   - Only set if you want a different model

## How to Fix

### Step 1: Verify Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your backend project
3. Go to **Settings** → **Environment Variables**
4. Check that all required variables are set
5. Make sure they're enabled for **Production**, **Preview**, and **Development**

### Step 2: Test the Health Endpoint

After setting environment variables, test:

```bash
curl https://your-backend.vercel.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "config_loaded": true,
  "cors_origins": ["https://your-frontend.vercel.app"]
}
```

If `config_loaded` is `false`, there's still a configuration issue.

### Step 3: Check Function Logs

1. Go to Vercel Dashboard → Your Project
2. Click **Functions** tab
3. Click on `api/index` function
4. Look at recent invocations
5. Check the logs for error messages

Common errors you might see:

- **"OPENROUTER_API_KEY is required"** → Set the environment variable
- **"Mangum not available"** → Check requirements.txt includes `mangum`
- **"Failed to load settings"** → Check environment variable format

### Step 4: Redeploy

After fixing environment variables:

1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger auto-deployment

## Testing Your Backend

### 1. Health Check
```bash
curl https://your-backend.vercel.app/api/health
```

### 2. Test Gift Suggestion
```bash
curl -X POST https://your-backend.vercel.app/api/suggest-gift \
  -H "Content-Type: application/json" \
  -d '{"user_message": "I need a gift for my 30-year-old brother who loves gaming and coffee"}'
```

## Common Issues

### Issue: "OPENROUTER_API_KEY is required"
**Solution:** Set the `OPENROUTER_API_KEY` environment variable in Vercel

### Issue: CORS errors from frontend
**Solution:** Make sure `CORS_ORIGINS` includes your frontend URL exactly as it appears (with https://)

### Issue: Function timeout
**Solution:** AI calls can take time. Vercel free tier has 10s timeout. Consider:
- Using a faster model
- Upgrading Vercel plan
- Optimizing the prompt

### Issue: "Module not found"
**Solution:** 
- Verify `requirements.txt` is in the `api/` directory
- Check that `mangum` is listed in requirements.txt
- Redeploy after adding dependencies

## Quick Checklist

- [ ] `OPENROUTER_API_KEY` is set in Vercel
- [ ] `CORS_ORIGINS` is set with your frontend URL
- [ ] Environment variables are enabled for all environments
- [ ] `requirements.txt` includes `mangum`
- [ ] Health endpoint returns `config_loaded: true`
- [ ] Function logs show no errors
- [ ] Latest code is deployed

## Still Not Working?

1. **Check the exact error in Vercel logs** - This will tell you exactly what's wrong
2. **Verify your OpenRouter API key is valid** - Test it at openrouter.ai
3. **Make sure you're using the correct backend URL** - Check in Vercel dashboard
4. **Try redeploying** - Sometimes a fresh deployment fixes issues

## Next Steps

Once the backend is working:
1. Update your frontend's `NEXT_PUBLIC_API_URL` to point to your backend
2. Test the full flow from frontend to backend
3. Monitor the function logs for any issues

