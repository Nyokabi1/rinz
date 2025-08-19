import Product from '../models/Product.js';

const addProduct = async (req, res) => {
    try {
        const { name, description, sizes, category } = req.body;

        if (!category) {
            return res.status(400).json({ message: 'Product category is required' });
        }

        const parsedSizes = JSON.parse(sizes); // ✅ because sizes was sent as JSON string

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const product = new Product({  // ✅ Capitalized model name
            name,
            description,
            imageUrl,
            sizes: parsedSizes,
            category,
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error('Error in addProduct:', err);
        res.status(500).json({ message: err.message });
    }
};


const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const poductController = {
    addProduct,
    getProducts,
    deleteProduct,
};

export default poductController;
