exports.findByCategory = (req, doc) => {
  const regex = new RegExp(`,${req.query.category}`, "g");
  const regex2 = new RegExp(`^${req.query.category}`, "g");
  const newDoc = doc.filter((product) => {
    return (
      product.category.path.match(regex) || product.category.path.match(regex2)
    );
  });

  return newDoc;
};

exports.setCategory = async (req) => {
  const category = await ProductCategoryModel.find({ name: req.body.category });
  const categoryId = category[0]._id.toString();
  req.body.category = categoryId;
};
