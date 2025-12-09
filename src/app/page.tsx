"use client";

import styles from "./page.module.css";
import { ChevronsUpDown, Cog } from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { game } from "@/my-towers";

const instructions = ` To win, you must successfully move all of the discs from one peg to another and in their original order. You may only move the topmost disc from a peg, and you may not move a larger disc onto a smaller one.`;

const link = "http://en.wikipedia.org/wiki/Tower_of_Hanoi";

const Disc = ({ value }: { value: number }) => {
  // detect if the disc can be moved.
  // if it is moveable, show the grab
  // else, show cursor-not-allowed
  return (
    <svg
      className="fill-dark dark:fill-light hover:cursor-grab"
      width="2.5ch"
      height="2.5ch"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="40" color="inherit" />
      <text
        className="fill-light dark:fill-dark"
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="40"
        fontWeight="bold"
      >
        {value}
      </text>
    </svg>
  );
};

const PegIdentifier = ({ value }: { value: number }) => {
  return (
    <svg
      className="fill-red-400"
      width="2.5ch"
      height="2.5ch"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="40" color="inherit" />
      <text
        className="fill-white"
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="40"
        fontWeight="bold"
      >
        {value}
      </text>
    </svg>
  );
};

export default function Home() {
  // const [pegCount, setPegCount] = useState(3);
  // const [discCount, setDiscCount] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [a11tyControls, setA11tyControls] = useState(false);
  const [newGame, setNewGame] = useState(game());
  const [moveCount, setMoveCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [sourcePeg, setSourcePeg] = useState("1");
  const [destinationPeg, setDestinationPeg] = useState("2");
  const [selectedPeg, setSelectedPeg] = useState("source");
  const [message, setMessage] = useState(newGame.message);
  const [winningState, setWinningState] = useState(false);

  const handlePegSelect = (pegValue: number) => {
    if (selectedPeg === "source") {
      setSourcePeg((pegValue + 1).toString());
      setSelectedPeg("destination");
    }
    if (selectedPeg === "destination") {
      setDestinationPeg((pegValue + 1).toString());
      setSelectedPeg("source");
    }
  };

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
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex flex-col gap-4"
          >
            <CollapsibleTrigger asChild>
              <div className="cluster">
                <Button variant="ghost">
                  <span className="text-step--1">instructions</span>
                  <ChevronsUpDown />
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-2">
              <p className="text-step--1">
                Based on the game called{" "}
                <a className="font-bold hover:underline" href={link}>
                  Tower of Hanoi
                </a>
                .
              </p>
              <p className="text-step--1">{instructions}</p>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible
            open={settingsOpen}
            onOpenChange={setSettingsOpen}
            className="flex flex-col gap-4"
          >
            <CollapsibleTrigger asChild>
              <div className="cluster">
                <Button variant="ghost">
                  <span className="text-step--1">settings</span>
                  <Cog />
                </Button>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-2">
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
              <div className="flex items-center space-x-2">
                <Switch
                  id="a11ty-controls"
                  onClick={() => setA11tyControls(!a11tyControls)}
                />
                <Label htmlFor="a11ty-controls">Accessibility Controls</Label>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <div className="cluster">
            <p>{`Wins: ${winCount}`}</p>
            <p>{`Moves: ${moveCount}`}</p>
          </div>

          <div className="cluster">
            <Button
              className="bg-cyan-400"
              disabled={newGame.isRunning()}
              onClick={winningState ? handleReset : handleStart}
            >
              {winningState ? "reset" : "start"}
            </Button>
            <Button
              className="bg-red-400"
              disabled={!newGame.isRunning()}
              onClick={handleEnd}
            >
              end
            </Button>
          </div>

          {/* game messages */}
          {newGame?.message && newGame?.error && <p>{message}</p>}

          {/* a11ty controls */}
          {a11tyControls && (
            <>
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
            </>
          )}

          {/* board */}
          {newGame?.board?.pegs && (
            <div className={`${styles.board}`}>
              {newGame?.board?.pegs.map((peg, idx) => {
                return (
                  <div
                    key={idx}
                    className="cluster gap-4"
                    onClick={() => handlePegSelect(idx)}
                  >
                    <PegIdentifier value={idx + 1} />
                    {peg.discs.map((disc: number, idx: number) => {
                      return <Disc key={idx} value={disc} />;
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
