interface Data {
    email : string,
    password : string,
    confirmPassword : string,
    handle : string,
}


 const isEmpty = (string: string) => {
    if (string.trim() === '') {
        return true
    } else {
        return false
    }
};

 const isEmail = (email: string) => {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regExp)){
        return true;
    } else { 
        return false;
    }
};

const isValidHandle = (handle:string) => {
    const regExp = /^[a-zA-Z0-9 ]*$/
    if (handle.match(regExp)) {
        return true;
    } else {
        return false;
    }
}

const isHandleLengthShort = (handle: string) => {
    if(handle.length < 2 ){
        return true;
    } else {
        return false;
    }
}

const isHandleLengthLong = (handle: string) => {
    if(handle.length > 20) {
        return true;
    } else {
        return false;
    }
}

export const removeHandleExtraSpaces = (data : Data) => {

    const newHandle = data.handle.trim().replace(/\s\s+/g, ' ');

    return {
        ...data,
        handle : newHandle
    }
}

export const validateSignUpData = (data: any) => {

    const errors : any = {};

    if(isEmpty(data.email)) {
        errors.email = 'Email must no be empty'
    } else if(!isEmail(data.email)) {
        errors.email = 'Please provide a valid email address'
    }

    if(isEmpty(data.password)) {
        errors.password = 'Must not be empty'
    }

    if(data.password !== data.confirmPassword) {
        errors.confirmPassword = 'The password does not match'
    }

    if(isEmpty(data.handle)) {
        errors.handle = 'Must not be empty'

    } else if (!isValidHandle(data.handle)) {
        errors.handle = "Please don't use especial characters like ! @ # $ % ^ & *"

    } else if(isHandleLengthLong(data.handle)) {
        errors.handle = 'The username can only have maximum 20 characters'

    } else if (isHandleLengthShort(data.handle)) {
        errors.handle = 'Please write a name with at least 2 characters '
    } 

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false 
    }
};

export const validateLoginData = (data: any) => {
    const errors: any = {};

    if(isEmpty(data.email)) errors.email = 'Can not be empty';
    if(isEmpty(data.password)) errors.password = 'Can not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false 
    }
};

export const reduceUserDetails = (reqBody: any) => {
    const userDetails : any = {}
    
    if(!isEmpty(reqBody.bio.trim())) userDetails.bio = reqBody.bio
    if(!isEmpty(reqBody.website.trim())){

        if(reqBody.website.trim().substring(0, 4) !== 'http'){
            userDetails.website = `http://${reqBody.website.trim()}`
        } else userDetails.website = reqBody.website; 
    }
    if(!isEmpty(reqBody.location.trim())) userDetails.location = reqBody.location
    

    return userDetails;
}