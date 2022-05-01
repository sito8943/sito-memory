import { Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";

// tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

// styles
import "./style.css";

// @mui components
import { Box, useTheme } from "@mui/material";

// own components
import Loading from "../../components/Loading/Loading";

// layouts
import Player from "../../layouts/Player/Player";
import Restart from "../../layouts/Restart/Restart";
import Score from "../../layouts/Score/Score";
import BuyCard from "../../layouts/BuyCard/BuyCard";
import About from "../../layouts/About/About";
import WinDialog from "../../layouts/WinDialog/WinDialog";
import Difficulty from "../../layouts/Difficulty/Difficulty";

// context
import { useAudioController } from "../../context/AudioController";
import { useAudioConfig } from "../../context/AudioConfig";
import { useLanguage } from "../../context/Language";
import { useScore } from "../../context/Score";

// services
import { FetchFromServer } from "../../services/get";

// test
import test from "../../test";

const Board = () => {
  const { languageState } = useLanguage();
  const { audioConfigState } = useAudioConfig();
  const { setAudioControllerState } = useAudioController();
  const { scoreState } = useScore();
  const theme = useTheme();

  const playSound = (sound) => {
    if (audioConfigState.sfx) setAudioControllerState({ type: sound });
  };

  const [count, setCount] = useState(4);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(-1);
  const [field, setField] = useState([]);
  const [points, setPoints] = useState(0);
  const [active1, setActive1] = useState({ y: -1, x: -1 });
  const [active2, setActive2] = useState({ y: -1, x: -1 });

  const init = async () => {
    const data = await FetchFromServer("data", { idApp: "memory" });
    if (!data.error) setError(-1);
    else {
      const localData = test;
      const logicMatrix = [];
      const rowMatrix = [];
      const randomPos = [];
      const pow = count * count;
      for (let i = 0; i < pow; i += 1) {
        rowMatrix.push({ value: -1, desc: "description", active: "normal" });
        randomPos.push(i);
      }

      localData.forEach((item, i) => {
        let randomX1 = randomPos.splice(
          Math.floor(Math.random() * (randomPos.length - 1)),
          1
        )[0];
        let randomX2 = randomPos.splice(
          Math.floor(Math.random() * (randomPos.length - 1)),
          1
        )[0];
        rowMatrix[randomX1].value = item;
        rowMatrix[randomX2].value = item;
      });

      let w = 0;
      for (let i = 0; i < count; i += 1) {
        const row = [];
        for (let j = 0; j < count; j += 1) {
          row.push(rowMatrix[w]);
          w += 1;
        }
        logicMatrix.push(row);
      }
      setField(logicMatrix);
    }
  };

  useEffect(() => {
    init();
  }, [count]);

  const flip = (e) => {
    const { id } = e.target;
    const parsed = id.substring(4).split(",");
    if (active1.y !== Number(parsed[0]) || active1.x !== Number(parsed[1])) {
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
            isFinished();
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

  const isFinished = () => {
    for (let i = 0; i < field.length; i += 1)
      for (let j = 0; j < field[i].length; j += 1)
        if (field[i][j].active !== "earned") return;
    setFinished(true);
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
      <Loading
        sx={{
          width: "100vw",
          height: "100vh",
          opacity: field.length || error !== -1 ? 0 : 1,
          zIndex: field.length || error !== -1 ? -1 : 99,
          position: "fixed",
        }}
      />{" "}
      <Difficulty sx={{}} />
      <WinDialog
        sx={{
          opacity: finished ? 1 : 0,
          zIndex: finished ? 99 : -1,
        }}
        finished={finished}
      />
      <Player points={points} />
      <Restart />
      <Score visible={scoreState.score} />
      <BuyCard />
      <About />
      <Box>
        {error !== -1 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              textAlign="center"
              sx={{ color: theme.palette.error.light, margin: "10px" }}
            >
              {languageState.texts.Errors[error]}
            </Typography>
            <Button variant="contained" onClick={() => init()}>
              {languageState.texts.Buttons.Retry}
            </Button>
          </Box>
        )}
        {field.length ? (
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
                              padding: 0,
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
                                    <img
                                      src={jtem.value}
                                      alt="card"
                                      className="image-card"
                                    />
                                  </Tippy>
                                ) : (
                                  <img
                                    src={jtem.value}
                                    alt="card"
                                    className="image-card"
                                  />
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
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default Board;
