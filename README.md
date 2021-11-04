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
arrayA.length` => 3
```
Normal array without hole:
```JavaScript
arrayB=['a',undefined,'c']
arrayB.length` => 3
```
Something to think about:
```JavaScript
[].length` => 0
[undefined].length` => 1
```
(NOTE: *undefine* is declared as data with a special value)

Without investigation, one might think that the second item (index:1) of arrayA is `undefined`.\
Let's check:\
```JavaScript
typeof arrayA[1] => "undefined"
arrayA[1] === undefined` => true
typeof arrayB[1]` => `"undefined"
arrayB[1] === undefined` => true
```

However, there are subtle differences between the above array and arrayB.\
```JavaScript
Object.values(arrayA) => Array [ 0, 2 ]
Object.keys(arrayA) => Array [ "a", "c" ]

Object.keys(arrayB) => Array(3) [ "a", "b", "c" ]
Object.values(arrayB) => Array(3) [ "a", undefined, "c" ]
```
NOTE: Seems like Javascript internally deals with array with holes differently at least in Firefox browser

### Possible problem:
Working with array with holes could be problematic especially when performing array iterations.\
Issues include but not limited to `map`, `reduce`, and `filter` methods.\
eg:

```JavaScript
arrayA.map(v => true) => [ true, <1 empty slot>, true ]
```
(certain platform might display differently, eg: `arrayA.map(v=>true)[ true, empty, true ]`)

Detection? The "in" operator could help check if certain index has data or not.\
eg:
```JavaScript
1 in arrayA => false
1 in arrayB => true
```

Here are some codes to replace all holes with a certain string (also in the files section).

### Recursive function style:
```JavaScript
function replaceHole(a) { return a.length?Array(0 in a?a[0]:'/*<empty>*/').concat(replaceHole(a.slice(1)):[]; }
function replaceHole(a,s='/*<empty>*/') { return a.length?[0 in a?a[0]:s, ...replaceHole(a.slice(1))]:[]; }
```

### Iteration function style:
```JavaScript
function replaceHole(a) { return Array(a.length+1).join('0').split('').map((_,k)=>k in a?a[k]:'/*<empty>*/'); }
function replaceHole(a,s='/*<empty>*/') { return Array(a.length).fill().map((_,k)=>k in a?a[k]:s); }
function replaceHole(a,s='/*<empty>*/') { return [...new Array(a.length)].map((_,k)=>k in a?a[k]:s); }
```

### Classic loop function style:\
```JavaScript
function replaceHole(a) {
        b=a.map(v => true);
        for(var i=0;i<a.length;i++) {
                if(!b[i]) { b[i]='/*<empty>*/';}
        }
        return b;
}
```
```JavaScript
function replaceHole(a) {
        var b=[];
        for(var i=0;i<a.length;i++) {
                if(i in a) {
                        b[i]=a[i];
                } else {
                        b[i]='/*<empty>*/';
                }
        }
        return b;
}
```



(c) Ram Narula You can use this information, kindly do give credit: github rambkk - Ram Narula - pluslab.net  
Please drop a line to say hello and let me know what kind of project you are working on 😄
