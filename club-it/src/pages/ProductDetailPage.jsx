import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import { casing } from '../data/casing';
import { motherboards } from '../data/motherboard';
import { graphicsCards } from '../data/graphicsCard';
import { monitors } from '../data/monitor';
import { laptops } from '../data/laptop';
import { cpuCoolers } from '../data/cpuCooler';

const allProducts = [...casing, ...motherboards, ...graphicsCards, ...monitors, ...laptops, ...cpuCoolers];

const ProductDetailPage = () => {
    const { productId } = useParams();
    const product = allProducts.find(p => p.id === productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <ProductDetail product={product} />
    );
}

export default ProductDetailPage;
