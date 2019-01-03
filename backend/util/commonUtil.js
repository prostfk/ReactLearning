class CommonUtil{

    static reformatDate(dateStr){//dd-mm-yyyy -> yyyy-mm-dd
        let arr = dateStr.split('-');
        return `${arr[2]}-${arr[1]}-${arr[0]}`;
    }

}

module.exports = CommonUtil;