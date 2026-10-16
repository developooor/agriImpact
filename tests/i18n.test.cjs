// Vérifie les traductions et la stabilité des nombres, sans dépendance navigateur.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../agriimpact-poc.html'),'utf8');
const start=html.indexOf('const DARIJA=');
const end=html.indexOf('\nfunction languageControl(',start);
assert.ok(start>=0&&end>start,'Le module de traduction doit être présent');
const sandbox={currentLanguage:'ary'};
vm.runInNewContext(html.slice(start,end)+';globalThis.api={localize,DARIJA};',sandbox);
const {localize}=sandbox.api;
test('Connexion et demande d’accompagnement lisibles en darija',()=>{
 assert.equal(localize('Se connecter'),'دخول للحساب');
 assert.equal(localize('Demander un accompagnement'),'طلب المواكبة');
 assert.equal(localize('Prise en charge'),'المستشار تكلف بالطلب');
});
test('Le français est restitué sans modifier espaces ni ponctuation',()=>{
 sandbox.currentLanguage='fr';const input='  Coût : 17 000 MAD/ha · 60 %\n';assert.equal(localize(input),input);sandbox.currentLanguage='ary';
});
test('Les nombres et seuils FDA ne changent pas à la traduction',()=>{
 for(const text of ['Densité inférieure au minimum de 400 plants/ha','min(60 % × 100000 MAD, 17 000 MAD/ha × 3.5 ha)','Date au-delà de l’échéance annoncée au 31/12/2026'])assert.deepEqual(localize(text).match(/[0-9]+(?:[.,][0-9]+)*/g),text.match(/[0-9]+(?:[.,][0-9]+)*/g));
});
test('Noms propres, email et référence restent intacts',()=>{
 for(const text of ['Youssef El Amrani · Fès-Meknès','salma.bennani@example.invalid','id-20261016-abc123'])assert.equal(localize(text),text);
});
test('Une traduction partielle ne corrompt pas le mot composé goutte-à-goutte',()=>{
 assert.equal(localize('goutte-à-goutte'),'السقي بالتنقيط');assert.ok(!localize('réseau goutte-à-goutte').includes('حتى'));
});
test('Apostrophes françaises droite et typographique sont reconnues',()=>{
 const text='Les paramètres sont conservés. Aucun montant n’est inventé.';assert.equal(localize(text),localize(text.replaceAll('’',"'")));assert.match(localize(text),/[\u0600-\u06ff]/);
});
test('Texte arabe saisi librement préservé',()=>{
 const text='بغيت زيارة للضيعة ديالي';assert.equal(localize(text),text);
});
test('Tous les libellés de darija ont une traduction arabe non vide',()=>{
 assert.ok(Object.keys(sandbox.api.DARIJA).length>700);for(const [key,value] of Object.entries(sandbox.api.DARIJA))assert.match(value,/[\u0600-\u06ff]/,key);
});
