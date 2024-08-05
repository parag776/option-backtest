function customSubstr(str, s, e, ignore){
    let newString = "";
    for(let i=s;i<e;i++){
        if(ignore.includes(str[i])) continue;
        newString+=(str[i]);
    }
    return newString;
}

export default function (data, ignoreCharaters = ['"'], isHeader=1) {
    let result = new Array(data.length-1);
    const dataArray = [];
    let startIndex = 0;
    for(let i=0;i<data.length;i++){
        if(data[i]==="\n"){
            dataArray.push(data.substring(startIndex, i));
            startIndex = i+1;
        }
    }
    if(isHeader){
        const n = dataArray.length;

        const headerValues = [];
        let firstLetter = 0;
        for(let i=0;i<dataArray[0].length;i++){
            if(dataArray[0][i]===","){
                headerValues.push(customSubstr(dataArray[0], firstLetter, i, ignoreCharaters));
                firstLetter = i+1;
            }
        }
        headerValues.push(customSubstr(dataArray[0], firstLetter, dataArray[0].length, ignoreCharaters))

        for(let i=1;i<n;i++){
            let firstLetter = 0;
            let wordCount = 0;
            const curObj = {};
            for(let j=0;j<dataArray[i].length;j++){
                
                if(dataArray[i][j]===","){
                    curObj[headerValues[wordCount]] = customSubstr(dataArray[i], firstLetter, j, ignoreCharaters);
                    firstLetter = j+1;
                    wordCount++;
                }
            }
            curObj[headerValues[wordCount]] = customSubstr(dataArray[i], firstLetter, dataArray[i].length, ignoreCharaters);
            result[i-1] = curObj;
        }
        
    } else {
        // implement if needed
    }
    return result;
    
    
}