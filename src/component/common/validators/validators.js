export const required = value => {
    return !value ? 'Pole obowązkowe': undefined 
}

export const emailValidator = value => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
       return "Wprowadź poprawy e-mail"
    }
}   

export const minLengthCreator = (min) => (value) => {
    if(value.length < min){
        return `Długość hasła nie może być mniejsza niż ${min}`
    }
    return undefined
}