const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');const vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../agriimpact-poc.html'),'utf8');const start=html.indexOf('const BANK_REGIONS=');const end=html.indexOf('function bank(){',start);assert(start>=0&&end>start);const sandbox={farmer:()=>({region:'Fès-Meknès'})};vm.runInNewContext(html.slice(start,end)+';globalThis.api={projectBankGroup,bankRegionValue,bankRegionOptions,BANK_GROUPS,rankedProjects,externalCompetition,bankFamilies,filterBankProjects,setRegion:r=>bankRegion=r};',sandbox);const api=sandbox.api;
test('Classer chaque famille existante dans sa filière',()=>{for(const [family,group] of [['Arboriculture','trees'],['Céréales','cereals'],['Fourrages','forage']])assert.equal(api.projectBankGroup({family,category:'Plantations'}),group);for(const family of ['Bovins','Petits ruminants','Ruches','Volailles'])assert.equal(api.projectBankGroup({family,category:'Élevage'}),'animals')});
test('Ne pas inventer une conduite plein champ ou sous serre',()=>{assert.equal(api.projectBankGroup({family:'Maraîchage',category:'Plantations'}),'market-unspecified');assert.equal(api.projectBankGroup({family:'Maraîchage',category:'Plantations',bankGroup:'market-greenhouse'}),'market-greenhouse')});
test('Les projets importés non classés restent accessibles',()=>{assert.equal(api.projectBankGroup({family:'Inconnue',category:'Plantations'}),'other')});
test('Région préremplie depuis le profil et modifiable indépendamment',()=>{assert.equal(api.bankRegionValue(),'Fès-Meknès');api.setRegion('Souss-Massa');assert.equal(api.bankRegionValue(),'Souss-Massa');assert.equal(api.bankRegionOptions().filter(r=>r==='Souss-Massa').length,1);api.setRegion('');assert.equal(api.bankRegionValue(),'Fès-Meknès')});

test('Priorité fondée sur le profil consulté, sans inventer une aptitude régionale',()=>{const ps=[{id:'p1',name:'Pommier',family:'Arboriculture',mode:'Irrigué'},{id:'p4',name:'Olivier',family:'Arboriculture',mode:'À préciser'},{id:'p10',name:'Bovins laitiers',family:'Bovins',mode:'Étable'}];sandbox.db={list:()=>ps};const h=[{farmer:'f1',activity:'Pommier'},{farmer:'f2',activity:'Bovins laitiers'}];assert.equal(api.rankedProjects(ps,{id:'f1',materiel:'réseau goutte-à-goutte'},h)[0].project.id,'p4');assert.equal(api.rankedProjects(ps,{id:'f2'},h)[0].project.id,'p10');assert.match(api.rankedProjects(ps,{id:'f1'},h)[0].reasons[0],/prioritaire pour Youssef/)});
test('La concurrence provient de la source fournie, sans inventer de valeur',()=>{assert.equal(api.externalCompetition({}, {id:'p4'}).value,'Non disponible');const c=api.externalCompetition({marketSignals:{p4:{value:'12 demandes',source:'SI partenaire',date:'2026-11-12'}}},{id:'p4'});assert.equal(c.value,'12 demandes');assert.equal(c.source,'SI partenaire');assert.equal(c.date,'2026-11-12')});

test('Combiner type, sous-groupe et recherche sans mélanger les filières',()=>{
 const ps=[{id:'apple',name:'Pommier',family:'Arboriculture',category:'Plantations'},{id:'olive',name:'Olivier',family:'Arboriculture',category:'Plantations'},{id:'alfalfa',name:'Luzerne',family:'Fourrages',category:'Plantations'},{id:'cow',name:'Bovins laitiers',family:'Bovins',category:'Élevage'}];
 assert.equal(api.filterBankProjects(ps,'Plantations','Arboriculture',' OLIV ')[0].id,'olive');
 assert.equal(api.filterBankProjects(ps,'Élevage','Arboriculture').length,0);
 assert.equal(api.filterBankProjects(ps,'Tous','','fourrages')[0].id,'alfalfa');
 assert.equal(api.filterBankProjects(ps,'Élevage','','LAITIERS')[0].id,'cow');
});
test('Sous-groupes issus du catalogue et du type choisi, y compris après import',()=>{
 const ps=[{family:'Arboriculture',category:'Plantations'},{family:'Arboriculture',category:'Plantations'},{family:'Fourrages',category:'Plantations'},{family:'Bovins',category:'Élevage'},{family:'Aquaculture',category:'Élevage'}];
 assert.deepEqual(Array.from(api.bankFamilies(ps,'Plantations')),['Arboriculture','Fourrages']);
 assert.deepEqual(Array.from(api.bankFamilies(ps,'Élevage')),['Aquaculture','Bovins']);
});
