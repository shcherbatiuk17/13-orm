const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', async (req, res) => {
  try {
    // Retrieve all tags and include associated Products through ProductTag
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve tags' });
  }
});

// GET a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Find a single tag by its ID and include associated Products through ProductTag
    const tag = await Tag.findByPk(tagId, {
      include: [{ model: Product, through: ProductTag }],
    });
    
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    
    res.status(200).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve the tag' });
  }
});

// CREATE a new tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag using the data from the request body
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the tag' });
  }
});

// UPDATE a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Update the name of a tag by its ID
    const updatedTag = await Tag.update(req.body, {
      where: { id: tagId },
    });
    
    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update the tag' });
  }
});

// DELETE a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Delete a tag by its ID
    const deletedTag = await Tag.destroy({
      where: { id: tagId },
    });
    
    if (!deletedTag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete the tag' });
  }
});

module.exports = router;