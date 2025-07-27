import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async () => {
  console.log('🧪 Cloudinary ENV CHECK:', {
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY
  })

  if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY) {
    throw new Error('❌ Cloudinary ENV variables are missing')
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  })

  console.log('✅ Cloudinary connected successfully')
}

export default connectCloudinary

