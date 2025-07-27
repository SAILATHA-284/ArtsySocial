import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, bestseller } = req.body;

    if (!req.files) {
      return res.status(400).json({ success: false, message: "Images are required" });
    }

    const imageKeys = ['image1', 'image2', 'image3', 'image4'];
    const images = [];

    imageKeys.forEach(key => {
      if (req.files[key] && req.files[key][0]) {
        images.push(req.files[key][0]);
      }
    });

    if (images.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      bestseller: bestseller === true || bestseller === "true",
      image: imagesUrl,
      date: Date.now()
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });

  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listProducts = async(req,res)=>{
    try{
        const products= await productModel.find({});
        res.json({success:true, products})
    }catch(error){
        console.log(error)
        res.json({success: false, message:error.message})
    }
}

const removeProduct = async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Product removed"})
    }catch(error){
        console.log(error)
        res.json({success: false , message: error.message})
    }
}

const singleProduct = async(req, res)=>{
    try{
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true, product})
    }catch(error){
        console.log(error)
        res.json({success: false , message: error.message})
    }
}

export {addProduct, listProducts, removeProduct, singleProduct};