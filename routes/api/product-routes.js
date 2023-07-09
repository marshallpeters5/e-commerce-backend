const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint //

// Get all products //
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, Tag],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get one product //
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Category, Tag],
    });
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new product //
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);

    // If there are product tags, create pairings to bulk create in the ProductTag model //
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Update product //
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const productTags = await ProductTag.findAll({
      where: { product_id: req.params.id },
    });

    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => ({
        product_id: req.params.id,
        tag_id,
      }));

    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Delete product //
router.delete('/:id', async (req, res) => {
  try {
    await ProductTag.destroy({ where: { product_id: req.params.id } });

    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
