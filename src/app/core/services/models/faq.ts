/**
 * A model for an individual corporate employee
 */
export class Faq {
    // car_id:any;
    id:any;
    question:any;
    answer:any;
    created_at:any




constructor(object){    
    this.id= object._id
    this.question = object.question
    this.answer = object.answer 
    this.created_at =object.created_at;
}
}