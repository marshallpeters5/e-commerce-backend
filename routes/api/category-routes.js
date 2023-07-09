const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories with associated products // 
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category by id with associated products //
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    res.json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new category //
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a category by id //
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a category by id //
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
