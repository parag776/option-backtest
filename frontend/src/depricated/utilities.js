class TrieNode{
    constructor(){
        this.isWordEnd = false;
        this.arr = new Array(26);
    }
}

class Trie{
    constructor(values){
        this.mainNode = new TrieNode();
        buildTrie(values);
    }

    buildTrie(words){
        for(let word of words){
            this.addWord(word);
        }
    }
    
    // adding a word

    
    addWord(word){

        function addWordHelper(word, i, curNode){
            if(i===word.length){
                curNode.isWordEnd = true;
                return;
            }

            const letter = word.charCodeAt(i) - 97;

            if(curNode.arr[letter]===undefined) curNode.arr[letter] = new TrieNode();
            curNode = curNode.arr[letter];
            this.addWordHelper(word, i+1, curNode);
        }

        addWordHelper(word, 0, this.mainNode);
    }

    // deleting the word
    
    
    deleteWord(word){

        function deleteWordHelper(word, i, curNode){
            if(i===word.length){
                curNode.isWordEnd = false;
                return;
            }

            const letter = word.charCodeAt(i) - 97;

            if(curNode.arr[letter]===undefined) return;
            curNode = curNode.arr[letter];
            this.deleteWordHelper(word, i+1, curNode);
        }

        deleteWordHelper(word, 0, this.mainNode);
    }

    // checking if exists

    exist(word){

        function existHelper(word, i, curNode){
            if(i===word.length){
                return curNode.isWordEnd;
                
            }

            const letter = word.charCodeAt(i) - 97;

            if(curNode.arr[letter]===undefined) return false;
            curNode = curNode.arr[letter];
            this.existsHelper(word, i+1, curNode);
        }

        return existHelper(word, 0, this.mainNode);
    }

    // returning m words with a particular prefix;

    searchResult(word, wordCount){

        function getParentNode(word, i, curNode){
            if(i===word.length){
                return curNode;
            }

            const letter = word.charCodeAt(i) - 97;

            if(curNode.arr[letter]) return getParentNode(word, i+1, curNode);
            return undefined;
        }

    }


}