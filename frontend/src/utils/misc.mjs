

export function upper_bound(arr,reqV){
    let l = 0;
    let r = arr.length;
    let ans = arr.length;
    while(l<=r){
        let mid = (l+r)/2;
        if(arr.at(mid)>reqV){
            ans = mid;
            r = mid-1;
        } else {
            l = mid+1;
        }
    }
    return ans;
}

export function lower_bound(arr, reqV){
    let l = 0;
    let r = arr.length;
    let ans = arr.length;
    while(l<=r){
        let mid = (l+r)/2;
        if(arr.at(mid)>=reqV){
            ans = mid;
            r = mid-1;
        } else {
            l = mid+1;
        }
    }
    return ans;
}

export class CustomArray{ // does not include pop_back

    constructor(type, size = 32){
        this.innerArray = (type==="int")?(new Int32Array(size)):(new Float32Array(size));
        this.innerArraySize = size;
        this.length = size;
        this.l = 0;
        this.r = size-1;
        this.type = type;
    }

    doubleArray(){
        const innerArraySize = this.innerArraySize*2;
        const innerArray = (this.type==="int")?(new Int32Array(innerArraySize)):(new Float32Array(innerArraySize));
        let i = 0;
        while(true){
            innerArray[i] = this.innerArray[this.l];
            i++;
            if(this.l===this.r) break;
            this.l++;
            if(this.l===this.innerArray.length) this.l = 0;
        }
        this.innerArray = innerArray;
        this.innerArraySize = innerArraySize;
        this.l = 0;
        this.r = i-1;
    }

    push_back(value){
        if(this.innerArraySize===this.length){
            this.doubleArray();
        }
        this.r++;
        if(this.r===this.innerArraySize) this.r = 0;
        this.innerArray[this.r] = value;
        this.length++;
    }

    push_front(value){
        if(this.innerArraySize===this.length){
            this.doubleArray();
        }
        this.l--;
        if(this.l<0) this.l = this.innerArraySize-1;
        this.innerArray[this.l] = value;
        this.length++;
    }

    at(index){
        if(index>=this.length) throw new Error("index out of bounds");
        let curI = this.l+index;
        if(curI>=this.innerArraySize) curI-=this.innerArraySize;
        return this.innerArray[curI];
    }
    put(index, value){
        if(index>=this.length) throw new Error("index out of bounds");
        let curI = this.l+index;
        if(curI>=this.innerArraySize) curI-=this.innerArraySize;
        this.innerArray[curI] = value;
    }
}