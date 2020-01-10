/**
 * A model for an advertisement
 */
export class Ads {
    _id:any;
    title:any;
    description:any;
    link:Date;
    advertisement_image:any;   
    created_at:any

    constructor(object){  
        this._id = object._id
        this.title = object.title
        this.description = object.description
        this.link = object.link
        this.advertisement_image = ((object.advertisement_pic) && object.advertisement_pic.length > 0) ? object.advertisement_pic: 'assets/img/defaults/no_advertisement.png' 

        this.created_at =object.created_at;   

    }
}