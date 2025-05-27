import Product from '../model/Product.js';

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20, q } = req.query;
    const query = q
      ? {
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } }
          ]
        }
      : {};

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET product by ID
export const getProductById = async (req, res) => {
  try {
    console.log(req.params.id)
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const search= async (req, res) => {
  try {
    const { category, material, minPrice, maxPrice } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (material) {
      filter.material = material;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST create product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      shortname,
      brand,
      collections,
      dimensionscm,
      dimensionsinch,
      type,
      seatingheight,
      weight,
      oldprice,
      off,
      material,
    } = req.body;

    // Use file.path since CloudinaryStorage provides full URL in file.path
    const imagePaths = req.files ? req.files.map((file) => file.path) : [];
    const product = new Product({
      name,
      description,
      price,
      category,
      shortname,
      brand,
      collections,
      dimensionscm,
      dimensionsinch,
      type,
      seatingheight,
      weight,
      oldprice,
      off,
      material,
      image: imagePaths,
    });

    await product.save();

    req.io.emit("productAdded", product); 
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT update product
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      shortname,
      brand,
      collections,
      dimensionscm,
      dimensionsinch,
      type,
      seatingheight,
      weight,
      oldprice,
      off,
      material,
    } = req.body;

    const updateData = {
      name,
      description,
      price,
      category,
      shortname,
      brand,
      collections,
      dimensionscm,
      dimensionsinch,
      type,
      seatingheight,
      weight,
      oldprice,
      off,
      material,
    };

    // Handle uploaded image(s)
    if (req.files && req.files.length > 0) {
      updateData.image = req.files.map((file) => `/uploads/${file.filename}`);
    } else if (req.file) {
      updateData.image = [`/uploads/${req.file.filename}`];
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    req.io.emit("productUpdated", product);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    req.io.emit('productDeleted', product._id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
 
                            //filterning and searching routes//

// Get all unique category
// Get all unique category (no filter, so no need for body params)
export const getcategory = async (req, res) => {
  console.log("🔍 getcategory endpoint hit");
  try {
    const category = await Product.distinct('category', { isDelete: false });
    console.log("✅ category fetched:", category);
    res.json(category);
  } catch (err) {
    console.error("❌ Error in getcategory:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get unique materials by categorie (from req.body)
export const getMaterials = async (req, res) => {
  console.log(req.body)
  const { category } = req.body;
  if (!category) {
    return res.status(400).json({ message: "Missing 'category' in request body" });
  }
  try {
    const materials = await Product.distinct('material', { category, isDelete: false });
    res.json(materials);
  } catch (err) {
    console.error("❌ Error in getMaterials:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get unique brands by categorie and material (from req.body)
export const getBrands = async (req, res) => {
  const { category, material } = req.body;
  if (!category || !material) {
    return res.status(400).json({ message: "Missing 'category' or 'material' in request body" });
  }
  try {
    const brands = await Product.distinct('brand', { category, material, isDelete: false });
    res.json(brands);
  } catch (err) {
    console.error("❌ Error in getBrands:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Final search with all filters (from req.body)
export const searchProduct = async (req, res) => {
  const { category, material, brand } = req.body;
  const query = { isDelete: false };

  if (category) query.category = category;
  if (material) query.material = material;
  if (brand) query.brand = brand;

  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error("❌ Error in searchProduct:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
