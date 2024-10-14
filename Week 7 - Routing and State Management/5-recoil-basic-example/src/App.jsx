import { useRecoilValue } from "recoil";

import { allNotificationsCount, jobsAtom, messagingAtom, networkAtom, notificationsAtom } from "./recoil/atoms";

function App() {
  const myNetworkCount = useRecoilValue(networkAtom);
  const jobsCount = useRecoilValue(jobsAtom);
  const messagesCount = useRecoilValue(messagingAtom);
  const notificationsCount = useRecoilValue(notificationsAtom);
  const allNotifications = useRecoilValue(allNotificationsCount);

  return (
    <>
      <button>My network ({myNetworkCount >= 100 ? "99+" : myNetworkCount})</button> &nbsp;
      <button>Jobs ({jobsCount >= 100 ? "99+" : jobsCount})</button> &nbsp;
      <button>Messages ({messagesCount >= 100 ? "99+" : messagesCount})</button> &nbsp;
      <button>Notifications ({notificationsCount >= 100 ? "99+" : notificationsCount})</button> &nbsp;
      <button>Me ({allNotifications})</button>
    </>
  );
}

export default App;
