 

 if (String.prototype.toUrl === undefined) { // fix for iOS 3.2

   String.prototype.toUrl = function () {
     if (process && process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
       return this.replace(/http:\/\/((\d{2,3}.){4})/, '/');
     }
     return this;
   };

 }
 Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
   obj['__proto__'] = proto;
   return obj;
 };
