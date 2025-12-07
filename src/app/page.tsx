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
import { game } from "my-towers";

export default function Home() {
  const [pegCount, setPegCount] = useState(3);
  const [discCount, setDiscCount] = useState(5);
  const [newGame, setNewGame] = useState(game());
  const [board, setBoard] = useState({});
  const [moveCount, setMoveCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [sourcePeg, setSourcePeg] = useState("1");
  const [destinationPeg, setDestinationPeg] = useState("2");
  const [message, setMessage] = useState(newGame.message);

  const handleReset = () => {
    setMoveCount(0);
    setSourcePeg("1");
    setDestinationPeg("2");
    setBoard({});
  };

  const handleMove = () => {
    const sourceIdx = parseInt(sourcePeg) - 1;
    const destIdx = parseInt(destinationPeg) - 1;
    const results = newGame.move(sourceIdx, destIdx);
    setMoveCount(results.moveCount);
    setBoard(results.board);
    setMessage(results.message);
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
      const results = prev.start(pegCount, discCount);
      setBoard(results.board);
      setMessage(results.message);
      return {
        ...prev,
        ...results,
      };
    });
  };

  return (
    <main className="wrapper">
      <article className="region">
        <div className="stack">
          <h1 className="font-bold">Towers of Hanoi</h1>
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
            <Button disabled={newGame.isRunning()} onClick={handleStart}>
              start
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
            <Button disabled={!newGame.isRunning()} onClick={handleMove}>
              move
            </Button>
          </div>

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
      </article>
    </main>
  );
}
