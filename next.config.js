/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com', 
      'image.tmdb.org',
      'res.cloudinary.com'
     
    ]
  }
}

module.exports =  nextConfig
