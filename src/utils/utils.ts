export const validateUser = (value: string, field: string) => {
    switch(field) {
        case 'firstName': 
            return !(value.length > 0)
        case 'lastName': 
            return !(value.length > 0)
        case 'emailId': 
            return !(value?.length > 0 && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)))
        case 'phone': 
            return !(value?.length === 10 && /^[0-9]+[.]{0,1}[0-9]*$/.test(value) && value.length > 0)
        default:
            return false
    }
}