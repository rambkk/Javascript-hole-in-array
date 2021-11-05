# Javascript-hole-in-array
Javascript holes in array, how to iterate, detect, and replace

```JavaScript
  
['a',,'c'] is NOT SAME as ['a',undefined,'c']
  
```

**rambkk - [pluslab.net](https://pluslab.net/blog/) - looking for impossible projects**
#### ((Just fun things to think about. Do drop a line to say hello and let me know what kind of project you are working on, or if help is needed))

Javascript array can have holes, eg:
```JavaScript
arrayA=['a',,'c']
arrayA.length // 3
```
Normal array without hole:
```JavaScript
arrayB=['a',undefined,'c']
arrayB.length // 3
```
Something to think about:
```JavaScript
[].length` // 0
[undefined].length // 1
```
(NOTE: *undefine* is declared as data and takes up storage space that's why the length is 1)

Without investigation, one might think that the second item (index:1) of arrayA is `undefined`.\
Let's check:
```JavaScript
typeof arrayA[1] // "undefined"
arrayA[1] === undefined // true
typeof arrayB[1] // "undefined"
arrayB[1] === undefined // true
```

However, there are subtle differences between the above array and arrayB.
```JavaScript
Object.values(arrayA) // Array [ 0, 2 ]
Object.keys(arrayA) // Array [ "a", "c" ]

Object.keys(arrayB) // Array(3) [ "a", "b", "c" ]
Object.values(arrayB) // Array(3) [ "a", undefined, "c" ]
```
NOTE: Seems like Javascript internally deals with array with holes differently at least in Firefox browser

### Possible problem:
Working with array with holes could be problematic especially when performing array iterations.\
Issues include but not limited to `map`, `reduce`, and `filter` methods.\
eg:

```JavaScript
arrayA.map(v => true) // [ true, <1 empty slot>, true ]
```
(certain platform might display differently, eg: `arrayA.map(v=>true)[ true, empty, true ]`)

Detection? The "in" operator could help check if certain index has data or not.\
eg:
```JavaScript
1 in arrayA // false
1 in arrayB // true
```

## Replacing holes with something else
Here are some codes to fill all holes with data (also in the files section).

Usage:
```JavaAscript
replaceHole(ARRAY,replacement [default: undefined])
```
The data to be used for replacement can be passed as the second parameter.
If replacement data is not specified, holes will be filled with *undefined*.

### Recursive function style:
```JavaScript
function replaceHole(a,s) { return a.length?Array(0 in a?a[0]:x).concat(replaceHole(a.slice(1),s):[]; }
function replaceHole(a,s) { return a.length?[0 in a?a[0]:s, ...replaceHole(a.slice(1),s)]:[]; }
```

### Iteration function style:
```JavaScript
function replaceHole(a,s) { return Array(a.length+1).join('0').split('').map((_,k)=>k in a?a[k]:'/*<empty>*/'); }
function replaceHole(a,s) { return Array(a.length).fill().map((_,k)=>k in a?a[k]:s); }
function replaceHole(a,s) { return [...new Array(a.length)].map((_,k)=>k in a?a[k]:s); }
```

### Classic loop function style:
```JavaScript
function replaceHole(a,s) {
        b=a.map(() => true);
        for(var i=0;i<a.length;i++) {
                if(b[i]) { 
                          b[i]=a[i]; 
                } else {
                          b[i]=s;
                }
        }
        return b;
}
```
```JavaScript
function replaceHole(a,s) {
        var b=[];
        for(var i=0;i<a.length;i++) {
                if(i in a) {
                        b[i]=a[i];
                } else {
                        b[i]=s;
                }
        }
        return b;
}
```

## Example usage:
(NOTE: the default replacement is *undefined*)
```JavaScript
  
arrayTest=['a',,'c',,'e'] // Array(5) [ "a", <1 empty slot>, "c", <1 empty slot>, "e" ]
arrayTestNew=replaceHole(arrayTest) // Array(5) [ "a", undefined, "c", undefined, "e" ]


arrayA=['a',,'b'] // Array(3) [ "a", <1 empty slot>, "b" ]
arrayResult=replaceHole(arrayA,'/*<empty>*/') // Array(3) [ "a", "/*<empty>*/", "b" ]

replaceHole(['a',undefined,,,'b'],'/*<empty>*/') // Array(5) [ "a", undefined, "/*<empty>*/", "/*<empty>*/", "b" ]

replaceHole([,]) // Array [ undefined ]
replaceHole([,],'/*<empty>*/') // Array [ "/*<empty>*/" ]
  
```
**NOTE: a comma ',' followed at the end of array declaration does not create additional item after the comma**

## Creating a hole by removing an item from array
This could be done with `delete` command,\
eg:
```JavaScript
arrayTest=['a','b','c'] // Array(3) [ "a", "b", "c" ]
0 in arrayTest // true
1 in arrayTest // true
2 in arrayTest // true
delete arrayTest[1]
0 in arrayTest // true
1 in arrayTest // false
2 in arrayTest // true
arrayTest[] // Array(3) [ "a", <1 empty slot>, "c" ]

```

## Removing all holes in an array, shifting array indexes
NOTE: item indexes after each hole will be changed
```JavaScript

arrayTest=['a',,'c',,'e'] // Array(5) [ "a", <1 empty slot>, "c", <1 empty slot>, "e" ]
arrayTest.length // 5

arrayTestNew=arrayTest.filter(()=>true) // Array(3) [ "a", "c", "e" ]
arrayTestNew.length // 3

```

(c) Ram Narula You can use this information, kindly do give credit: github rambkk - Ram Narula - pluslab.net  
Please drop a line to say hello and let me know what kind of project you are working on 😄
