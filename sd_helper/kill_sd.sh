pid=$(ps -ef | grep "python3 launch.py" | grep -v grep | awk '{print $2}')
kill -9 $pid