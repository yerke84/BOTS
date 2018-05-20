#!/bin/bash
PORT=1984
SD="abkom"
echo "Starting abk om localtunnel on port" $PORT "..."
while true
  do lt --port $PORT -s $SD
  sleep 1
  echo "Restarting abk om localtunnel on port" $PORT "..."
done
