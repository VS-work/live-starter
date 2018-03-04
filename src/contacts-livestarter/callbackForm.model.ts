interface CallbackFormInterface {
  fullname: string;
  email: string;
  type: string;
  message: string;
}


export class CallbackForm {
  fullname = '';
  email = '';
  type = '';
  message = '';

  constructor(rqstObj?: CallbackFormInterface) {
    this.fullname = rqstObj ? rqstObj.fullname : '';
    this.email = rqstObj ? rqstObj.email : '';
    this.type = rqstObj ? rqstObj.type : '';
    this.message = rqstObj ? rqstObj.message : '';
  }
};
