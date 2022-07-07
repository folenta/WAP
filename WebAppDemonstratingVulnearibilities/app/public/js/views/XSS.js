import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
    }

    async drawHtml() {
        return `
        <h1>XSS - Cross Site Scripting</h1>
        <button class="accordion info_button"><i class="fas fa-info-circle"></i>Popis útoku<i class="fas fa-angle-down"></i></button>
        <div class="panel info">
            <p>XSS útok je útok, pri ktorom útočník vloží do neškodnej a dôveryhodnej webovej stránky škodlivý skript. Útoky tohto typu sú často možné najmä vtedy, 
            keď webová aplikácia nekontroluje vstup užívateľa. Prehliadač užívateľa nevie, že bol do neho prostredníctvom útočníka vložený škodlivý skript a tak ho vykoná.
            Taký skript môže napríklad získať prístup ku cookies užívateľa, k súradniciam GPS užívateľa, môže monitorovať pohyby myši, upravovať formuláre 
            alebo sa dostať k iným citlivým informáciám.</p>
            <p>XSS útoky môžeme rozdeliť na 3 typy:</p>
            <ul>
                <li><b>Trvalý XSS útok (Stored)</b> - vložený skript je trvalo uložený na cieľovom serveri, napríklad v databáze.</li>
                <li><b>Dočasný XSS útok (Reflected)</b> - skript je ukožený iba dočasne, kde je skript uložený v dynamickom obsahu, ktorý je odpoveďou na užívateľov vstup.</li>
                <li><b>Lokálny XSS útok (DOM-Based)</b> - využíva sa časť aktuálnej URL.</li>
            </ul>
        </div><br>
        <button class="accordion attack_button"><img src="./public/images/swords.svg" class="swords" width="20">Útok<i class="fas fa-angle-down"></i></button>
        <div class="panel attack">
            <p>XSS útok budeme demonštrovať na príklade, kedy užívateľ bude môcť nahrať svoje meno a fotografiu do systému, ktoré sa mu potom ukážu.</p>
            <p>Pre demonštráciu XSS útoku je potrebné vykonať nasledujúce kroky:</p>
            <p><b>1.</b> Zadajte skúšobné údaje a to meno <b>User</b> a fotografiu <b>https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg</b>
            pre overenie, že program funguje správne.</p>
            <p><b>2.</b> Teraz do poľa Meno zadajte akékoľvek meno (napríklad <b>User</b>) a do poľa Fotka zadajte 
            <b>http://somepage.com/photos/nonexistingphoto.jpg" onerror="alert('Stal si sa obeťou XSS útoku');"</b></p>
        <form id="XSS_form">
            <div class="form-control">
                <label for="form_name">Meno</label>
                <input type="text" id="form_name" name="form_name"></input>
            </div>
            <div class="form-control">
                <label for="form_image">Fotka</label>
                <input type="text" id="form_image" name="form_image" />
            </div>
            <div class="submitButton">
                <input type="submit" value="Uložiť"/>
            </div>
        </form>

        <div id="form_output"></div>

        <br><br><br><br><br><br><br><br><h3>Čo sa stalo?</h3>
        <p>Útočník využil svoje znalosti a do poľa Fotka úmyslne vložil neexistujúcu adresu, ktorá vyvolá chybu. To, aká akcia má byť pri chybe vykonaná si však určil sám útočník
        pomocou funckie <b>onerror</b>, ktorou vyvolal výstrahu (alert), ktorá sa užívateľovi ukázala. Podobným spôsobom by mohol vykonať aj viac škodlivú akciu.</p>

        </div><br>
        <button class="accordion defence_button"><i class="fas fa-shield-alt"></i>Obrana<i class="fas fa-angle-down"></i></button>
        <div class="panel defence">
            <p>Obranou proti XSS útokom je najmä sanitizácia vstupov, čo slúži na to, aby sa automaticky nevykonalo hocičo, čo príde na vstup, ale aby sa každý vstup skontroloval a odstránil
            tak potenciálnu hrozbu. Na to je možné využiť viaceré balíčky, ako napríklad xss-filters, validator a podobne.</p>
            <p>Na obranu voči útoku je tiež možné použiť CSP (Content Security Policy), v rámci ktorého je možné obmedziť pôvod atribútu <code>src</code> prvku <code>img</code> alebo <code>script</code>.</p>
            <h3>Príklad impementácie</h3>
            <p>Vstupy je možné validovať aj jednoduchou kontrolou na strane klienta. Pre náš prípad by taká kontrola mohla mať podobu:</p>
            <pre><code>if (image.indexOf("onerror") === -1) {
    // show Name and Image
}</code></pre>
            <p>V takom prípade by klient spoznal, že sa v URL fotografie nachádza reťazec "onerror", ktorý môže byť nebezpečný a fotografiu spolu s menom nezobrazí.</p><br><br>
        </div>`;
    }
}