/**
 * A model for an individual user seller/dealer
 */
export class User {
    _id:any;
    name:any;
    username:any;
    email:Date;
    phone:any;
    location:any;
    is_verified:any;
    profile_pic:any;
    created_at:any;
    verified:any;
    loginhistory:any
    stripe_customer_id:any
    zoho_subscription_id:any

    constructor(object){    
        this._id =object._id;
        this.name=object.name
        this.username = object.name
        this.email = object.emails.find(i => i.default == true);     
        this.phone  = object.phones.find(i => i.default == true);     
        this.location = object.location,
        this.created_at =object.created_at;
        this.profile_pic = ((object.profile_pic) && object.profile_pic.length > 0) ? object.profile_pic : 'assets/img/defaults/default-user.png' 
        this.is_verified = (object.is_verified)?'Yes':'No';
        this.verified = object.verified
        this.loginhistory = object.loginhistory
        this.stripe_customer_id = object.stripe_customer_id
        this.zoho_subscription_id = object.subscription_id
    }
}