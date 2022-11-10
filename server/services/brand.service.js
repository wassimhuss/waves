const { Brand } = require("../models/brand");
const { ApiError } = require("../middleware/apiError");
const httpStatus = require("http-status");

const addBrand = async (brandname) => {
  try {
    const brand = new Brand({
      name: brandname,
    });
    await brand.save();
    return brand;
  } catch (error) {
    throw error;
  }
};
const updateBrandById = async (_id, body) => {
  try {
    const product = await Brand.findOneAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, "Brand not found");
    return product;
  } catch (error) {
    throw error;
  }
};
const getBrandById = async (id) => {
  try {
    const brand = await Brand.findById(id);
    if (!brand) throw new ApiError(httpStatus.NOT_FOUND, "Brand not found");
    return brand;
  } catch (error) {
    throw error;
  }
};

const deleteBrandById = async (id) => {
  try {
    const brand = await Brand.findByIdAndRemove(id);
    return brand;
  } catch (error) {
    throw error;
  }
};

const getBrands = async (args) => {
  try {
    let order = args.order ? args.order : "desc";
    let limit = args.limit ? args.limit : 100;

    const brands = await Brand.find({})
      .sort([["_id", order]])
      .limit(limit);

    if (!brands) throw new ApiError(httpStatus.NOT_FOUND, "Brands not found");
    return brands;
  } catch (error) {
    throw error;
  }
};

const paginateBrands = async (req) => {
  try {
    let aggQueryArray = [];
    if (req.body.keywords && req.body.keywords != "") {
      const re = new RegExp(`${req.body.keywords}`, "gi");
      aggQueryArray.push({
        $match: { model: { $regex: re } },
      });
    }
    let aggQuery = Brand.aggregate(aggQueryArray);
    const options = {
      page: req.body.page,
      limit: 6,
      sort: { date: "desc" },
    };
    const brands = await Brand.aggregatePaginate(aggQuery, options);
    return brands;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addBrand,
  getBrandById,
  deleteBrandById,
  getBrands,
  paginateBrands,
  updateBrandById,
};
