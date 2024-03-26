import Product from "../models/product.model.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate({
        path: "business",
        select: "name owner",
        populate: {
          path: "owner",
          select: "_id username profilePic", // Include username and profilePic fields
        },
      })
      .select("name price images description"); // Include description field

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const response = {
      _id: product._id,
      name: product.name,
      price: product.price,
      images: product.images,
      description: product.description,
      business: {
        _id: product.business._id,
        name: product.business.name,
        owner: {
          username: product.business.owner.username,
          profilePic: product.business.owner.profilePic,
          id: product.business.owner._id,
        },
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Get products by business
export const getProductsByBusiness = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Business id is: ", id);
    const products = await Product.find({ business: id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, business, images } = req.body;

    // Create a new product instance
    const product = new Product({
      name,
      description,
      price,
      business,
      images,
    });

    // Save the product to the database
    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};

// // Update product
// export const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, price, business } = req.body;
//     const product = await Product.findByIdAndUpdate(
//       id,
//       {
//         name,
//         description,
//         price,
//         business,
//       },
//       { new: true }
//     );
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
