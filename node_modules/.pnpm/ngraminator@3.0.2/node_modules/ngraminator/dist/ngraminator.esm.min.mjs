const e=function(e,r){return r.reduce(((r,t)=>[...n(e,t),...r]),[]).sort()},n=function(e,n){return e.slice(n-1).map(((r,t)=>e.slice(t,t+n)))};export{e as ngraminator};
