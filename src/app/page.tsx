"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { game } from "@/my-towers";

export default function Home() {
  // const [pegCount, setPegCount] = useState(3);
  // const [discCount, setDiscCount] = useState(5);
  const [newGame, setNewGame] = useState(game());
  const [moveCount, setMoveCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [sourcePeg, setSourcePeg] = useState("1");
  const [destinationPeg, setDestinationPeg] = useState("2");
  const [message, setMessage] = useState(newGame.message);
  const [winningState, setWinningState] = useState(false);

  const handleReset = () => {
    setMoveCount(0);
    setSourcePeg("1");
    setDestinationPeg("2");
    setWinningState(false);
    setNewGame(game());
  };

  const handleMove = (sourcePeg: string, destinationPeg: string) => {
    const sourceIdx = parseInt(sourcePeg) - 1;
    const destIdx = parseInt(destinationPeg) - 1;
    const results = newGame.move(sourceIdx, destIdx);
    setMoveCount(results.moveCount);
    setMessage(results.message);

    if (results.winningState) {
      setWinCount((prev) => prev + 1);
      setWinningState(true);
    }

    setNewGame((prev) => {
      return {
        ...prev,
        ...results,
      };
    });
  };

  const handleEnd = () => {
    handleReset();
    const results = newGame.end();
    setMessage(results.message);

    setNewGame((prev) => {
      return {
        ...prev,
        ...results,
      };
    });
  };

  const handleStart = () => {
    setNewGame((prev) => {
      const results = prev.start();
      // setBoard(results.board);
      setMessage(results.message);
      return {
        ...prev,
        ...results,
      };
    });
  };

  const winningGame = () => {
    handleMove("1", "2");
    handleMove("1", "3");
    handleMove("2", "3");
    handleMove("1", "2");
    handleMove("3", "1");
    handleMove("3", "2");
    handleMove("1", "2");
    handleMove("1", "3");
    handleMove("2", "3");
    handleMove("2", "1");
    handleMove("3", "1");
    handleMove("2", "3");
    handleMove("1", "2");
    handleMove("1", "3");
    handleMove("2", "3");
    handleMove("1", "2");
    handleMove("3", "2");
    handleMove("3", "1");
    handleMove("2", "3");
    handleMove("1", "2");
    handleMove("3", "2");
    handleMove("3", "1");
    handleMove("2", "3");
    handleMove("2", "1");
    handleMove("3", "1");
    handleMove("3", "2");
    handleMove("1", "2");
    handleMove("1", "3");
    handleMove("2", "3");
    handleMove("1", "2");
    handleMove("3", "1");
    handleMove("3", "2");
    handleMove("1", "2");
  };

  return (
    <main className="wrapper">
      <article className="region">
        <div className="stack">
          <h1 className="font-bold">My Towers</h1>
          {/* <div className="cluster">
          <p>{`Peg count: ${pegCount}`}</p>
          <Button
            disabled={newGame.isRunning()}
            onClick={() => setPegCount((count) => count + 1)}
          >
            +
          </Button>
          <Button
            disabled={newGame.isRunning()}
            onClick={() => setPegCount((count) => count - 1)}
          >
            -
          </Button>
        </div> */}

          {/* <div className="cluster">
          <p>{`Disc count: ${discCount}`}</p>
          <Button
            disabled={newGame.isRunning()}
            onClick={() => setDiscCount((count) => count + 1)}
          >
            +
          </Button>
          <Button
            disabled={newGame.isRunning()}
            onClick={() => setDiscCount((count) => count - 1)}
          >
            -
          </Button>
        </div> */}
          <div className="cluster">
            <p>{`Wins: ${winCount}`}</p>
            <p>{`Moves: ${moveCount}`}</p>
          </div>

          <div className="cluster">
            <Button
              disabled={newGame.isRunning()}
              onClick={winningState ? handleReset : handleStart}
            >
              {winningState ? "reset" : "start"}
            </Button>
            <Button disabled={!newGame.isRunning()} onClick={handleEnd}>
              end
            </Button>
          </div>
          <p>{message}</p>
          <div className="cluster">
            <p>{`Source:`}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{sourcePeg}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Source Peg</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={sourcePeg}
                  onValueChange={setSourcePeg}
                >
                  <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="3">3</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="cluster">
            <p>{`Destination:`}</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{destinationPeg}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Destination Peg</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={destinationPeg}
                  onValueChange={setDestinationPeg}
                >
                  <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="3">3</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="cluster">
            <Button
              disabled={!newGame.isRunning()}
              onClick={() => handleMove(sourcePeg, destinationPeg)}
            >
              move
            </Button>
            {process.env.NODE_ENV === "development" && (
              <Button onClick={winningGame}>Quick Win</Button>
            )}
          </div>

          {/* board */}
          {newGame?.board?.pegs && (
            <>
              {newGame?.board?.pegs.map((peg, idx) => {
                return (
                  <div key={idx} className="cluster">
                    <p>{`Peg ${idx + 1}`}</p>
                    {peg.discs.map((disc: number, idx: number) => {
                      return <p key={idx}>{disc}</p>;
                    })}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </article>
    </main>
  );
}
