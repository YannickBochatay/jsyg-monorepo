import $ from "jquery";
import StdConstruct from "@jsyg/stdconstruct";

/**
 * Constructeur permettant la gestion de fonctions annuler/refaire.<br/>
 * A chaque fois que la méthode saveState est appelée, le noeud est cloné et stocké dans une pile.<br/>
 * Quand on appelle les méthodes undo ou redo, le noeud est remplacé par le clone adéquat.<br/>
 * Ailleurs dans le code il faut donc faire attention à ne pas faire référence directement à ce noeud, car celui-ci change.
 * Il vaut mieux utiliser un selecteur css pour retrouver le bon élément à chaque fois.
 */
export default function UndoRedo(arg,opt) {

    /**
     * Pile contenant les noeuds clonés
     */
    this.stack = [];
    
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRedo = this.handleRedo.bind(this);

    if (arg) this.setNode(arg);

    if (opt) this.enable(opt);
};

UndoRedo.prototype = new StdConstruct();

UndoRedo.prototype.constructor = UndoRedo;

/**
 * Activation automatique ou non des raccourcis clavier
 */
UndoRedo.prototype.autoEnableKeyShortCuts = false;

/**
 * Raccourci clavier pour annuler
 * @type {String} touche associée à la touche ctrl
 */
UndoRedo.prototype.keyShortCutUndo = "z";

/**
 * Raccourci clavier pour refaire
 * @type {String} touche associée à la touche ctrl
 */
UndoRedo.prototype.keyShortCutRedo = "y";

/**
 * Activation automatique ou non des champs
 */
UndoRedo.prototype.autoEnableFields = false;

/**
 * Champ annuler (optionnel, pour faciliter la création d'un bouton)
 * @type HTMLElement
 */
UndoRedo.prototype.fieldUndo = null;

/**
 * Champ refaire (optionnel, pour faciliter la création d'un bouton)
 * @type HTMLElement
 */
UndoRedo.prototype.fieldRedo = null;

/**
 * Nombre d'états que l'on conserve en mémoire
 * @type {Number}
 */
UndoRedo.prototype.depth = 10;

/**
 * Indice de l'état courant
 */
UndoRedo.prototype.current = 0;

/**
 * Fonctions à exécuter à chaque fois qu'on annule une action
 */
UndoRedo.prototype.onundo = null;

/**
 * Fonctions à exécuter à chaque fois qu'on rétablit une action
 */
UndoRedo.prototype.onredo = null;

/**
 * Fonctions à exécuter à chaque fois qu'on annule ou refait une action
 */
UndoRedo.prototype.onchange = null;

/**
 * Fonctions à exécuter à chaque fois qu'on sauve l'état courant
 */
UndoRedo.prototype.onsave = null;

/**
 * Indique si le module est actif ou non
 */
UndoRedo.prototype.enabled = null;

/**
 * Change le noeud par le noeud situé dans la pile à l'indice passé en argument
 */
UndoRedo.prototype.change = function(indice) {

    if (this.stack[indice] == null) return;

    var clone = $(this.stack[indice].node).clone();

    clone.replaceAll(this.node);

    this.node = clone[0];

    this.current = indice;

    if (this.fieldUndo) {
        if (this.stack.length > 1 && this.current < this.stack.length-1) $(this.fieldUndo).removeAttr("disabled");
        else $(this.fieldUndo).attr("disabled", "");
    }

    if (this.fieldRedo) {
        if (this.stack.length > 1 && this.current > 0) $(this.fieldRedo).removeAttr("disabled");
        else $(this.fieldRedo).attr("disabled", "");
    }

    this.trigger('change',this.node);

    return this;
};

/**
 * Sauve l'état courant
 * @param label optionnel, intitulé de l'action effectuée
 * @returns {UndoRedo}
 */
UndoRedo.prototype.saveState = function(label,_preventEvent) {

    //on vide le début du tableau si on avait annulé quelque chose
    while (this.current>0) { this.stack.shift(); this.current--; }

    var clone = $(this.node).clone();

    if (!clone.length) return this;

    this.stack.unshift( { "label":label, "node" : clone[0] } );

    if (this.stack.length > this.depth) this.stack.pop();

    if (this.fieldRedo) $(this.fieldRedo).attr("disabled", "");
    if (this.fieldUndo) $(this.fieldUndo).removeAttr("disabled");

    if (!_preventEvent) this.trigger('save',this.node);

    return this;
};

/**
 * Définit si on peut annuler
 */
UndoRedo.prototype.hasUndo = function() {
    return this.current < this.stack.length-1;
};

/**
 * Définit si on peut refaire
 */
UndoRedo.prototype.hasRedo = function() {
    return this.current >= 1;
};
/**
 * Annule l'action précédente (remplace le noeud par le dernier état sauvegardé)
 * @returns {UndoRedo}
 */
UndoRedo.prototype.undo = function() {

    if (!this.hasUndo()) return;

    this.change(++this.current);

    this.trigger('undo',this.node);

    return this;
};

/**
 * Rétablit l'action précédente (remplace le noeud par l'état suivant dans la pile).
 * @returns {UndoRedo}
 */
UndoRedo.prototype.redo = function() {

    if (!this.hasRedo()) return;

    this.change(--this.current);

    this.trigger('redo',this.node);

    return this;
};

/**
 * Vide la pile
 * @returns {UndoRedo}
 */
UndoRedo.prototype.clear = function(_preventEvent) {

    this.current=0;

    this.stack.splice(0,this.stack.length);

    this.fieldRedo && $(this.fieldRedo).attr("disabled","");

    this.saveState(null,_preventEvent);

    this.fieldUndo && $(this.fieldUndo).attr("disabled","");

    return this;
};

UndoRedo.prototype.enableFields = function() {
    
    if (!this.enabled) return this;
    
    if (this.fieldUndo) $(this.fieldUndo).on('click',this.undo).attr("disabled","");
    
    if (this.fieldRedo) $(this.fieldRedo).on('click',this.redo).attr("disabled","");
    
    return this;
};

UndoRedo.prototype.disableFields = function() {
    
    if (!this.enabled) return this;
    
    if (this.fieldUndo) $(this.fieldUndo).off('click',this.undo).removeAttr("disabled");
    
    if (this.fieldRedo) $(this.fieldRedo).off('click',this.redo).removeAttr("disabled");
    
    return this;
};

UndoRedo.prototype.handleUndo = function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "z") this.undo();
}

UndoRedo.prototype.handleRedo = function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "y") this.redo();
}

UndoRedo.prototype.enableKeyShortCuts = function() {
    
    if (!this.enabled) return this;
    
    var $doc = $(document);
    
    if (this.keyShortCutUndo) $doc.on("keydown",this.handleUndo);
    if (this.keyShortCutRedo) $doc.on("keydown",this.handleRedo);
    
    return this;
};

UndoRedo.prototype.disableKeyShortCuts = function() {
    
    if (!this.enabled) return this;
    
    var $doc = $(document);
    
    if (this.keyShortCutUndo) $doc.off("keydown",this.handleUndo);
    if (this.keyShortCutRedo) $doc.off("keydown",this.handleRedo);
    
    return this;
};
/**
 * Sauve l'état courant et active les fonctions si les propriétés fieldUndo et/ou fieldRedo ont été définies.
 * @returns {UndoRedo}
 */
UndoRedo.prototype.enable = function(opt) {

    this.disable();

    if (opt) this.set(opt);

    this.saveState(null,true);
    
    this.enabled = true;
    
    if (this.autoEnableFields) this.enableFields();
    
    if (this.autoEnableKeyShortCuts) this.enableKeyShortCuts();

    return this;
};

/**
 * Vide la pile et désactive les fonctions.
 * @returns {UndoRedo}
 */
UndoRedo.prototype.disable = function() {
    
    this.clear(true);

    this.stack.splice(0,this.stack.length);
        
    this.disableFields();
    
    this.disableKeyShortCuts();
    
    this.enabled = false;

    return this;
};
