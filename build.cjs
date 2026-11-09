const fs=require('node:fs'),path=require('node:path');
const root=__dirname,out=path.join(root,'dist');
fs.mkdirSync(out,{recursive:true});
const files=['index.html','lp.html','admin.html','entrance.css','entrance.js','site.css','site.js','cube.js','admin.css','admin.js','store.js','seed.js'];
for(const file of files){let data=fs.readFileSync(path.join(root,file));if(file.endsWith('.html'))data=data.toString().replaceAll('./node_modules/three/','./vendor/three/');fs.writeFileSync(path.join(out,file),data);}
for(const folder of ['assets','docs','vendor/three/build','vendor/three/examples/jsm/geometries'])fs.mkdirSync(path.join(out,folder),{recursive:true});
for(const file of fs.readdirSync(path.join(root,'assets')).filter(f=>!f.startsWith('source-')))fs.copyFileSync(path.join(root,'assets',file),path.join(out,'assets',file));
for(const file of ['PLANO.md','source-inventory.json'])fs.copyFileSync(path.join(root,'docs',file),path.join(out,'docs',file));
for(const file of ['build/three.module.js','build/three.core.js','examples/jsm/geometries/RoundedBoxGeometry.js','LICENSE'])fs.copyFileSync(path.join(root,'node_modules/three',file),path.join(out,'vendor/three',file));
fs.writeFileSync(path.join(out,'.nojekyll'),'');
console.log('Static site ready: dist/');
