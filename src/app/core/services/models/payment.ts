/**
 * A model for an payments
 */
export class Payment {
    // car_id:any;
    transaction_id:any;
    transaction_status:any;
    transaction_amount:any;
    seller_details:any;
    car_details:any;
    dealer_details:any;
    vin_number:any;
    
    created_at:any



    constructor(object){    
    
        this.transaction_id=object.transaction_id;
        this.transaction_status=object.transaction_status;
        this.transaction_amount=object.transaction_amount;
        this.seller_details=object.seller_details;
        this.car_details=object.car_details;
        this.dealer_details=object.dealer_details;
        this.vin_number=object.vin_number;
        
        this.created_at =object.created_at;
       
    

    }
}