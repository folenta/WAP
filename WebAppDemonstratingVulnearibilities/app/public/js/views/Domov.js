import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
    }

    async drawHtml() {
        return `<h1>Webové útoky</h1>
        <p>V tejto aplikácii sa oboznámite s niekoľkými príkladmi webových útokov, ktoré budú aj demonštrované a naučíte sa, ako sa proti nim brániť.
        Každý útok obsahuje:</p>
        <button class="accordion info_button home"><i class="fas fa-info-circle"></i>Popis útoku<i class="fas fa-angle-down"></i></button><p class="home_info"> -  krátke oboznámenie sa s útokom, ktorý bude demonštrovaný</p>
        <button class="accordion attack_button home"><img src="./public/images/swords.svg" class="swords" width="20">Útok<i class="fas fa-angle-down"></i></button><p class="home_info"> -  demonštrácia daného útoku</p>
        <button class="accordion defence_button home"><i class="fas fa-shield-alt"></i>Obrana<i class="fas fa-angle-down"></i></button><p class="home_info"> -  popis a konrétny príklad obrany proti útoku</p><br>
        
        <p>Každý útok je iba demonštráciou, čo znamená, že vám nebude spôsobená žiadna škoda. Pre správnu demonštráciu útoku je potrebné dodržať jednotlivé kroky, 
        ktoré sú uvedené v sekcii Útok. V rámci demonštrácie môžete byť presmerovaný na inú doménu, ktorá reprezentuje stránku útočníka, ale aj tá je úplne bezpečná 
        a nehrozí vám žiadne riziko.</p>`;
    }
}