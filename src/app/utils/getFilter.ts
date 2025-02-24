export const getFilter = (searchTerm: string = "", minPrice?: number, maxPrice?: number, brand?: string, category?: string, inStock?: boolean) => {
    const filter: any = {};

    if (searchTerm) {
        filter.$or = [{ name: { $regex: searchTerm, $options: "i" } }, { brand: { $regex: searchTerm, $options: "i" } }, { category: { $regex: searchTerm, $options: "i" } }];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
        filter.price = {};
        if (minPrice !== undefined) filter.price.$gte = minPrice; // Greater than or equal to minPrice
        if (maxPrice !== undefined) filter.price.$lte = maxPrice; // Less than or equal to maxPrice
    }

    if (brand) {
        filter.brand = { $regex: brand, $options: "i" };
    }

    if (category) {
        filter.category = { $regex: category, $options: "i" };
    }

    if (inStock !== undefined) {
        filter.inStock = inStock;
    }

    return filter;
};
