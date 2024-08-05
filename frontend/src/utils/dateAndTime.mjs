const minutesInADay = 60*24;

export const parseTime = (time) => {
    return Number(time.substring(0, 2)) * 60 + Number(time.substring(3, 5));
};

export const inverseParseTime = (time) =>{
    time%=minutesInADay;
    time = (time+minutesInADay)%minutesInADay;

    let hour = String(Math.floor(time/60));
    if(hour<10) hour = "0"+hour;
    let minute = String(time%60);
    if(minute<10) minute = "0"+minute;
    return hour+":"+minute;
}

export const incrementTime = (time) =>{
    return inverseParseTime(parseTime(time)+1);
}

export const decrementTime = (time) =>{
    return inverseParseTime(parseTime(time)-1);
}
