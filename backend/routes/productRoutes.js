import {
  addProduct,
  addProductReview,
  fetchAllProducts,
  fetchNewProducts,
  fetchProductByID,
  fetchProducts,
  fetchTopProducts,
  removeProduct,
  updateProductDetails,
} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

import express from "express";
import formidable from "express-formidable";
import checkId from "../middlewares/checkId.js";

const router = express.Router();

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductByID)
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct);

export default router;
