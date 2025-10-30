# Tensoro Landing Page

A modern, responsive landing page for Tensoro - an AI-forward consultancy that helps organizations leverage artificial intelligence.

## Features

- **Modern Design**: Deep midnight blue/black background with electric cyan and silver gradients
- **Responsive Layout**: Fully responsive design that works on all devices
- **Hero Section**: Compelling headline and call-to-action with Tensoro logo
- **Services Section**: Showcase of 7 core AI consulting services
- **Contact Form**: Integrated form with Supabase backend and email notifications
- **Smooth Animations**: Hover effects and transitions for enhanced user experience

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Supabase**: Backend as a service for data storage
- **Inter Font**: Professional typography

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

## Setup Instructions

### 1. Clone and Install

```bash
cd tensoro-landing
npm install
```

### 2. Set Up Supabase

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Go to the SQL Editor and run this query to create the contact submissions table:

```sql
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  company_website text,
  question text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table contact_submissions enable row level security;

-- Create a policy that allows inserting (for the contact form)
create policy "Enable insert for all users" on contact_submissions
  for insert with check (true);

-- Create a policy that allows reading (for admin purposes)
create policy "Enable read for authenticated users only" on contact_submissions
  for select using (auth.role() = 'authenticated');
```

### 3. Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Get your Supabase credentials:
   - Go to your Supabase project settings
   - Navigate to API section
   - Copy the URL and anon/public key

3. Update `.env` with your values:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Add Logo

Place your `Tensoro_Logo.jpg` file in the `public` directory:
```bash
cp /path/to/Tensoro_Logo.jpg public/
```

### 5. Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Email Notifications

The contact form currently logs submissions to the console. To enable email notifications to matt@tensorolabs.com, you have two options:

### Option 1: Supabase Edge Function

Create a Supabase Edge Function that sends emails using a service like SendGrid or Resend:

```bash
supabase functions new send-contact-email
```

### Option 2: Third-party Service

Integrate with services like:
- Formspree
- EmailJS
- SendGrid
- AWS SES

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:
```js
colors: {
  'midnight': {
    900: '#0a0e27',
    800: '#0f1433',
  },
  'electric-cyan': '#00d9ff',
}
```

### Services

Edit the `services` array in `src/App.jsx` to modify service offerings.

## Deployment

This site can be deployed to various platforms:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **Cloudflare Pages**: Connect via Git
- **AWS Amplify**: Deploy via console or CLI

Remember to add environment variables in your deployment platform's settings.

## Support

For issues or questions, please contact the development team.

## License

Copyright © 2025 Tensoro. All rights reserved.
