jest.mock("../../db/prisma", () => ({
    product: {
        create: jest.fn(),
        count: jest.fn(),
        findMany: jest.fn(),
    },
}));

const prisma = require("../../db/prisma");
const productServices = require("../productServices");

describe("Product Services", () => {
    describe("addNewProduct", () => {
        it("should add a new product", async () => {
            const mockProductData = { name: "Test Product", price: 10, description: "Test", quantity: 5, categoryId: 1 };
            const savedProduct = { id: 1, ...mockProductData };
            prisma.product.create.mockResolvedValue(savedProduct);

            const result = await productServices.addNewProduct(mockProductData);

            expect(prisma.product.create).toHaveBeenCalledWith({ data: mockProductData });
            expect(result).toEqual(savedProduct);
        });
    });

    describe("getAllProductsService", () => {
        it("should return paginated products", async () => {
            const mockProducts = [{ id: 1, name: "Product A" }];
            prisma.product.count.mockResolvedValue(1);
            prisma.product.findMany.mockResolvedValue(mockProducts);

            const result = await productServices.getAllProductsService({ page: 1, limit: 10 });

            expect(prisma.product.count).toHaveBeenCalled();
            expect(prisma.product.findMany).toHaveBeenCalledWith({
                skip: 0,
                take: 10,
                select: expect.any(Object),
            });
            expect(result).toEqual({
                products: mockProducts,
                pagination: {
                    page: 1,
                    limit: 10,
                    totalProducts: 1,
                    totalPages: 1,
                },
            });
        });
    });

    describe("getProductsByCategoryService", () => {
        it("should return paginated products filtered by category", async () => {
            const mockProducts = [{ id: 2, name: "Product B", categoryId: 1 }];
            prisma.product.count.mockResolvedValue(1);
            prisma.product.findMany.mockResolvedValue(mockProducts);

            const result = await productServices.getProductsByCategoryService({ categoryId: 1, page: 2, limit: 5 });

            expect(prisma.product.count).toHaveBeenCalledWith({ where: { categoryId: 1 } });
            expect(prisma.product.findMany).toHaveBeenCalledWith({
                where: { categoryId: 1 },
                skip: 5,
                take: 5,
                select: expect.any(Object),
            });
            expect(result).toEqual({
                products: mockProducts,
                pagination: {
                    page: 2,
                    limit: 5,
                    totalProducts: 1,
                    totalPages: 1,
                },
            });
        });
    });

    describe("getProducts", () => {
        it("should return products based on multiple filters", async () => {
            const mockProducts = [{ id: 3, name: "Product C", price: 50 }];
            prisma.product.findMany.mockResolvedValue(mockProducts);
            prisma.product.count.mockResolvedValue(1);

            const query = { page: 1, limit: 10, search: "Pro", minPrice: 20, maxPrice: 100, sortBy: "price", order: "asc" };
            const result = await productServices.getProducts(query);

            expect(prisma.product.findMany).toHaveBeenCalledWith({
                where: {
                    name: { contains: "Pro", mode: "insensitive" },
                    price: { gte: 20, lte: 100 },
                },
                skip: 0,
                take: 10,
                orderBy: { price: "asc" },
                select: expect.any(Object),
            });
            expect(result.products).toEqual(mockProducts);
            expect(result.pagination.totalProducts).toBe(1);
        });
    });
});
