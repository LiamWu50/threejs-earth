import "./index.css";
import ThreeSceneConstructorHelper from "./js/three-scene-constructor-helper";
import { useEffect } from "react";

const ThreeEarth = () => {
  useEffect(() => {
    ThreeSceneConstructorHelper.initThreeScene();
<<<<<<< HEAD
    // ThreeSceneConstructorHelper.loadSceneModel()
  }, []);
=======
    ThreeSceneConstructorHelper.loadSceneModel()
  });
>>>>>>> e5252861cd0a596499dbe3454dbe467b7f9733bc

  return <div className="earth-container" id="container"></div>;
};

export default ThreeEarth;
