/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
      appDir: true,
    },
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com', 
      'image.tmdb.org',
      'res.cloudinary.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com'
     
    ]
  }
}

module.exports =  nextConfig
