# The Legendary Africans (TLA)

A pan-African culture and commerce platform: a home for the TLA brand's clothing line, music, stories, and community. Built with Next.js and Supabase.

TLA started in 2017 as a clothing line rooted in fashion, music, and poetry, and has grown into a production house with design services, a recording studio, and a tech arm, **F-N Techhub**. This repo is the brand's website and online shop.

## Features

- **Shop**: product catalog with category filters and sorting, a full cart, checkout, and order confirmation
- **M-Pesa payments**: STK Push checkout with callback handling (currently tested in the Daraja sandbox)
- **Music**: self-hosted audio, featured single, album and singles rows, and a dedicated album page
- **Persistent audio player**: music keeps playing as visitors navigate between pages
- **Culture and Stories**: filterable culture posts (Fashion, Music, Art, History) and interview videos
- **About page**: the TLA story, vision, and community
- **Newsletter signup**: emails saved to Supabase
- **Admin panel** (`/admin`): login-protected management of products, tracks, culture posts, and orders, with no code edits needed
- **Responsive design**: mobile-tested, with a custom favicon and branded 404 page

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js (App Router), React, TypeScript |
| Backend and database | Supabase (Postgres, Auth, Storage) |
| Payments | M-Pesa Daraja API (STK Push) |
| Styling | Custom CSS |
| Icons | Lucide React |
| Tooling | ESLint |

## Getting Started

### Prerequisites

- Node.js 20 or later
- A [Supabase](https://supabase.com) project
- A [Safaricom Daraja](https://developer.safaricom.co.ke) sandbox app (for M-Pesa)
- [ngrok](https://ngrok.com) or a similar tunnel (Safaricom's sandbox cannot reach `localhost` for callbacks)

### Installation

```bash
git clone https://github.com/FN-techhub/the-legendary-africans.git
cd the-legendary-africans
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server-side only, never expose

# M-Pesa (Daraja sandbox)
MPESA_CONSUMER_KEY=your-consumer-key
MPESA_CONSUMER_SECRET=your-consumer-secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your-passkey

# Public URL used for the M-Pesa callback (your ngrok URL in development)
NEXT_PUBLIC_SITE_URL=https://your-public-url
```

> Never commit `.env.local`. The service role key bypasses Row Level Security and must stay on the server.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other Scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the codebase
```

## Database

The app expects these Supabase tables:

| Table | Purpose |
| --- | --- |
| `products` | Shop catalog (name, category, price, image) |
| `tracks` | Music catalog (title, category, track number, audio and cover paths, featured flag) |
| `culture_posts` | Culture page content (title, excerpt, image, type, category, featured flag) |
| `orders` | Customer orders (details, items, total, payment and order status, `checkout_request_id`) |
| `newsletter_signups` | Newsletter emails |

Row Level Security is enabled. Public visitors can read catalog content and submit orders and newsletter signups; writes to catalog tables and reads of orders are restricted to the authenticated admin.

Admin access uses Supabase Auth with a single admin user created in the Supabase dashboard (no public signup).

## Payment Flow (M-Pesa)

1. Customer adds items to the cart and checks out.
2. A pending order is created in Supabase.
3. On the payment page, the customer enters their phone number and an STK Push prompt is sent.
4. Safaricom calls back to `/api/mpesa/callback`, which matches the order by `CheckoutRequestID` and updates its payment status.
5. The payment page polls the order and redirects to the confirmation page once it is marked paid.

## Roadmap

- [ ] Card payments for international buyers (USD)
- [ ] Switch M-Pesa from sandbox to production
- [ ] Real product photography
- [ ] Stories page
- [ ] International delivery logistics

## Project Structure

```
app/          # Routes, pages, components, API routes, and shared logic
public/       # Static assets (images, audio)
```

## Contributing

This is a private brand project. If you would like to collaborate, please get in touch via F-N Techhub.

## License

All rights reserved. Brand name, logo, artwork, and music are the property of The Legendary Africans. Do not reuse without permission.

---

Built by [F-N Techhub](https://github.com/FN-techhub).
