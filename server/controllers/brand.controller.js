const { brandService } = require("../services");

const brandController = {
  async addBrand(req, res, next) {
    try {
      const brand = await brandService.addBrand(req.body.name);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  },
  async updateBrandById(req, res, next) {
    try {
      const _id = req.params.id;
      const product = await brandService.updateBrandById(_id, req.body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
  async getBrand(req, res, next) {
    try {
      const id = req.params.id;
      const brand = await brandService.getBrandById(id);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  },
  async deleteBrandById(req, res, next) {
    try {
      const id = req.params.id;
      const brand = await brandService.deleteBrandById(id);
      res.json(brand);
    } catch (error) {
      next(error);
    }
  },
  async getBrands(req, res, next) {
    try {
      const brands = await brandService.getBrands(req.body);
      res.json(brands);
    } catch (error) {
      next(error);
    }
  },
  async paginateBrands(req, res, next) {
    try {
      const products = await brandService.paginateBrands(req);
      res.json(products);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = brandController;
