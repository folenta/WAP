import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
    }

    async drawHtml() {
        return `
        <h1>CSRF - Cross Site Request Forgery</h1>
        <button class="accordion info_button"><i class="fas fa-info-circle"></i>Popis útoku<i class="fas fa-angle-down"></i></button>
        <div class="panel info">
            <p>Pri CSFR útoku útočník prinúti užívateľa vykonať nežiadúcu akciu vo webovej aplikácii, v ktorej je aktuálne prihlásený. O tom, že danú
            akciu vykoná však užívateľ nevie, pretože je zamaskovaná, napríklad pomocou prvku <code>img</code> alebo <code>iframe</code>, ktoré odošlú požiadavku na server. Keďže je užívateľ prihlásený,
            server tak nemá ako zistiť, že požiadavka nepochádza priamo od neho a tak ju vykoná.</p>
            <p> Útoky sú mierené na prípady, pri ktorých dochádza k zmene stavu na serveri, akými sú napríklad 
            zmena emailovej adresy, zmena hesla, nákup nejakého predmetu a podobne. Útočník zvyčajne z tohto útoku nemá žiadny úžitok a cieľom je tak hlavne poškodenie obete.</p>
        </div><br>
        <button class="accordion attack_button"><img src="./public/images/swords.svg" class="swords" width="20">Útok<i class="fas fa-angle-down"></i></button>
        <div class="panel attack">
            <p>Pre demonštráciu CSFR útoku prejdite na tento odkaz: <b><a href="./login.html">CSFR útok</a></b></p>
            <h3>Čo sa stalo?</h3>
            <p>Po zadaní správnych údajov a prihlásení sa do svojho účtu má užívateľ možnosť si zmeniť heslo. 
            Pri zmene hesla je vytvorená požiadavka GET, v ktorej sú údaje uložené v url <i>.../login.html?newPassword=xxxxx</i>.
            Táto požiadavka je spracovaná a výsledkom je nové heslo.</p>
            <p>Po prihlásení sa do účtu umiestnil útočník na našu stránku veľmi lákavú reklamu, podľa ktorej sme vyhrali smartphone. Pri snahe vyzdvihnúť si odmenu 
            je možné veľmi rýchlo zistiť, že sa jedná o podvod, čo nám je aj oznámené. Čo však už užívateľ nevidel bolo to, že po stlačení tlačidla <b>Vyzdvihnúť si odmenu</b> bola poslaná
            požiadavka GET v tvare <i>.../login.html?newPassword=12345</i>, pomocou ktorej nám útočník bez nášho vedomia zmenil heslo (nové heslo je <b>12345</b>) 
            a tým pádom bolo opätovné prihlásenie do užívateľského účtu kvôli nesprávnemu heslu neúspešné.</p>
        </div><br>
        <button class="accordion defence_button"><i class="fas fa-shield-alt"></i>Obrana<i class="fas fa-angle-down"></i></button>
        <div class="panel defence">
            <p>Obranou proti CSFR útoku je napríklad synchrnonizačný token, ktorý nebude k dispozícii útočníkovi, ktorý by s ním mohol manipulovať. Pred každou zmenou na serveri sa tak 
            najprv overí, či je synchronizačný token taký, aký má byť a až následne dôjde k zmene na serveri. Token je možné použiť formou skrytého poľa vo formulári.</p>
            <p>Ďalšou formou obrany je kontrola hlavičky Origin, ktorá nesie informáciu odkiaľ daná požiadavka pochádza alebo kontrola hlavičky Referer, ktorá obsahuje infromáciu o URL 
            naposledy navštívenej stránky.</p>
            <h3>Príklad impementácie</h3>
            <p>Ako bolo spomenuté vyššie, jednou z foriem obrany je kontrola hlavičky Origin. Na to nám môže poslúžiť napríklad balíček cors. Kontrolu hlavičky by sme potom 
            mohli implementovať takto:</p>
            <pre><code>const cors = require("cors");
            
const corsOptions = {
    origin: 'https://infinite-oasis-17402.herokuapp.com/',
}
            
app.use(cors(corsOptions));</code></pre>

            <p>Takým spôsobom môžeme obmedziť požiadavky z iných domén.</p>
        </div>`;
    }
}