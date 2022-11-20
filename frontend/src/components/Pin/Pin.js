import { AiOutlineLoading3Quarters } from "react-icons/ai";

import PinImage from "./PinImage";
import PinInfo from "./PinInfo";

const Pin = ({
  pinInfo,
  pinUserInfo,
  fileInfo,
  pinTags,
  isLoading,
  pinDelete,
}) => {
  let loading = <></>;

  if (isLoading || pinDelete) {
    loading = <AiOutlineLoading3Quarters />;
  }

  let currentMode = (
    <PinInfo pinInfo={pinInfo} pinUserInfo={pinUserInfo} pinTags={pinTags} />
  );

  return (
    <div>
      {loading}
      <PinImage fileInfo={fileInfo} />
      {currentMode}
    </div>
  );
};

export default Pin;
