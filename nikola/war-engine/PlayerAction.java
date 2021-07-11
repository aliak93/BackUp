package com.xd.wargame.engine;

public enum PlayerAction {
	SHOOT(1), HEAL(2), HEAL_SHIELD(3), REFLECT_SHIELD(4);
	
	private final int value;
    private PlayerAction(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
