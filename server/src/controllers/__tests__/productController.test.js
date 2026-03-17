const productController = require("../productController");
const productServices = require("../../services/productServices");

// Mock the services
jest.mock("../../services/productServices");

// Helper to mock Express req and res
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockRequest = (body = {}, query = {}, params = {}) => {
    return { body, query, params };
};

describe("Product Controller", () => {
    describe("addProduct", () => {
        it("should return 400 if required fields are missing", async () => {
            const req = mockRequest({ name: "Only Name" });
            const res = mockResponse();

            await productController.addProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "All fields are required",
            });
        });

        it("should return 201 and add product on success", async () => {
            const newProduct = { id: 1, name: "Shirt", price: 20, description: "Desc", quantity: 5, categoryId: 1 };
            const req = mockRequest({ name: "Shirt", price: 20, description: "Desc", quantity: 5, categoryId: 1 });
            const res = mockResponse();

            productServices.addNewProduct.mockResolvedValue(newProduct);

            await productController.addProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "New product added successfully",
                data: newProduct,
            });
        });
    });

    describe("getProductsByCategory", () => {
        it("should return 400 for invalid categoryId", async () => {
            const req = mockRequest({}, {}, { categoryId: "invalid" });
            const res = mockResponse();

            await productController.getProductsByCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "Invalid categoryId",
            });
        });

        it("should return 200 with products on valid categoryId", async () => {
            const mockProducts = [{ id: 1, name: "Shirt" }];
            productServices.getProductsByCategoryService.mockResolvedValue(mockProducts);

            const req = mockRequest({}, { page: 1, limit: 10 }, { categoryId: "1" });
            const res = mockResponse();

            await productController.getProductsByCategory(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "Products fetched successfully",
                data: mockProducts,
            });
        });
    });

    describe("getAllProducts", () => {
        it("should return 200 with all products", async () => {
            const mockResult = { products: [], pagination: {} };
            productServices.getAllProductsService.mockResolvedValue(mockResult);

            const req = mockRequest({}, { page: 1, limit: 10 });
            const res = mockResponse();

            await productController.getAllProducts(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                data: mockResult,
            });
        });
    });
});
