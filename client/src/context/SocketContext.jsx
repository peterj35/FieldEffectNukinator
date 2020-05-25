import * as React from 'react';

import socketIOClient from "socket.io-client";

const socket = socketIOClient();
  
const SocketContext = React.createContext(socket)

export const useSocket = () => React.useContext(SocketContext)