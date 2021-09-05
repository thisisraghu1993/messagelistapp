const DateUtils = {};

DateUtils.getUpdatedDays = (date) => {
    let days = (new Date().getTime() - date.getTime())/ (60*60*24*1000)
    if(days / 365 > 0) {
        return Math.round(days / 365) +" years ago";
    } else {
        if(365 - days > 0) {
            return (365 - days) + " days ago"
        } else {
            return (new Date().getTime() - date.getTime())/ (60*60*1000) + " hours ago"
        }
    }
}

export {DateUtils}

export default DateUtils;