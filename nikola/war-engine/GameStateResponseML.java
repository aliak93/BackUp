package com.xd.wargame.engine;

import com.xd.wargame.engine.PlayerAction;

public class GameStateResponseML {
	private PlayerML player1State;
	private PlayerML player2State;
	
	private PlayerAction player1Action;
	private PlayerAction player2Action;
	
	private boolean didGameEnd;
	private int turn;
	private int gameID;

	public GameStateResponseML() {
		turn = 0;
		didGameEnd = false;
		this.reset();
	}
	
	public void reset() {
		didGameEnd = false;
		player1Action = null;
		player2Action = null;
	}

	public PlayerML getPlayer1State() {
		return player1State;
	}

	public void setPlayer1State(PlayerML player1State) {
		this.player1State = player1State;
	}

	public PlayerML getPlayer2State() {
		return player2State;
	}

	public void setPlayer2State(PlayerML player2State) {
		this.player2State = player2State;
	}

	public PlayerAction getPlayer1Action() {
		return player1Action;
	}

	public void setPlayer1Action(PlayerAction player1Action) {
		this.player1Action = player1Action;
	}

	public PlayerAction getPlayer2Action() {
		return player2Action;
	}

	public void setPlayer2Action(PlayerAction player2Action) {
		this.player2Action = player2Action;
	}

	public boolean isDidGameEnd() {
		return didGameEnd;
	}

	public void setDidGameEnd(boolean didGameEnd) {
		this.didGameEnd = didGameEnd;
	}

	public int getTurn() {
		return turn;
	}

	public void setTurn(int turn) {
		this.turn = turn;
	}

	public int getGameID() {
		return gameID;
	}

	public void setGameID(int gameID) {
		this.gameID = gameID;
	}
	
}
