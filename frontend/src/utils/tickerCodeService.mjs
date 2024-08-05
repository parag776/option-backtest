// fix it
// function base10to62(word){
//     let ans = "";
//     while(word>0){
        
//         let digit = word%62n;
//         word -= digit;
//         word/=62n;

//         let char;
//         if(digit<10){
//             char = digit+48n;
// 		} else if(digit<36){
//             char = digit+55n;
// 		} else{
//             char = digit+61n
// 		}

//         char = String.fromCharCode(Number(char));
// 		ans += char;
//     }

//     let mainAns = "";
//     for(let i=ans.length-1;i>=0;i--){
//         mainAns+=ans[i];
//     }
//     return mainAns;
// }

// function base62to10(word){
//     let ans = 0n;
//     console.log(word)
//     for(let char of word){
//         let key = BigInt(char.charCodeAt(0));
//         ans*=62n;
//         if(key<58){
//             ans+=(key-48n);
//         } else if(key<91){
//             ans+=(key-55n);
//         } else {
//             ans+=key-61n;
//         }
//     }
//     return ans;
// }

// function combine(n, r){
//     if(n<r) return 0n;
//     let num = 1n;
//     let denom = 1n;
//     while(r>0){
//         num*=n;
//         denom*=r;
//         n--;
//         r--;
//     }
//     return num/denom;
// }

// export function codeToTickerPositions(code, TotalitemCount){
    
//     code = base62to10(code);
//     let n = BigInt(TotalitemCount);

//     // checking how many items--->

//     let num = 1n;
//     let denom = 1n;
//     let j = 1n;

//     let itemCount;

//     while(true){
//         num*=n;
//         denom*=j;
//         let count = num/denom;
//         if(code<count){
//             itemCount = j;
//             break;
//         } else {
//             code-=count;
//         }
//         j++;
//         n--;
//     }

//     n = BigInt(TotalitemCount);

//     const items = [];
//     let start = 0n;
//     while(itemCount){
//         let l = 0n;
//         let r = n-itemCount-start;
//         let range = r-l+itemCount;
//         let rangeWays = combine(range, itemCount);
//         let curAns = 0n;
//         let lways = 0n ;

//         while(l<=r){
//             let mid = (l+r)/2n;
//             let rWays = combine(range - 1n - mid, itemCount);
//             let ways = rangeWays - rWays;
//             if(code<ways){
//                 r = mid-1n;
//             } else {
//                 lways = ways;
//                 curAns = mid+1n;
//                 l = mid+1n;
//             }
//         }
//         code-=lways;
//         items.push(curAns);
//         start += curAns+1n;
//         itemCount--;
//     }
//     for(let i = 1;i<items.length;i++){
//         items[i] = items[i]+items[i-1]+1n;
//     }
//     for(let i=0;i<items.length;i++){
//         items[i] = Number(items[i]);
//     }

//     const signArr = new Array(items.length);

//     for(let i=0;i<items.length;i++){
//         signArr[i] = items[i]&1;
//         items[i]>>=1;
//     }

//     // creating signArr (1 if positive and 0 if negative)
//     return [items, signArr];

// }

// export function tickerPositionsToCode(arr, signArr, itemCount){
    
//     for(let i=0;i<arr.length;i++){
//         arr[i] = (arr[i]<<1)+signArr[i];
//     }

//     itemCount = BigInt(itemCount);
//     let tempItemCount = itemCount;
//     let n = BigInt(arr.length);
//     let code = 0n;

//     let tempArr = arr.slice();

//     for(let i=arr.length-1;i>0;i--){
//         tempArr[i] = tempArr[i] - tempArr[i-1];
//     }
//     for(let i=1;i<arr.length;i++){
//         tempArr[i]--;
//     }

//     for(let i=0;i<tempArr.length;i++){
//         code += combine(itemCount, n) - combine(itemCount-BigInt(tempArr[i]), n);
//         n--;
//         itemCount-=(BigInt(tempArr[i])+1n);
//     }

//     let num = 1n;
//     let denom = 1n;

//     for(let i=1n;i<tempArr.length;i++,tempItemCount--){
//         num*=tempItemCount;
//         denom*=i;
//         code+=(num/denom);
//     }
//     code = base10to62(code);
//     return code;
// }
