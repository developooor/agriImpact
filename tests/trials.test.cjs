const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');const html=fs.readFileSync(path.join(__dirname,'../agriimpact-poc.html'),'utf8');
function setup(fail){const data={simulations:[{id:'s1',farmer:'f1'},{id:'s3',farmer:'f3'}],accompaniments:[{id:'r1',farmer:'f1'},{id:'r3',farmer:'f3'}],history:[{id:'h1'}],documents:[{id:'d1'}],requests:[{id:'profileRequest'}]};const sandbox={user:()=>({id:'u1'}),farmerList:()=>[{id:'f1'}],db:{list:k=>data[k],set:(k,v)=>{if(k===fail)return false;data[k]=v;return true}},result:{farmer:'f1'},simulationDraft:{quantity:2}};const a=html.indexOf('function clearFarmerTrials('),b=html.indexOf('function closeProfileMenu(',a);vm.runInNewContext(html.slice(a,b)+';globalThis.clear=clearFarmerTrials;',sandbox);return {sandbox,data}}
test('Effacer seulement les simulations et accompagnements de l’exploitation autorisée',()=>{const {sandbox:s,data:d}=setup();assert.equal(s.clear('f1'),true);assert.equal(d.simulations.length,1);assert.equal(d.simulations[0].farmer,'f3');assert.equal(d.accompaniments[0].farmer,'f3');assert.equal(d.history.length,1);assert.equal(d.documents.length,1);assert.equal(d.requests.length,1);assert.equal(s.result,null)});
test('Refuser la suppression d’une exploitation non autorisée',()=>{const {sandbox:s,data:d}=setup();assert.equal(s.clear('f3'),false);assert.equal(d.simulations.length,2);assert.equal(d.accompaniments.length,2)});
test('Restaurer les simulations si la seconde écriture échoue',()=>{const {sandbox:s,data:d}=setup('accompaniments');assert.equal(s.clear('f1'),false);assert.equal(d.simulations.length,2);assert.equal(d.accompaniments.length,2)});

function resetSetup(failKey){
 const data={simulations:[{id:'s1',farmer:'f1'},{id:'s2',farmer:'f2'}],accompaniments:[{id:'r1',farmer:'f1'},{id:'r2',farmer:'f2'}],history:[{id:'h1'}],documents:[{id:'d1'}],requests:[{id:'profileRequest'}]};
 const sandbox={db:{get:k=>data[k],list:k=>data[k]||[],set:(k,v)=>{if(k===failKey)return false;data[k]=v;return true}}};
 const a=html.indexOf('function resetTrialHistoryOnce('),b=html.indexOf('if(!resetTrialHistoryOnce())',a);
 vm.runInNewContext(html.slice(a,b)+';globalThis.reset=resetTrialHistoryOnce;',sandbox);return {sandbox,data};
}
test('Remise à zéro de livraison : tous les essais, sans toucher aux profils et justificatifs',()=>{
 const {sandbox:s,data:d}=resetSetup();assert.equal(s.reset(),true);assert.equal(d.simulations.length,0);assert.equal(d.accompaniments.length,0);assert.equal(d.history.length,1);assert.equal(d.documents.length,1);assert.equal(d.requests.length,1);
});
test('La remise à zéro unique conserve les nouveaux essais au rechargement',()=>{
 const {sandbox:s,data:d}=resetSetup();s.reset();d.simulations.push({id:'new'});d.accompaniments.push({id:'new-request'});assert.equal(s.reset(),true);assert.equal(d.simulations[0].id,'new');assert.equal(d.accompaniments[0].id,'new-request');
});
for(const key of ['accompaniments','trial_reset_revision'])test('Restaurer les essais si la remise à zéro échoue sur '+key,()=>{
 const {sandbox:s,data:d}=resetSetup(key);assert.equal(s.reset(),false);assert.equal(d.simulations.length,2);assert.equal(d.accompaniments.length,2);assert.equal(d.trial_reset_revision,undefined);
});
