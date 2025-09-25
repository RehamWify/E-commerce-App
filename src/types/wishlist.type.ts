export type Wishlist = WishlistProduct[]
export interface WishlistProduct {
    _id: string;
    title: string;
    description: string;
    price: number;
    imageCover: string;
    category: {
        _id: string;
        name: string;
        slug: string;
        image: string;
    };
    brand: {
        _id: string;
        name: string;
        slug: string;
        image: string;
    };
    ratingsAverage: number;
    ratingsQuantity: number;
}

export interface WishlistResponse {
    status: string;
    count: number;
    data: {
        wishlist: WishlistProduct[];
    };
}