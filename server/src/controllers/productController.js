const {
  addNewProduct,
  getProductsByCategoryService,
} = require("../services/productServices");

const addProduct = async (req, res) => {
  try {
    const { name, price, description, quantity, categoryId } = req.body;
    if (!name || !price || !description || !quantity || !categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newProduct = await addNewProduct({
      name,
      price,
      description,
      quantity,
      categoryId,
    });
    return res.status(201).json({
      success: true,
      message: "New product added successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log("Internal Server Error in adding product :", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in adding product",
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const parsedCategoryId = Number(categoryId);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (!parsedCategoryId || isNaN(parsedCategoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid categoryId",
      });
    }
    const products = await getProductsByCategoryService({
      parsedCategoryId,
      page,
      limit,
    });
    return res.status(200).json({
      success: true,
      message:
        products.length === 0
          ? "No products found for this category"
          : "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.log(
      "Internal Server Error in getting products by category:",
      error,
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await getAllProductsService({ page, limit });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log("Internal Server Error in getting all products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProductById = (req, res) => {
  try {
    const { id } = req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }
  } catch (error) {
    console.log("Internal Server Error in getting product by id :", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in getting product by id",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      minPrice,
      maxPrice,
      sortBy,
      order,
    } = req.query;

    const result = await productService.getProducts({
      page: Number(page),
      limit: Number(limit),
      search,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      sortBy,
      order,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addProduct,
  getProductById,
  getAllProducts,
  getProductsByCategory,
  getProducts,
};
