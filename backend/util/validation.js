class ValidationUtil {

    static validateClient(client){
        let {name, type} = client;
        return this.validateStringForLength(name, 2, 20) && this.validateStringForLength(type,4, 50);
    }

    static validateOrder(order) {
        let {name, client, status, sender, receiver, driver, auto, consignment} = order;
        console.log(this.validateForNumber(client));
        return this.validateStringForLength(name, 2, 11) &&
            this.validateForNumber(client) && this.validateForNumber(status) &&
            this.validateForNumber(sender) && this.validateForNumber(receiver) &&
            this.validateForNumber(driver) && this.validateForNumber(auto) &&
            this.validateForArray(consignment);
    }

    static validateAuto(auto) {
        let {name, fuel, type, number} = auto;
        return this.validateStringForLength(name, 3, 49) && this.validateStringForLength(type, 5, 19) &&
            this.validateStringForLength(number, 3, 20) && this.validateNumberInTheRage(fuel, 2, 50);
    }

    static validateUser(user) {
        let {username, email, role, password, birth_day, name, surname, passport} = user;
        return this.validateEmailForPattern(email) && this.validateStringForLength(username, 5, 20)
        && this.validateStringForLength(password, 6, 20) && this.validateStringForLength(name, 2, 40)
        && this.validateStringForLength(surname, 4, 40) && role === 'ROLE_DRIVER' ?
            this.validateStringForLength(passport, 5, 20) : true;
    }

    static validateForArray(arr){
        return Array.isArray(arr);
    }

    static validateStringForLength(string, min, max) {
        return string !== undefined && string.toString().length >= min && string.toString().length <= max;
    }

    static validateDateForNotThisYear(date) {
        let b = this.validateDateToPattern(date);
        if (b) {
            date = Array.isArray(date) ? date.join('') : date;
            return Number(date.split('/')[2]) < new Date().getFullYear();
        } else {
            return false;
        }
    }

    static validateDate(date) {
        return date < new Date().getTime();
    }

    static validateForNumber(string) {
        return /^-?[\d.]+(?:e-?\d+)?$/.test(string)
    }

    static validateDateToPattern(date) { //pattern = dd/MM/yyyy
        return /^([0-2][0-9]|(3)[0-1])(\/)(((0)[1-9])|((1)[0-2]))(\/)\d{4}$/.test(date.toString());
    }

    static validateNumberInTheRage(number, min, max) {
        return number >= min && number <= max;
    }

    static validateEmailForPattern(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    static reformatDateFromInput(oldFormatDate) {//yyyy-MM-dd
        let split = oldFormatDate.split('-');
        return `${split[2]}/${split[1]}/${split[0]}`
    }

    static getDateFromArrayYyyyMmDd(arr) {
        let date = `${arr[2]}-${arr[1]}-${arr[0]}`;
        return ValidationUtil.reformatDateToDateObject(date);
    }

    static reformatDateToDateObject(dateStr) {//dd-MM-yyyy
        let dateArr = dateStr.split('/');
        return new Date(`${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`);
    }

    static reformatFromDateToString(date) {
        let day = date.getDate().toString().length > 1 ? date.getDate() : `0${date.getDate().toString()}`;
        return day + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }


}


module.exports = ValidationUtil;