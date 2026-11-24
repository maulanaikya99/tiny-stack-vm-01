import{readdirSync,readFileSync,mkdirSync,writeFileSync}from"node:fs";import{join}from"node:path";
const E=new TextEncoder();
function run(p,i){
 const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
 let s=0,c=0,l=0,ip=0,pc=0,st=0;
 const R=e=>[o.slice(0,l),e];
 for(;;){if(st===1e6)return R(10);if(pc<0||pc>=n)return R(9);
  const op=p[pc];let im=0,po=0,pu=0;
  switch(op){
   case 0:return R(0);
   case 1:im=1;pu=1;break;
   case 2:im=4;pu=1;break;
   case 3:po=1;break;
   case 4:po=1;pu=2;break;
   case 5:po=2;pu=2;break;
   case 6:po=2;pu=3;break;
   case 7:po=3;pu=3;break;
   case 0x10:case 0x11:case 0x12:case 0x13:case 0x14:case 0x15:case 0x16:
   case 0x18:case 0x19:case 0x1a:case 0x1c:case 0x1d:case 0x1e:case 0x20:case 0x21:case 0x22:
    po=2;pu=1;break;
   case 0x17:case 0x1b:case 0x40:po=1;pu=1;break;
   case 0x41:po=2;break;
   case 0x30:im=2;break;
   case 0x31:case 0x32:im=2;po=1;break;
   case 0x33:im=2;break;
   case 0x34:break;
   case 0x50:case 0x51:case 0x53:po=1;break;
   case 0x52:pu=1;break;
   default:return R(5);
  }
  if(pc+im>=n)return R(9);
  st++;const nx=pc+1+im;
  if(s<po)return R(2);if(s-po+pu>256)return R(3);
  pc=nx;
  switch(op){
   case 1:D[s++]=(p[nx-1]<<24)>>24;break;
   case 2:D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
   case 3:s--;break;
   case 4:D[s]=D[s-1];s++;break;
   case 5:{const t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;break;}
   case 6:D[s]=D[s-2];s++;break;
   case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
   case 0x17:D[s-1]=-D[s-1]|0;break;
   case 0x1b:D[s-1]=~D[s-1];break;
   case 0x30:case 0x31:case 0x32:{
    const r=((p[nx-2]|p[nx-1]<<8)<<16)>>16;let t=true;
    if(op!==0x30){const v=D[--s];t=op===0x31?v===0:v!==0;}
    if(t)pc=nx+r;break;}
   case 0x33:
    if(c===64)return R(7);
    C[c++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
   case 0x34:if(c===0)return R(8);pc=C[--c];break;
   case 0x40:{const a=D[s-1];if(a<0||a>=256)return R(6);D[s-1]=M[a];break;}
   case 0x41:{const a=D[s-1],v=D[s-2];if(a<0||a>=256)return R(6);s-=2;M[a]=v;break;}
   case 0x50:{const b=E.encode(String(D[s-1]));if(l+b.length>65536)return R(11);s--;o.set(b,l);l+=b.length;break;}
   case 0x51:if(l+1>65536)return R(11);o[l++]=D[--s]&255;break;
   case 0x52:D[s++]=ip<i.length?i[ip++]:-1;break;
   case 0x53:return R(D[--s]&255);
   default:{
    const b=D[s-1],a=D[s-2];let r=0;
    switch(op){
     case 0x10:r=a+b|0;break;
     case 0x11:r=a-b|0;break;
     case 0x12:r=Math.imul(a,b);break;
     case 0x13:if(!b)return R(4);r=a===-2147483648&&b===-1?a:a/b|0;break;
     case 0x14:if(!b)return R(4);r=b===-1?0:a%b|0;break;
     case 0x15:if(!b)return R(4);r=Math.floor((a>>>0)/(b>>>0))|0;break;
     case 0x16:if(!b)return R(4);r=(a>>>0)%(b>>>0)|0;break;
     case 0x18:r=a&b;break;
     case 0x19:r=a|b;break;
     case 0x1a:r=a^b;break;
     case 0x1c:r=a<<(b&31);break;
     case 0x1d:r=a>>(b&31);break;
     case 0x1e:r=a>>>(b&31)|0;break;
     case 0x20:r=a===b?1:0;break;
     case 0x21:r=a<b?1:0;break;
     case 0x22:r=(a>>>0)<(b>>>0)?1:0;break;
    }
    s-=2;D[s++]=r;break;}
  }
 }
}
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const id of readdirSync(I).sort()){
 const[r,e]=run(new Uint8Array(readFileSync(join(I,id,"program.bin"))),new Uint8Array(readFileSync(join(I,id,"input.bin"))));
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,"stdout.bin"),r);
 writeFileSync(join(O,id,"exit.txt"),e+"\n");
}