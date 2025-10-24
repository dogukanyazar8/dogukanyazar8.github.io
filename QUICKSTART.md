# Quick Start Guide

Get your QA Blog up and running in 15 minutes!

## Prerequisites

- A Google account
- GitHub account (for hosting)
- Basic understanding of Firebase Console

## Step 1: Firebase Setup (5 minutes)

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name: `qa-blog` (or your preferred name)
4. Disable Google Analytics (optional for blog)
5. Click "Create project"

### Add Web App

1. In Firebase Console, click the web icon `</>`
2. Register app nickname: `QA Blog Web`
3. **Copy the firebaseConfig object** - you'll need this!
4. Click "Continue to console"

### Enable Firestore

1. Click "Firestore Database" in left menu
2. Click "Create database"
3. Start in **production mode**
4. Choose location closest to you (e.g., `europe-west`)
5. Click "Enable"

### Enable Authentication

1. Click "Authentication" in left menu
2. Click "Get started"
3. Click "Email/Password"
4. Toggle "Enable"
5. Click "Save"

### Enable Storage

1. Click "Storage" in left menu
2. Click "Get started"
3. Start in **production mode**
4. Use same location as Firestore
5. Click "Done"

## Step 2: Configure Your Site (3 minutes)

### Update Firebase Config

1. Open `js/firebase-config.js` in your code editor
2. Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",  // From Firebase Console
    authDomain: "qa-blog-xxxxx.firebaseapp.com",
    projectId: "qa-blog-xxxxx",
    storageBucket: "qa-blog-xxxxx.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};
```

## Step 3: Deploy Security Rules (2 minutes)

### Firestore Rules

1. Go to Firestore Database > Rules tab
2. Copy content from `firestore.rules`
3. Paste into the rules editor
4. Click "Publish"

### Storage Rules

1. Go to Storage > Rules tab
2. Copy content from `storage.rules`
3. Paste into the rules editor
4. Click "Publish"

## Step 4: Create Admin User (1 minute)

1. Go to Authentication > Users
2. Click "Add user"
3. Email: `your-email@example.com`
4. Password: Choose a strong password
5. Click "Add user"

## Step 5: Deploy to GitHub Pages (4 minutes)

### Push to GitHub

```bash
git add .
git commit -m "Configure Firebase for QA Blog"
git push origin main
```

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" > "Pages"
3. Source: `main` branch
4. Folder: `/ (root)`
5. Click "Save"

Your site will be live at `https://yourusername.github.io` in a few minutes!

## Step 6: Test Your Blog

### Login to Admin Panel

1. Go to `https://yourusername.github.io/admin/login.html`
2. Enter your admin email and password
3. You should be redirected to the dashboard

### Create Your First Blog Post

1. Click "Yeni Blog" button
2. Fill in:
   - Title: "Welcome to My QA Blog"
   - Category: "QA Testing"
   - Excerpt: "My first blog post about QA"
   - Content: Write in Markdown!
   - Upload a cover image (optional)
3. Check "Yayınla" (Publish)
4. Click "Kaydet" (Save)

### View Your Blog

1. Go to `https://yourusername.github.io`
2. Your blog post should appear!
3. Click to read it

## Optional: Add Sample Data

If you want to quickly populate your blog with sample content:

1. Open `SAMPLE_DATA.md`
2. Copy the JSON for each sample post
3. Go to Firestore Database > Start collection > `posts`
4. Paste JSON as new documents
5. Adjust timestamps to use Firebase Timestamp

## Troubleshooting

### "Firebase not defined" error
- Check that Firebase SDK scripts are loading
- Verify your internet connection
- Check browser console for errors

### "Permission denied" error
- Verify security rules are deployed
- Check that you're logged in for admin operations
- Ensure Firestore and Storage are enabled

### Can't login
- Verify user exists in Authentication
- Check email/password are correct
- Check browser console for errors

### Images not uploading
- Verify Storage is enabled
- Check Storage rules are deployed
- Ensure image is under 5MB

## Next Steps

1. **Customize Design**: Edit CSS files to match your brand
2. **Add Content**: Write more blog posts and add projects
3. **Update About Page**: Edit `about.html` with your information
4. **Add Analytics**: Add Google Analytics (optional)
5. **Custom Domain**: Set up a custom domain in GitHub Pages

## Support

For issues or questions:
- Check Firebase Console for error logs
- Review browser console for JavaScript errors
- Ensure all steps above were completed
- Check that Firebase config is correct

## Security Reminder

- ✅ Firebase config in code is **public** - this is normal!
- ✅ Security is enforced by Firestore/Storage rules
- ✅ Never commit real passwords or sensitive data
- ✅ Keep your admin password strong
- ✅ Regularly backup your Firestore data

---

**Congratulations!** 🎉 Your QA Blog is now live and ready to showcase your testing expertise!
