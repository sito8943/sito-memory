import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";

// tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

// styles
import "./style.css";

// @mui components
import { Box } from "@mui/material";

// layouts
import Player from "../../layouts/Player/Player";
import Restart from "../../layouts/Restart/Restart";
import Score from "../../layouts/Score/Score";
import BuyCard from "../../layouts/BuyCard/BuyCard";
import About from "../../layouts/About/About";

// context
import { useAudioController } from "../../context/AudioController";
import { useAudioConfig } from "../../context/AudioConfig";
import { useScore } from "../../context/Score";

const Board = () => {
  const { audioConfigState } = useAudioConfig();
  const { setAudioControllerState } = useAudioController();
  const { scoreState } = useScore();

  const rows = () => {
    const final = [];
    for (let i = 0; i < 7; i += 1) final.push(i);
    return final;
  };

  const columns = () => {
    const final = [];
    for (let i = 0; i < 7; i += 1) final.push(i);
    return final;
  };

  const playSound = (sound) => {
    if (audioConfigState.sfx) setAudioControllerState({ type: sound });
  };

  const [field, setField] = useState([]);
  const [points, setPoints] = useState(0);
  const [active1, setActive1] = useState({ y: -1, x: -1 });
  const [active2, setActive2] = useState({ y: -1, x: -1 });

  useEffect(() => {
    const logicMatrix = [];
    for (let i = 0; i < 7; i += 1) {
      const row = [];
      for (let j = 0; j < 7; j += 1)
        row.push({ value: j, desc: "description", active: "normal" });
      logicMatrix.push(row);
    }
    setField(logicMatrix);
  }, []);

  const flip = (e) => {
    const { id } = e.target;
    const parsed = id.substring(4).split(",");
    if (active1.x !== Number(parsed[0]) || active1.y !== Number(parsed[1])) {
      playSound("pop-up");
      if (active1.x === -1)
        setActive1({ y: Number(parsed[0]), x: Number(parsed[1]) });
      else if (active2.x === -1) {
        setActive2({ y: Number(parsed[0]), x: Number(parsed[1]) });
        if (
          field[active1.y][active1.x].value ===
          field[Number(parsed[0])][Number(parsed[1])].value
        ) {
          setTimeout(() => {
            const newField = field;
            newField[active1.y][active1.x].active = "earned";
            newField[Number(parsed[0])][Number(parsed[1])].active = "earned";
            setField(newField);
            setTimeout(() => {
              playSound("good");
              setPoints(points + 2);
            }, 700);
          }, 100);
        } else {
          setTimeout(() => {
            const newField = field;
            newField[active1.y][active1.x].active = "wrong";
            newField[Number(parsed[0])][Number(parsed[1])].active = "wrong";
            setField(newField);
            setTimeout(() => {
              playSound("error");
              setPoints(points - 1);
            }, 700);
          }, 100);
        }
        setTimeout(() => {
          setActive1({ y: -1, x: -1 });
          setActive2({ y: -1, x: -1 });
        }, 1000);
      }
    }
  };

  useEffect(() => {}, [scoreState.score]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      <Player points={points} />
      <Restart />
      <Score visible={scoreState.score} />
      <BuyCard />
      <About />
      <Box>
        {field.length && (
          <>
            {" "}
            {field.map((item, i) => {
              return (
                <Box key={`row${i}`} className="row">
                  {field[i].map((jtem, j) => {
                    return (
                      <Box key={`cell${i},${j}`} className="cell">
                        <div className={`${jtem.active}`}>
                          <Button
                            id={`cell${i},${j}`}
                            onClick={flip}
                            className={`card ${
                              (active1.x === j && active1.y === i) ||
                              (active2.x === j && active2.y === i) ||
                              jtem.active === "earned"
                                ? "rotate"
                                : "return"
                            }`}
                            sx={{
                              transition: "all 400ms ease",
                            }}
                            variant="contained"
                            fullWidth
                          >
                            {(active1.x === j && active1.y === i) ||
                            (active2.x === j && active2.y === i) ||
                            jtem.active === "earned" ? (
                              <Box>
                                {jtem.active === "earned" ? (
                                  <Tippy content={jtem.desc}>
                                    <Typography>{jtem.value}</Typography>
                                  </Tippy>
                                ) : (
                                  <Typography>{jtem.value}</Typography>
                                )}
                              </Box>
                            ) : (
                              ""
                            )}
                          </Button>
                        </div>
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Board;
