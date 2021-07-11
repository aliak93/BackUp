package com.xd.wargame.engine;

public class PlayerML {
	
	private int id;
	
	private int health;
	private int healShieldCharges;
	private int reflectShieldCharges;
	
	public PlayerML(int id, int health, int healShieldCharges, int reflectShieldCharges) {
		this.id = id;
		this.health = health;
		this.healShieldCharges = healShieldCharges;
		this.reflectShieldCharges = reflectShieldCharges;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getHealth() {
		return health;
	}
	public void setHealth(int health) {
		this.health = health;
	}
	public int getHealShieldCharges() {
		return healShieldCharges;
	}
	public void setHealShieldCharges(int healShieldCharges) {
		this.healShieldCharges = healShieldCharges;
	}
	public int getReflectShieldCharges() {
		return reflectShieldCharges;
	}
	public void setReflectShieldCharges(int reflectShieldCharges) {
		this.reflectShieldCharges = reflectShieldCharges;
	}

	public void takeDamage(int damage) {
		this.health -= damage;
	}

	public void heal(int healValue) {
		this.health += healValue;
	}

	public void printState() {
		System.out.println("HP " + this.health);
		System.out.println("Heal Shield: " + this.healShieldCharges);
		System.out.println("Reflect Shield: " + this.reflectShieldCharges);
		
	}
	
}
