function l(e,o,u,a,i,n=300){let c="";for(let t=0;t<=n;t++){const f=o+(u-o)*t/n,r=a(f),$=i(e(f));c+=t===0?`M ${r} ${$}`:` L ${r} ${$}`}return c}export{l as f};
