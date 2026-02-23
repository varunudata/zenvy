const prisma = require("../db/prisma");

const addNewProduct = async (data) => {
  const product = await prisma.product.create({
    data: data,
  });
  return product;
};

const getAllProductsService = async ({ page, limit }) => {
  const skip = (page - 1) * limit;

  const totalProducts = await prisma.product.count();

  const products = await prisma.product.findMany({
    skip,
    take: limit,
    select: {
      id: true,
      name: true,
      price: true,
      quantity: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const totalPages = Math.ceil(totalProducts / limit);

  return {
    products,
    pagination: {
      page,
      limit,
      totalProducts,
      totalPages,
    },
  };
};

const getProductsByCategoryService = async ({ categoryId, page, limit }) => {
  const skip = (page - 1) * limit;

  const totalProducts = await prisma.product.count({
    where: { categoryId },
  });

  const products = await prisma.product.findMany({
    where: { categoryId },
    skip,
    take: limit,
    select: {
      id: true,
      name: true,
      price: true,
      quantity: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const totalPages = Math.ceil(totalProducts / limit);
  return {
    products,
    pagination: {
      page,
      limit,
      totalProducts,
      totalPages,
    },
  };
};

const getProducts = async ({
  page,
  limit,
  search,
  minPrice,
  maxPrice,
  sortBy,
  order,
}) => {
  const where = {};

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  const validSortFields = ["price", "name", "createdAt"];
  const validOrder = ["asc", "desc"];

  const safeSortBy = validSortFields.includes(sortBy) ? sortBy : "createdAt";

  const safeOrder = validOrder.includes(order) ? order : "desc";

  const skip = (page - 1) * limit;

  const [products, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [safeSortBy]: safeOrder,
      },
      select: {
        id: true,
        name: true,
        price: true,
        quantity: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    pagination: {
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    },
  };
};

module.exports = {
  addNewProduct,
  getAllProductsService,
  getProductsByCategoryService,
  getProducts,
};
