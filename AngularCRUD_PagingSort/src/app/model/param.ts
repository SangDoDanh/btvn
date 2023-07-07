export interface Param {
  productName?: string; 
  minPrice?: number;
  maxPrice?: number;
  minAvailableSince?: string;
  maxAvailableSince?: string;
  status?: string;
  categoryId?: number;
  ord_name?: string;
  ord_by?: string; // ASC/DESC
}
