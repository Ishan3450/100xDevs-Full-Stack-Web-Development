import { useRecoilValue } from "recoil";
import "./App.css";
import { allNotificationsAtom, allNotificationsCountSelector } from "./recoil/atoms";

function App() {
  const allNotifications = useRecoilValue(allNotificationsAtom);
  const allNotificationsCount = useRecoilValue(allNotificationsCountSelector);

  return (
    <>
      <button>My network ({allNotifications.network})</button> &nbsp;
      <button>Jobs ({allNotifications.jobs})</button> &nbsp;
      <button>Messages ({allNotifications.messaging})</button> &nbsp;
      <button>Notifications ({allNotifications.notifications})</button> &nbsp;
      <button>Me ({allNotificationsCount})</button>
    </>
  );
}

export default App;
