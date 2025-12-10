"use client";

import styles from "./page.module.css";
import { Cog, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { game } from "@/my-towers";

type Peg = {
  discs: number[];
};

type Board = {
  pegs: Peg[];
};

type Game = {
  handleMove: (sourcePeg: number, destinationPeg: number) => void;
};

const instructions = ` To win, you must successfully move all of the discs from one peg to another and in their original order. You may only move the topmost disc from a peg, and you may not move a larger disc onto a smaller one.`;

const link = "http://en.wikipedia.org/wiki/Tower_of_Hanoi";

const ItemTypes = {
  DISC: "disc",
};

const GameControls = ({
  handleMove,
  sourcePeg,
  setSourcePeg,
  destinationPeg,
  setDestinationPeg,
  isRunning,
}: {
  destinationPeg: number;
  handleMove: Game["handleMove"];
  isRunning: boolean;
  setDestinationPeg: React.Dispatch<React.SetStateAction<number>>;
  setSourcePeg: React.Dispatch<React.SetStateAction<number>>;
  sourcePeg: number;
}) => {
  return (
    <div className="cluster gap-6">
      <div className="cluster gap-2">
        <div className="cluster gap-2">
          <p>{`Source:`}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{sourcePeg}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Source Peg</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sourcePeg?.toString() || "1"}
                onValueChange={(value) => setSourcePeg(parseInt(value))}
              >
                <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="3">3</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="cluster gap-2">
          <p>{`Destination:`}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{destinationPeg}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Destination Peg</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={destinationPeg?.toString() || "2"}
                onValueChange={(value) => setDestinationPeg(parseInt(value))}
              >
                <DropdownMenuRadioItem value="1">1</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2">2</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="3">3</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="cluster">
        <Button
          disabled={!isRunning}
          onClick={() => {
            if (sourcePeg !== undefined && destinationPeg !== undefined) {
              handleMove(sourcePeg, destinationPeg);
            }
          }}
        >
          move
        </Button>
        {/* {process.env.NODE_ENV === "development" && (
          <Button onClick={winningGame}>Quick Win</Button>
        )} */}
      </div>
    </div>
  );
};

const SettingsDrawer = ({
  a11tyControls,
  setA11tyControls,
}: {
  a11tyControls: boolean;
  setA11tyControls: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <div className="cluster">
          <Button variant="ghost">
            <span className="text-step--1">settings</span>
            <Cog />
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
          </DrawerHeader>
          <div className="p-8">
            <div className="cluster gap-2">
              <Label htmlFor="a11ty-controls">Accessibility Controls</Label>
              <Switch
                id="a11ty-controls"
                checked={a11tyControls}
                onClick={() => setA11tyControls(!a11tyControls)}
              />
            </div>
          </div>
        </div>
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
      </DrawerContent>
    </Drawer>
  );
};

const InstructionsDrawer = () => {
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <div className="cluster">
          <Button variant="ghost">
            <span className="text-step--1">instructions</span>
            <Info />
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Instructions</DrawerTitle>
          </DrawerHeader>
          <div className="stack p-8">
            <p className="text-step--1">
              Based on the game called{" "}
              <a
                className="font-bold hover:underline"
                href={link}
                target="_blank"
              >
                Tower of Hanoi
              </a>
              .
            </p>
            <p className="text-step--1">{instructions}</p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const Disc = ({
  value,
  source,
  setSource,
}: {
  value: number;
  source: number;
  setSource: React.Dispatch<React.SetStateAction<number | undefined>>;
}) => {
  // TODO: detect if the disc can be moved.
  // if it is moveable, show the grab
  // else, show cursor-not-allowed
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.DISC,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (isDragging) {
      setSource(source);
    }
  }, [isDragging, setSource, source]);

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>} // type casting override
      style={{
        background: isDragging ? "green" : "none",
      }}
    >
      <svg
        className="fill-dark dark:fill-light hover:cursor-grab select-none"
        width="3ch"
        height="3ch"
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
    </div>
  );
};

const PegIdentifier = ({ value }: { value: number }) => {
  return (
    <svg
      className="fill-red-400 select-none"
      width="3ch"
      height="3ch"
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

const Peg = ({
  value,
  discs = [],
  sourcePeg,
  setSourcePeg,
  handleMove,
}: {
  value: number;
  discs: number[];
  sourcePeg: number | undefined;
  setSourcePeg: React.Dispatch<React.SetStateAction<number | undefined>>;
  handleMove: Game["handleMove"];
}) => {
  // how to get source peg? move state of the thing up?
  const handleDrop = (
    sourcePeg: number | undefined,
    destinationPeg: number
  ) => {
    if (sourcePeg !== undefined) {
      handleMove(sourcePeg, destinationPeg);
    }
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.DISC,
      drop: () => handleDrop(sourcePeg, value),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [value, sourcePeg]
  );

  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>} // type casting override
      className={`${styles["peg"]}`}
      style={{
        background: isOver ? "pink" : "none",
      }}
    >
      {/* <PegIdentifier value={value} /> */}
      {discs?.map((disc: number, idx: number) => {
        return (
          <Disc
            key={idx}
            value={disc}
            source={value}
            setSource={setSourcePeg}
          />
        );
      })}
    </div>
  );
};

const Board = ({
  pegs,
  handleMove,
}: {
  pegs: Peg[];
  handleMove: (sourcePeg: number, destinationPeg: number) => void;
}) => {
  const [source, setSource] = useState<number>();

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className={`${styles.board}`}>
        {pegs.map((peg, idx) => {
          return (
            <Peg
              key={idx}
              value={idx + 1}
              discs={peg.discs}
              sourcePeg={source}
              setSourcePeg={setSource}
              handleMove={handleMove}
            ></Peg>
          );
        })}
      </div>
    </DndProvider>
  );
};

export default function Home() {
  // const [pegCount, setPegCount] = useState(3);
  // const [discCount, setDiscCount] = useState(5);
  const [a11tyControls, setA11tyControls] = useState(false);
  const [newGame, setNewGame] = useState(game());
  const [moveCount, setMoveCount] = useState(0);
  const [winCount, setWinCount] = useState(0);
  const [sourcePeg, setSourcePeg] = useState(1);
  const [destinationPeg, setDestinationPeg] = useState(2);
  const [message, setMessage] = useState(newGame.message);
  const [winningState, setWinningState] = useState(false);

  const handleReset = () => {
    setMoveCount(0);
    setSourcePeg(1);
    setDestinationPeg(2);
    setWinningState(false);
    setNewGame(game());
  };

  const handleMove: Game["handleMove"] = (sourcePeg, destinationPeg) => {
    const sourceIdx = sourcePeg - 1;
    const destIdx = destinationPeg - 1;
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

  // const winningGame = () => {
  //   handleMove("1", "2");
  //   handleMove("1", "3");
  //   handleMove("2", "3");
  //   handleMove("1", "2");
  //   handleMove("3", "1");
  //   handleMove("3", "2");
  //   handleMove("1", "2");
  //   handleMove("1", "3");
  //   handleMove("2", "3");
  //   handleMove("2", "1");
  //   handleMove("3", "1");
  //   handleMove("2", "3");
  //   handleMove("1", "2");
  //   handleMove("1", "3");
  //   handleMove("2", "3");
  //   handleMove("1", "2");
  //   handleMove("3", "2");
  //   handleMove("3", "1");
  //   handleMove("2", "3");
  //   handleMove("1", "2");
  //   handleMove("3", "2");
  //   handleMove("3", "1");
  //   handleMove("2", "3");
  //   handleMove("2", "1");
  //   handleMove("3", "1");
  //   handleMove("3", "2");
  //   handleMove("1", "2");
  //   handleMove("1", "3");
  //   handleMove("2", "3");
  //   handleMove("1", "2");
  //   handleMove("3", "1");
  //   handleMove("3", "2");
  //   handleMove("1", "2");
  // };

  return (
    <main className="wrapper">
      <article className="region">
        <div className="stack">
          <div className="cluster">
            <h1 className="font-bold">My Towers</h1>
            <div className="cluster gap-1">
              <InstructionsDrawer />
              <SettingsDrawer
                a11tyControls={a11tyControls}
                setA11tyControls={setA11tyControls}
              />
            </div>
          </div>

          {/* game stats and controls */}
          <div className="cluster">
            <p>{`Wins: ${winCount}`}</p>
            <p>{`Moves: ${moveCount}`}</p>
            <div className="cluster gap-4">
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
          </div>

          <div>
            <div className="stack">
              {/* board */}
              {newGame?.board?.pegs && (
                <Board
                  pegs={newGame?.board?.pegs}
                  handleMove={handleMove}
                ></Board>
              )}

              {/* controls */}
              {a11tyControls && (
                <GameControls
                  sourcePeg={sourcePeg}
                  destinationPeg={destinationPeg}
                  setSourcePeg={setSourcePeg}
                  setDestinationPeg={setDestinationPeg}
                  isRunning={newGame.isRunning()}
                  handleMove={handleMove}
                />
              )}

              {/* game messages */}
              {newGame?.message && newGame?.error && <p>{message}</p>}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
