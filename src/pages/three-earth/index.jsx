import "./index.css";
import ThreeSceneConstructorHelper from "./js/three-scene-constructor-helper";
import { useEffect } from "react";

const ThreeEarth = () => {
  useEffect(() => {
    ThreeSceneConstructorHelper.initThreeScene();
    // ThreeSceneConstructorHelper.loadSceneModel()
  }, []);

  return <div className="earth-container" id="container"></div>;
};

export default ThreeEarth;
