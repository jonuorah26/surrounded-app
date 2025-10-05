import { Audio } from "expo-av";

let alarmSound: Audio.Sound | null = null;

export async function playAlarm() {
  if (!alarmSound) {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio.wav")
    );
    alarmSound = sound;
  }
  await alarmSound.playAsync();
  //await stopAlarm();
}

export async function stopAlarm() {
  if (alarmSound) {
    await alarmSound.stopAsync();
    // or unload if you don't need it again
    // await alarmSound.unloadAsync();
  }
}
