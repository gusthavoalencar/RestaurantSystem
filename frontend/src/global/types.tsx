export interface IItem {
    _id: string;
    name: string;
    amount?: number;
    menuCategory: string;
    isMenuItem: boolean;
    isMultiOptions: boolean;
    options: string[];
    menuSections: string[];
    price?: number;
    active: boolean;
}

export interface ISellOrderItem {
    _id: string;
    name: string;
    menuCategory: string;
    quantity: number;
    isMultiOptions: boolean;
    selectedOption?: string;
    price: number;
}

export interface ISellOrder {
    _id: string;
    items: ISellOrderItem[];
    comment?: string;
    status: string;
    type: "delivery" | "dine-in";
    tableNumber?: number;
    address?: string;
    city?: string;
    region?: string;
    country?: string;
    createdAt: string;
    total: number;
}

export interface IItemMenuSection {
    name: string;
    active: boolean;
}