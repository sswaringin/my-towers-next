"use client";

import { useState } from "react";
import { game } from "my-towers";

export default function Home() {
  const [pegCount, setPegCount] = useState(3);
  const [discCount, setDiscCount] = useState(5);
  const [newGame, setNewGame] = useState(game());
  const [board, setBoard] = useState({});
  const [moveCount, setMoveCount] = useState(0);
  const [winCount, setWinCount] = useState(0);

  return (
    <main className="wrapper">
      <div className="region">
        <div className="stack">
          <h1 className="font-bold">Towers of Hanoi</h1>
          {/* <div className="cluster">
          <p>{`Peg count: ${pegCount}`}</p>
          <button
            disabled={newGame.isRunning()}
            onClick={() => setPegCount((count) => count + 1)}
          >
            +
          </button>
          <button
            disabled={newGame.isRunning()}
            onClick={() => setPegCount((count) => count - 1)}
          >
            -
          </button>
        </div> */}

          {/* <div className="cluster">
          <p>{`Disc count: ${discCount}`}</p>
          <button
            disabled={newGame.isRunning()}
            onClick={() => setDiscCount((count) => count + 1)}
          >
            +
          </button>
          <button
            disabled={newGame.isRunning()}
            onClick={() => setDiscCount((count) => count - 1)}
          >
            -
          </button>
        </div> */}
          <div className="cluster">
            <p>{`Wins: ${winCount}`}</p>
            <p>{`Moves: ${moveCount}`}</p>
          </div>

          <div className="cluster">
            <button
              disabled={newGame.isRunning()}
              onClick={() =>
                setNewGame((prev) => {
                  const results = prev.start(pegCount, discCount);
                  setBoard(results.board);
                  return {
                    ...prev,
                    ...results,
                  };
                })
              }
            >
              start
            </button>
            <button
              disabled={!newGame.isRunning()}
              onClick={() =>
                setNewGame((prev) => {
                  const results = prev.end();
                  setBoard({});
                  return {
                    ...prev,
                    ...results,
                  };
                })
              }
            >
              end
            </button>
          </div>
          <p>{`Message: ${newGame?.message || "no message"}`}</p>
          {/* board */}
          {board?.pegs && (
            <>
              {board?.pegs.map((peg, idx) => {
                return (
                  <div key={idx} className="cluster">
                    <p>{`Peg ${idx + 1}`}</p>
                    {peg.discs.map((disc, idx) => {
                      return <p key={idx}>{disc}</p>;
                    })}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
