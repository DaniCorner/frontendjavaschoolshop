export class Product {
    public isEditing: boolean = false;
    similarMovies: Product[];


    constructor(
        public title: string,
        public parameters: string,
        public imageURL: string,
        public price: number,
        public categoryId: number,
        public quantityInStock: number,
        public weight: number,
        public volume: number,     
        public id?: string,
    ) {}
    
}