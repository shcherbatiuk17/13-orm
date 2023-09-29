const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET all products with associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag },
      ],
    });
    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// GET one product by ID with associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag },
      ],
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve the product' });
  }
});

// CREATE a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    const tagIds = req.body.tagIds || [];
    const productTagIds = tagIds.map(tag_id => ({ product_id: newProduct.id, tag_id }));

    await ProductTag.bulkCreate(productTagIds);

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the product' });
  }
});

// UPDATE a product by ID
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Update the product data
    await Product.update(req.body, {
      where: { id: productId },
    });

    const tagIds = req.body.tagIds || [];
    
    // Get the current product tags
    const currentProductTags = await ProductTag.findAll({ where: { product_id: productId } });
    const currentTagIds = currentProductTags.map(({ tag_id }) => tag_id);

    // Find which tags to add and remove
    const tagsToAdd = tagIds.filter(tag_id => !currentTagIds.includes(tag_id));
    const tagsToRemove = currentProductTags.filter(({ tag_id }) => !tagIds.includes(tag_id));

    // Remove and add tags as necessary
    await Promise.all([
      ProductTag.destroy({ where: { id: tagsToRemove.map(({ id }) => id) } }),
      ProductTag.bulkCreate(tagsToAdd.map(tag_id => ({ product_id: productId, tag_id }))),
    ]);

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the product' });
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Delete the product
    const deletedProduct = await Product.destroy({
      where: { id: productId },
    });

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the product' });
  }
});

module.exports = router;
