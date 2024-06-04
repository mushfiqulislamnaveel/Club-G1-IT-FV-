import React from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { casing } from '../data/casing';
import { motherboards } from '../data/motherboard';
import { graphicsCards } from '../data/graphicsCard';
import { monitors } from '../data/monitor';
import { laptops } from '../data/laptop';
import { cpuCoolers } from '../data/cpuCooler';

const categoryData = {
    'casing': casing,
    'motherboard': motherboards,
    'graphics-card': graphicsCards,
    'monitor': monitors,
    'laptop': laptops,
    'cpu-cooler': cpuCoolers
};

const Category = () => {
    const { categoryName } = useParams();
    const categoryProducts = categoryData[categoryName] || [];

    return (
        <div>
            <h2>Product Category: {categoryName.charAt(0).toUpperCase() + categoryName.slice(1).replace('-', ' ')}</h2>
            <ProductList products={categoryProducts} />
        </div>
    );
}

export default Category;
