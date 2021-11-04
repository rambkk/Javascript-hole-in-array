/* Javascript arrayHole
 * using ideas from https://github.com/rambkk/Javascript-hole-in-array
 *
 * arrayHole (version 0.11 - initial release)
 * 
 * Requirement: might require Javascript ES6
 * 
 * (c) Ram Narula You can use this information, kindly do give credit: github rambkk - Ram Narula - pluslab.net
 * Please drop a line to say hello and let me know what kind of project you are working on :-)
 */

/********************************/
/* Recusive function style:     */ 
/********************************/

function replaceHoleR1(a) { return a.length?Array(0 in a?a[0]:'/*<empty>*/').concat(replaceEmpty(a.slice(1)):[]; }
function replaceHoleR2(a,s='/*<empty>*/') { return a.length?[0 in a?a[0]:s, ...replaceEmpty(a.slice(1))]:[]; }


/********************************/
/* Iteration function style:    */
/********************************/
function replaceHoleI1(a) { return Array(a.length+1).join('0').split('').map((_,k)=>k in a?a[k]:'/*<empty>*/'); }
function replaceHoleI2(a,s='/*<empty>*/') { return Array(a.length).fill().map((_,k)=>k in a?a[k]:s); }
function replaceHoleI3(a,s='/*<empty>*/') { return [...new Array(a.length)].map((_,k)=>k in a?a[k]:s); }

/********************************/
/* Classic loop function style: */
/********************************/

function replaceHoleC1(a) {
        b=a.map(v => true);
        for(var i=0;i<a.length;i++) {
                if(!b[i]) { b[i]='/*<empty>*/';}
        }
        return b;
}

function replaceHoleC2(a) {
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
