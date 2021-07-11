package com.xd.wargame.engine;


public class WarEngineML {
	
	// CONSTANTS
	/*
	 * Initial number of reflect shields
	 */
	private final int INITIAL_REFLECT_SHIELD_CHARGE = 1;
	
	/*
	 * Number of turns after you receive another REFLECT shield increase. 
	 */
	private final int REFLECT_SHIELD_INCREASE_TURN_COOLDOWN = 5;
	
	/*
	 * Initial number of heal shields 
	 */
	private final int INITIAL_HEAL_SHIELD_CHARGE = 2;
	
	/*
	 * Number of turns after you receive another HEAL shield increase. 
	 */
	private final int HEAL_SHIELD_INCREASE_TURN_COOLDOWN = 5;
	
	/*
	 * Initial health; 
	 */
	private final int INITIAL_HEALTH = 1000;
	
	/*
	 * Shoot damage; 
	 */
	private final int SHOOT_DAMAGE = 200;
	
	/*
	 * Reflect shield damage; 
	 */
	private final int REFLECT_SHIELD_DAMAGE = 200;
	
	/*
	 * Heal amount. 
	 */
	private final int HEAL = 100;
	
	/*
	 * The amount healed by the heal shield. 
	 */
	private final int HEAL_SHIELD_HEALUP_VALUE = 100;
	
	// Properties

	private int gameID;
	private int turn;

	private PlayerML player1;
	private PlayerML player2;
	
	private GameStateResponseML gameStateResponse;
	
	private boolean isGameRunning;
	
	public WarEngineML(int gameID, int p1ID, int p2ID) {
		this.gameID = -1;
		this.turn = -1;
		this.isGameRunning = false;
		this.gameStateResponse = new GameStateResponseML();
		
		this.gameID = gameID;
		this.player1 = new PlayerML(p1ID, INITIAL_HEALTH, INITIAL_HEAL_SHIELD_CHARGE, INITIAL_REFLECT_SHIELD_CHARGE);
		this.player2 = new PlayerML(p2ID, INITIAL_HEALTH, INITIAL_HEAL_SHIELD_CHARGE, INITIAL_REFLECT_SHIELD_CHARGE);
	}
	
	private void newTurn() {
		// reload action charges
		turn++;
		
		// update PlayerML states
		// turn + 1 because we're starting with the turn index 0
		if((turn + 1) % HEAL_SHIELD_INCREASE_TURN_COOLDOWN == 0) {
			player1.setHealShieldCharges(player1.getHealShieldCharges() + 1);
			player2.setHealShieldCharges(player2.getHealShieldCharges() + 1);
		}
		
		if((turn + 1) % REFLECT_SHIELD_INCREASE_TURN_COOLDOWN == 0) {
			player1.setReflectShieldCharges(player1.getReflectShieldCharges() + 1);
			player2.setReflectShieldCharges(player2.getReflectShieldCharges() + 1);
		}
	}

	
	public void startGame() {
		if (!this.isGameRunning) {
			this.isGameRunning = true;
			this.newTurn();
			this.turn = 0;
		}
	}
	
	public GameStateResponseML runMoves(int player1ID, PlayerAction player1Action, int player2ID, PlayerAction player2Action) {
		gameStateResponse.reset();
		PlayerML p1 = getPlayer(player1ID);
		PlayerML p2 = getPlayer(player2ID);
		
		gameStateResponse.setGameID(gameID);
		gameStateResponse.setPlayer1Action(player1Action);
		gameStateResponse.setPlayer2Action(player2Action);
		gameStateResponse.setPlayer1State(p1);
		gameStateResponse.setPlayer1State(p2);
		
		runActions(p1, player1Action, p2, player2Action);
		
		if(p1.getHealth() <= 0 || p2.getHealth() <= 0) {
			gameStateResponse.setDidGameEnd(true);
		} else {
			// increase turn and update PlayerML state
			newTurn();
			gameStateResponse.setTurn(turn);			
		}

		return gameStateResponse;
	}
	
	private void runActions(PlayerML player1, PlayerAction player1Action, PlayerML player2, PlayerAction player2Action ) {
		if (player1Action == PlayerAction.HEAL_SHIELD) {
			player1.setHealShieldCharges(player1.getHealShieldCharges() - 1);
		} else if (player1Action == PlayerAction.REFLECT_SHIELD) {
			player1.setReflectShieldCharges(player1.getReflectShieldCharges() - 1);
		}
		
		if (player2Action == PlayerAction.HEAL_SHIELD) {
			player2.setHealShieldCharges(player2.getHealShieldCharges() - 1);
		} else if (player2Action == PlayerAction.REFLECT_SHIELD) {
			player2.setReflectShieldCharges(player2.getReflectShieldCharges() - 1);
		}
		
		if(checkShootShoot(player1, player1Action, player2, player2Action)) {
			return;
		} else if(checkShootShoot(player2, player2Action, player1, player1Action)) {
			return;
		} else if(checkShootHeal(player1, player1Action, player2, player2Action)) {
			return;
		} else if(checkShootHeal(player2, player2Action, player1, player1Action)) {
			return;
		} else if(checkHealHeal(player1, player1Action, player2, player2Action)) {
			return;
		} else if(checkHealHeal(player2, player2Action, player1, player1Action)) {
			return;
		} else if(checkShootHealShield(player1, player1Action, player2, player2Action)) {
			return;
		} else if(checkShootHealShield(player2, player2Action, player1, player1Action)) {
			return;
		} else if(checkShootReflectShield(player1, player1Action, player2, player2Action)) {
			return;
		} else if(checkShootReflectShield(player2, player2Action, player1, player1Action)) {
			return;
		} else if(checkHealAnyShield(player1, player1Action, player2, player2Action)) {
			return;
		} else if(checkHealAnyShield(player2, player2Action, player1, player1Action)) {
			return;
		}
	}

	public PlayerML getState(int playerID) {
		return this.getPlayer(playerID);
	}
	
	private PlayerML getPlayer(int playerID) {
		if(playerID == player1.getId()) {
			return player1;
		} else if (playerID == player2.getId()){
			return player2;
		} else {
			return null;
		}
	}
	
	// ACTION-CASES
	
	private boolean checkShootShoot(PlayerML p1, PlayerAction action1, PlayerML p2, PlayerAction action2) {
		if(action1 == PlayerAction.SHOOT && action2 == PlayerAction.SHOOT) {
			p1.takeDamage(SHOOT_DAMAGE);
			p2.takeDamage(SHOOT_DAMAGE);
			return true;
		} else { 
			return false;
		}
	}
	
	private boolean checkShootHeal(PlayerML p1, PlayerAction action1, PlayerML p2, PlayerAction action2) {
		if(action1 == PlayerAction.SHOOT && action2 == PlayerAction.HEAL) {
			p2.takeDamage(SHOOT_DAMAGE);
			p2.heal(HEAL);
			return true;
		} else { 
			return false;
		}
	}
	
	private boolean checkHealHeal(PlayerML p1, PlayerAction action1, PlayerML p2, PlayerAction action2) {
		if(action1 == PlayerAction.HEAL && action2 == PlayerAction.HEAL) {
			p1.heal(HEAL);
			p2.heal(HEAL);
			return true;
		} else { 
			return false;
		}
	}
	
	private boolean checkShootHealShield(PlayerML p1, PlayerAction action1, PlayerML p2, PlayerAction action2) {
		if(action1 == PlayerAction.SHOOT && action2 == PlayerAction.HEAL_SHIELD) {
			p2.heal(HEAL_SHIELD_HEALUP_VALUE);
			return true;
		} else { 
			return false;
		}
	}
	
	private boolean checkShootReflectShield(PlayerML p1, PlayerAction action1, PlayerML p2, PlayerAction action2) {
		if(action1 == PlayerAction.SHOOT && action2 == PlayerAction.REFLECT_SHIELD) {
			p1.takeDamage(REFLECT_SHIELD_DAMAGE);
			return true;
		} else { 
			return false;
		}
	}
	
	private boolean checkHealAnyShield(PlayerML p1, PlayerAction action1, PlayerML p2, PlayerAction action2) {
		if(action1 == PlayerAction.HEAL && (action2 == PlayerAction.HEAL_SHIELD || action2 == PlayerAction.REFLECT_SHIELD)) {
			p1.heal(HEAL);
			return true;
		} else { 
			return false;
		}
	}
	
	// The only ones left are (heal_shield - reflect_shield), (heal_shield - heal_shield) and (reflect_shield - reflect_shield) 
	// which don't affect the state
	

	public PlayerML getPlayer1() {
		return player1;
	}

	public PlayerML getPlayer2() {
		return player2;
	}

	public void printState() {
		System.out.println("Player1");
		player1.printState();
		System.out.println("\nPlayer2");
		player2.printState();
		
	}

}
