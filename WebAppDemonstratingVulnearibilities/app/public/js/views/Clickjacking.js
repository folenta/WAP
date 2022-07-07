import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
    }

    async drawHtml() {
        return `
        <h1>Clickjacking</h1>
        <button class="accordion info_button"><i class="fas fa-info-circle"></i>Popis útoku<i class="fas fa-angle-down"></i></button>
        <div class="panel info">
            <p>Clickjacking je útok, pri ktorom útočník presvedčí užvateľa pomocou nepriehľadných vrstiev, aby klikol na odkaz ktorý je na inej stránke, pričom užívateľ si myslí, že
            kliká na odkaz na aktuálnej stránke. Takým spôsobom môže užívateľ bez toho, aby o tom vedel, napríklad kúpiť nejakú vec alebo vykonať inú akciu, ktorá mu môže
            viac či menej uškodiť. Pre tento útok sa najčastejšie
            používajú plávajúce rámce (iframe).</p>
        </div><br>
        <button class="accordion attack_button"><img src="./public/images/swords.svg" class="swords" width="20">Útok<i class="fas fa-angle-down"></i></button>
        <div class="panel attack">
            <p>Tento útok budeme demonštrovať na príklade, kedy užívateľ nevedomky finančne podporí túto webovú aplikáciu. Keďže sa jedná iba o demonštráciu, 
            tak darovanie peňazí aplikácii sa prejaví iba informatívnym oknom, ktoré o tom užívateľa informuje.</p>
            <p>Pre demonštráciu útoku, vykonajte nasledujúce kroky:</p>
            <p><b>1.</b> Prejdite na stránku útočníka, na ktorú vás nalákal. Stránka sa nachádza na tomto <a href="http://www.stud.fit.vutbr.cz/~xfolen00/WAP/evilPage.html"><b>odkaze</b></a>.</p>
            <p><b>2.</b> Dodržte kroky uvedené na stránke útočníka, vyzdvihnite si odmenu a vráťte sa späť do aplikácie.</p>

            <br><h4>Podporte našu aplikáciu</h4>
            <input type="button" onclick="alert('Ďakujeme za podporu aplikácie Webové útoky')" value="Darovať peniaze našej aplikácii"><br><br>
            
            <h3>Čo sa stalo?</h3>
            <p>Útočník na svoju stránku vložil iframe so stránkou našej aplikácie, ktorý nastavil tak, aby bol neviditeľný. Užívateľ si tak mylne myslel, že sa pohybuje 
            po stránke s výhrou. V skutočnosti sa však pohyboval po našej aplikácii. Jedným klikom si otvoril sekciu Útok a druhým klikom miesto toho, aby klikol na tlačidlo <b>Vyzdvihnúť si 
            odmenu</b> na stránke útočníka, klikol na tlačidlo <b>Darovať peniaze našej aplikácii</B> na stránke aplikácie. V prípade, že by útočník nastavil polovičnú priehľadnosť iframe, 
            tak by užívateľ videl toto:</p>
            <img src="./public/images/clickjack_screen.png" id="clickjack_image" width="800px"/>
        </div><br>
        <button class="accordion defence_button"><i class="fas fa-shield-alt"></i>Obrana<i class="fas fa-angle-down"></i></button>
        <div class="panel defence">
            <p>Keďže na tento útok sa používajú plávajúce rámce iframe, najjednoduchšia obrana je zákaz zobrazenia našej aplikácie v takom rámci. Na to slúži hlavička X-Frame-Options, pri
            ktorej môžeme využiť 3 možnosti:</p>
            <ul>
                <li><b>DENY</b> - zakážeme zobrazenia našej aplikácie v akomkoľvek iframe</li>
                <li><b>SAMEORIGIN</b> - povolíme zabrazenie aplikácie v iframe iba z vlastnej domény</li>
                <li><b>ALLOW-FROM http://mydomain.com</b> - špeicifikujeme, ktoré domény môžu zobraziť aplikáciu v iframe</li>
            </ul>
            <h3>Príklad impementácie</h3>
            <p>V prípade aplikácie Express, ktorou je aj táto webová aplikácia, je možné použiť middleware Helmet, ktorý ponúka viacero bezpečnostných funkcíí. 
            Jednou z nich je aj funckia <code>frameguard</code>, ktorá nastaví X-Frame-Options na nami požadovanú hodnotu. Implementácia by tak mohla vyzerať nasledovne:</p>
            <pre><code>const helmet = require("helmet");
            
app.use(
    helmet.frameguard({
    action: "sameorigin",
    })
);</code></pre>

            <p>V tomto kóde sme nastavili X-Frame-Options na hodnotu <b>sameorigin</b>, čo znamená, že žiadna iná stránka okrem našej nemôže použiť našu aplikáciu v iframe.</p><br>
        </div>`;
    }
}