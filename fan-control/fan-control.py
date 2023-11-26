import subprocess
from time import sleep
from gpiozero import PWMOutputDevice

# CONSTANTS
BASH_SENSORS_CMD = ["sensors", "-u"]
FAN_PIN = 18
FAN_OFF_THRESHOLD_DEGREES = 40.0
FAN_ON_THRESHOLD_DEGREES = 50.0
SLEEP_TIME_SECONDS = 15

# FAN OBJECT
fan = PWMOutputDevice(FAN_PIN)

# CONVERT VALUE FROM ONE RANGE INTO ANOTHER  https://stackoverflow.com/a/70659904
def MapRange(x, in_min, in_max, out_min, out_max):
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min

# CLAMP NUMBER https://www.geeksforgeeks.org/how-to-clamp-floating-numbers-in-python/
def Clamp(n, min, max):
    if n < min:
        return min
    elif n > max:
        return max
    else:
        return n

# GET CPU TEMP
def GetTemp():
  raw_sensors_str = str( subprocess.check_output(BASH_SENSORS_CMD) )

  temp_byte_index = raw_sensors_str.find("temp1_input: ")

  temp_str = raw_sensors_str[temp_byte_index + 13 : temp_byte_index + 19]
  temp = float(temp_str)

  return temp

# SET FAN DUTY CYCLE
def HandleFan(temp):
  print(temp)
  fan_value = MapRange(temp, FAN_OFF_THRESHOLD_DEGREES, FAN_ON_THRESHOLD_DEGREES, 0.0, 1.0)
  fan_value_01 = Clamp(fan_value, 0.0, 1.0)
  print(fan_value_01)

  fan.value = fan_value_01

# LOOP
while True:
  HandleFan(GetTemp())
  sleep(SLEEP_TIME_SECONDS)
