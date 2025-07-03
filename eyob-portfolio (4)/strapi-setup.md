# Strapi CMS Setup Guide

## 1. Install Strapi

\`\`\`bash
npx create-strapi-app@latest eyob-cms --quickstart
cd eyob-cms
npm run develop
\`\`\`

## 2. Content Types to Create

### Blog Post
- **Collection Type**: `blog-post`
- **Fields**:
  - title (Text, required)
  - slug (UID, required, target: title)
  - content (Rich Text, required)
  - excerpt (Text)
  - featured_image (Media, single)
  - category (Text, required)
  - tags (JSON)
  - author (Text, required, default: "Eyob Salemot")
  - published (Boolean, default: false)
  - seo (Component: SEO)
- **Internationalization**: Enable
- **Draft & Publish**: Enable

### Booking
- **Collection Type**: `booking`
- **Fields**:
  - firstName (Text, required)
  - lastName (Text, required)
  - email (Email, required)
  - phone (Text, required)
  - country (Text)
  - tourType (Text, required)
  - groupSize (Number, required)
  - selectedDate (Date, required)
  - timeSlot (Text, required)
  - specialRequests (Text)
  - language (Text)
  - status (Enumeration: pending, confirmed, cancelled, completed)
  - adminNotes (Text)

### Contact
- **Collection Type**: `contact`
- **Fields**:
  - name (Text, required)
  - email (Email, required)
  - phone (Text)
  - service (Text, required)
  - message (Text, required)
  - status (Enumeration: new, responded, closed)

### Portfolio Item
- **Collection Type**: `portfolio-item`
- **Fields**:
  - title (Text, required)
  - description (Text)
  - category (Enumeration: sales, media, community, tourism)
  - images (Media, multiple)
  - videos (Media, multiple)
  - client (Text)
  - projectDate (Date)
  - tags (JSON)
  - featured (Boolean, default: false)
- **Internationalization**: Enable
- **Draft & Publish**: Enable

### Testimonial
- **Collection Type**: `testimonial`
- **Fields**:
  - name (Text, required)
  - position (Text)
  - company (Text)
  - content (Text, required)
  - rating (Number, min: 1, max: 5)
  - avatar (Media, single)
  - published (Boolean, default: false)
- **Internationalization**: Enable

### Site Settings
- **Single Type**: `site-setting`
- **Fields**:
  - siteName (Text, required)
  - siteDescription (Text, required)
  - contactEmail (Email, required)
  - contactPhone (Text, required)
  - address (Text)
  - socialMedia (Component: Social Media)
  - seo (Component: SEO)
  - logo (Media, single)
  - favicon (Media, single)
- **Internationalization**: Enable

## 3. Components to Create

### SEO Component
- **Fields**:
  - metaTitle (Text)
  - metaDescription (Text)
  - keywords (Text)

### Social Media Component
- **Fields**:
  - facebook (Text)
  - twitter (Text)
  - linkedin (Text)
  - instagram (Text)
  - youtube (Text)

## 4. Roles & Permissions

### Public Role
- **Permissions**:
  - blog-post: find, findOne
  - portfolio-item: find, findOne
  - testimonial: find, findOne
  - site-setting: find
  - booking: create
  - contact: create

### Authenticated Role
- **Permissions**:
  - All public permissions
  - testimonial: create

### Admin Role
- **Permissions**:
  - Full access to all content types

## 5. API Token Setup

1. Go to Settings > API Tokens
2. Create new token with "Full access" permissions
3. Copy token to your .env file as `STRAPI_API_TOKEN`

## 6. Internationalization Setup

1. Go to Settings > Internationalization
2. Add locales:
   - English (en) - Default
   - Amharic (am)
   - French (fr)
   - Swahili (sw)

## 7. Media Library Setup

1. Configure upload settings in Settings > Media Library
2. Set up cloud storage (Cloudinary recommended) for production

## 8. Email Plugin (Optional)

\`\`\`bash
npm install @strapi/provider-email-nodemailer
\`\`\`

Configure in `config/plugins.js`:

\`\`\`javascript
module.exports = {
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      settings: {
        defaultFrom: process.env.SMTP_USER,
        defaultReplyTo: process.env.SMTP_USER,
      },
    },
  },
};
\`\`\`

## 9. Production Deployment

### Database Configuration
Update `config/database.js` for production:

\`\`\`javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT'),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
\`\`\`

### Environment Variables
\`\`\`
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-db-user
DATABASE_PASSWORD=your-db-password
DATABASE_SSL=true

# Strapi
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Cloud Storage
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
\`\`\`

## 10. Admin Panel Access

1. Start Strapi: `npm run develop`
2. Visit: `http://localhost:1337/admin`
3. Create admin account
4. Start managing content!

## 11. Content Management Workflow

### For Blog Posts:
1. Create new blog post in Strapi admin
2. Add content using rich text editor
3. Upload featured image
4. Set category and tags
5. Configure SEO settings
6. Save as draft or publish immediately
7. Content automatically appears on frontend

### For Bookings:
1. Bookings are created via frontend form
2. Admin receives notifications
3. Manage booking status in Strapi admin
4. Send confirmation emails

### For Portfolio:
1. Upload media files to Media Library
2. Create portfolio items
3. Associate media with portfolio items
4. Organize by category
5. Set featured items for homepage

This headless CMS setup provides:
- ✅ Professional admin interface
- ✅ Multi-language content management
- ✅ Media management with cloud storage
- ✅ SEO optimization tools
- ✅ Role-based permissions
- ✅ API-first architecture
- ✅ Scalable and maintainable
