//=============================================================================
// equipstats-pt.js
//=============================================================================

/*:
 * @plugindesc	Insere restrições de atributos para equipamentos.
 * @author	Conspiracy <Maycon Junior>
 *
 * @help	Basta adicionar uma tag no item de acordo com o status desejado;
 *			<stats:Atk Def MAtk MDef Agil Luck>
 *		Ex:	<stats:30 20 0 0 0 0> Requer: 30 Ataque, 20 Defesa.
 *      Informações detalhadas: http://centrorpg.com/index.php?topic=15274.0;topicseen
 */


var old_Game_BattlerBase_canEquip = Game_BattlerBase.prototype.canEquip;
var old_Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
var old_Window_EquipItem_includes = Window_EquipItem.prototype.includes;

Game_Actor.prototype.changeEquip = function(slotId, item) {
	if(!item || this.canEquip(item))
		old_Game_Actor_changeEquip.call(this, slotId, item);
};

Window_EquipItem.prototype.includes = function(item){
    if (!item) {
        return old_Window_EquipItem_includes.call(this, item);
    }
    if (this._slotId < 0 || item.etypeId !== this._actor.equipSlots()[this._slotId]) {
        return false;
    }
    return old_Game_BattlerBase_canEquip.call(this._actor, item);
};

Game_BattlerBase.prototype.canEquip = function(item) {
	if(!item || !item.meta.stats)
		return old_Game_BattlerBase_canEquip.call(this, item);
	var attr = item.meta.stats.split(' ');
	var cont=0;
	for(var x=0 ; x < attr.length ; x++){
		if(attr[x] <= $gameHero.param(x+2))
			cont++;
	}
	if(cont >= 6)
		return old_Game_BattlerBase_canEquip.call(this, item);
	return false;
};
