# Food Pre-Order System

A web application for pre-ordering food from multiple canteens, built with Next.js and Supabase.

## Features

- User authentication (login/register)
- Browse canteens and their food menus
- Pre-order food items via WhatsApp
- Admin panel for managing canteens and food items
- Responsive design for mobile and desktop

## Tech Stack

- Next.js 15.x
- TypeScript
- Supabase (Authentication, Database)
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account

### Setting Up Supabase

1. Create a new Supabase project
2. Set up the database schema using the SQL provided below:

```sql
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  role text DEFAULT 'user',
  created_at timestamp with time zone DEFAULT now()
);

-- Fungsi trigger
CREATE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.canteens (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  whatsapp_number text NOT NULL,
  image_url text,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.foods (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  canteen_id uuid REFERENCES public.canteens(id),
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  description text,
  image_url text,
  is_available boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);
```

3. Get your Supabase URL and Anon Key from the Supabase dashboard

### Project Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd food-preorder-system
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project can be deployed on Vercel, Netlify, or any platform that supports Next.js.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/) from the creators of Next.js.

1. Push your code to a Git repository
2. Import the project to Vercel
3. Add your environment variables
4. Deploy

## Admin Access

To create an admin user:
1. Register a new user through the application
2. Access your Supabase dashboard
3. Go to the Auth > Users section
4. Find the user you want to make an admin
5. Update the user's `profiles` table record, changing the `role` field to `admin`

## License

This project is licensed under the MIT License.

## Pengaturan Storage untuk Foto Profil

Untuk mengaktifkan fitur foto profil, perlu dilakukan pengaturan bucket storage di Supabase:

1. Login ke dashboard Supabase project Anda
2. Navigasikan ke menu "Storage" di sidebar
3. Klik tombol "Create new bucket"
4. Masukkan nama bucket: `avatars`
5. Centang opsi "Public bucket" (agar gambar bisa diakses publik)
6. Klik "Create bucket" untuk menyelesaikan pembuatan bucket
7. Setelah bucket dibuat, masuk ke tab "Policies" 
8. Tambahkan policy baru dengan klik "Add Policies" dan pilih "Create custom policies"
9. Buatlah policy dengan pengaturan berikut untuk mengizinkan upload:
   - Policy name: `Allow authenticated uploads`
   - Allowed operation: `INSERT`
   - Target roles: `authenticated`
   - Policy definition: `(auth.uid() = auth.uid())`
   - Klik "Save policy"
10. Tambahkan policy lainnya untuk mengizinkan akses publik:
    - Policy name: `Public read access`
    - Allowed operation: `SELECT`
    - Target roles: `public`
    - Policy definition: `(true)`
    - Klik "Save policy"

Setelah menyelesaikan pengaturan ini, pengguna dapat mengunggah dan mengubah foto profil mereka.
