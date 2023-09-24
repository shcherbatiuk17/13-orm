import Product from './Product';
import Category from './Category';
import Tag from './Tag';
import ProductTag from './ProductTag';

// Products belongsTo Category
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Categories have many Products
Category.hasMany(Product, { foreignKey: 'category_id' });

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: ProductTag, unique: false });

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag, unique: false });

export { Product, Category, Tag, ProductTag };
