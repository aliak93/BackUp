package com.xd.wargame.engine;


import com.xd.wargame.engine.GameStateResponseML;
import com.xd.wargame.engine.WarEngineML;

public class Main {

	public static void main(String[] args) {
		int p1 = 0; // player1 ID
		int p2 = 1; // player2 ID
		WarEngineML engine = new WarEngineML(1, p1, p2);
		
		GameStateResponseML response = null;
		boolean gameRunning = true;
		boolean action1Valid = false;
		boolean action2Valid = false;
		
		while(gameRunning) {
			action1Valid = false;
			action2Valid = false;
			PlayerAction action1 = null;
			PlayerAction action2 = null;
			
			// Choses a random action for player1
			while(!action1Valid) {
				action1 = PlayerAction.values()[(int)(Math.random() * PlayerAction.values().length)];
				
				// check if the ability is on cooldown; if it is, re-enters the while loop to selection the action again 
				if(!((action1 == PlayerAction.HEAL_SHIELD && engine.getPlayer1().getHealShieldCharges() <= 0) || (action1 == PlayerAction.REFLECT_SHIELD && engine.getPlayer1().getReflectShieldCharges() <= 0))) {
					// check if we selected a valid action
					action1Valid = true;
				}
			}
			
			// Choses a random action for player2
			while(!action2Valid) {
				action2 = PlayerAction.values()[(int)(Math.random() * PlayerAction.values().length)];
				
				// check if the ability is on cooldown; if it is, re-enters the while loop to selection the action again				
				if(!((action2 == PlayerAction.HEAL_SHIELD && engine.getPlayer2().getHealShieldCharges() <= 0) || (action2 == PlayerAction.REFLECT_SHIELD && engine.getPlayer2().getReflectShieldCharges() <= 0))) {
					// check if we selected a valid action
					action2Valid = true;
				}
			}
			
			
			System.out.println("P1 " + action1.toString());
			System.out.println("P2 " + action2.toString());
			
			System.out.println("\n");
			
			// runs action for both players
			response = engine.runMoves(p1, action1, p2, action2);
			
			System.out.println("Turn " + response.getTurn());
			engine.printState();
			
			if(response.isDidGameEnd()) {
				gameRunning = false;
			}
			
			System.out.println("=========================");
		}
		
		if(engine.getPlayer1().getHealth() <= 0 && engine.getPlayer2().getHealth() <= 0) {
			System.out.println("DRAW");
		} else if (engine.getPlayer2().getHealth() > 0) {
			System.out.println("Player2 won!");
		} else {
			System.out.println("Player1 won!");
		}
		
	}
}
