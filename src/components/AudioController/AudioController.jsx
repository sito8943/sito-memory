import React, { useEffect } from "react";

// context
import { useAudioConfig } from "../../context/AudioConfig";
import { useAudioController } from "../../context/AudioController";

// sfx
/* import popUpAudio from "../../assets/audio/popUp.mp3";
import clickAudio from "../../assets/audio/ui5.mp3";
import errorAudio from "../../assets/audio/ui1.mp3";
import goodAudio from "../../assets/audio/bigClick.mp3"; */

// controllers
/* const popUp = new Audio(popUpAudio);
const normalClick = new Audio(clickAudio);
const error = new Audio(errorAudio);
const good = new Audio(goodAudio); */

const AudioController = () => {
  const { audioConfigState } = useAudioConfig();
  const { audioControllerState } = useAudioController();

  useEffect(() => {
    if (audioConfigState.sfx) {
      /*     popUp.load();
      error.load();
      good.load();
      normalClick.load(); */
    }
  }, []);

  useEffect(() => {
    if (audioControllerState.good) {
      /*       good.currentTime = 0;
      good.play(); */
    }
  }, [audioControllerState.good]);

  useEffect(() => {
    if (audioControllerState.popUp) {
      /*    popUp.currentTime = 0;
      popUp.play(); */
    }
  }, [audioControllerState.popUp]);

  useEffect(() => {
    if (audioControllerState.error) {
      /*   error.currentTime = 0;
      error.play(); */
    }
  }, [audioControllerState.error]);

  useEffect(() => {
    if (audioControllerState.normalClick) {
      /*  normalClick.currentTime = 0;
      normalClick.play(); */
    }
  }, [audioControllerState.normalClick]);

  return <></>;
};

export default AudioController;
