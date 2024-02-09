import { useState } from "react";
import RecoverPasswordCard from "./RecoverPasswordCard";
import ChangeRecoverCard from "./ChangeRecoverCard";

const ParentComponent = () => {
  const [isRecoverPasswordCardVisible, setRecoverPasswordCardVisibility] =
    useState(true);
  const [isChangeRecoverCardVisible, setChangeRecoverCardVisibility] =
    useState(false);

  const handleRecoverPasswordSubmit = () => {
    setRecoverPasswordCardVisibility(false);
    setChangeRecoverCardVisibility(true);
  };

  return (
    <div>
      {isRecoverPasswordCardVisible && (
        <RecoverPasswordCard
          onClose={() => setRecoverPasswordCardVisibility(false)}
          onSubmit={handleRecoverPasswordSubmit}
        />
      )}
      {isChangeRecoverCardVisible && (
        <ChangeRecoverCard
          onClose={() => setChangeRecoverCardVisibility(false)}
        />
      )}
    </div>
  );
};

export default ParentComponent;
