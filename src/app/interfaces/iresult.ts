export interface Iresult {

    order_no: string;
    Order_date: string;
    cust_id: number;
    Amount: number;
    Items: Iitem[];
}

export interface Iitem {
    Item_Id?: number;
    Item_name: string;
    Item_Unit: string;
    Item_Qty: number;
    Item_Rate: number;
    Item_Value: number;
}
