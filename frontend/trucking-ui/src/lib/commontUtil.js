/*
DOES NOT EXTENDS FROM REACT COMPONENT
UTIL CLASS FOR DATA PROCESSING
ALL METHODS ARE STATIC
*/
import {ROLE_ADMIN, ROLE_MANAGER, ROLE_OWNER} from "../constants/roles/userRoles";

class CommonUtil {

    static dateToString(date, separator = '-'){
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10){
            day = `0${day}`;
        }
        if (month < 10){
            month = `0${month}`;
        }
        return `${day}${separator}${month}${separator}${year}`;
    }
    

    static dateToDataBaseString(date){
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10){
            day = `0${day}`;
        }
        if (month < 10){
            month = `0${month}`;
        }
        return `${year}-${month}-${day}`;

    }

    static getCorrectDateFromLong(longValue) {
        let d = new Date(longValue);
        let dd = d.getDate();
        if (dd > 0 && dd < 10) {
            dd = `0${dd}`;
        }
        let mm = d.getMonth() + 1;
        if (mm > 0 && mm < 10) {
            mm = `0${mm}`;
        }
        let yyyy = d.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }

    static isDateCorrect(date) {
        date = date.toString();
        let regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
        return date.match(regex)
    }

    static moveElementInArray(array, from, to) {
        array.splice(to, 0, array.splice(from, 1)[0]);
    };

    static dateFromArray(arr){//yyyy,mm,dd
        return new Date(`${arr[1]}/${arr[2]}/${arr[0]}`)
    }

    static camelize(str) {
        return str.split(' ').map(function(word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join('');
    }

    static arePathsEqual(pathA, pathB) {
        if (pathA === pathB) {
            return true;
        }
        if (!Array.isArray(pathA) || !Array.isArray(pathB)) {
            return false;
        }
        if (pathA.length !== pathB.length) {
            return false;
        }
        for (let i = 0; i < pathA.length; ++i) {
            if (pathA[i] === pathB[i]) {
                continue;
            }
            if (
                !this.__isValidLatLng(pathA[i]) ||
                !this.__isValidLatLng(pathB[i])
            ) {
                return false;
            }
            if (
                pathB[i].lat !== pathA[i].lat ||
                pathB[i].lng !== pathA[i].lng
            ) {
                return false;
            }
        }
        return true;
    }

    static __isValidLatLng(elem) {
        return (
            elem !== null &&
            typeof elem === 'object' &&
            elem.hasOwnProperty('lat') &&
            elem.hasOwnProperty('lng')
        );
    }

    static getStringFromUnknownObject(obj) {
        return Array.isArray(obj) ? obj.join('') : obj;
    }

    static getLocalDate(date, locale = "ru"){
        return new Date(date).toLocaleDateString(locale);
    }

    static getCurrentUserRole(){
        return localStorage.getItem('role');
    }

    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}

export default CommonUtil;