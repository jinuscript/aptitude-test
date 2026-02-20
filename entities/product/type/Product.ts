import { type Code } from "@/shared/types/Code";

export interface Product {
    id: number;
    name: string;
    code: Code;
    price: number;
    totalSection: number;
}