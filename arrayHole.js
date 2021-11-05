/* Javascript arrayHole
 * using ideas from https://github.com/rambkk/Javascript-hole-in-array
 *
 * arrayHole (version 0.11 - initial release)
 *
 * Syntax:
 *
 *      replaceHole(ARRAY,replacement [default: undefined])
 *
 * The data to be used for replacement can be passed as the second parameter. 
 * If replacement is not specified, undefined will be used.
 * 
 * Requirement: might require Javascript ES6
 * 
 * (c) Ram Narula You can use this information, kindly do give credit: github rambkk - Ram Narula - pluslab.net
 * Please drop a line to say hello and let me know what kind of project you are working on :-)
 */

/********************************/
/* Recusive function style:     */ 
/********************************/

function replaceHole(a,s) { return a.length?Array(0 in a?a[0]:x).concat(replaceHole(a.slice(1),s):[]; }
function replaceHole(a,s) { return a.length?[0 in a?a[0]:s, ...replaceHole(a.slice(1),s)]:[]; }


/********************************/
/* Iteration function style:    */
/********************************/

function replaceHole(a,s) { return Array(a.length+1).join('0').split('').map((_,k)=>k in a?a[k]:s); }
function replaceHole(a,s) { return Array(a.length).fill().map((_,k)=>k in a?a[k]:s); }
function replaceHole(a,s) { return [...new Array(a.length)].map((_,k)=>k in a?a[k]:s); }


/********************************/
/* Classic loop function style: */
/********************************/

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

