/**
 * A model for an individual corporate employee
 */
export class Document {
    // car_id:any;
    id:any;
    originalname:any;
    mimetype:any;
    location:any;
    created_at:any




constructor(object){    
    this.id= object._id
    this.originalname = object.originalname
    this.mimetype = object.mimetype 
    this.location = object.location 
    this.created_at =object.created_at;
}
}