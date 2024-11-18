const audioContext = new window.AudioContext();

function playTone({
  frequency,
  duration,
}: {
  frequency: number;
  duration: number;
}) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  const gainNode = audioContext.createGain();
  oscillator.connect(audioContext.destination);
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

export { playTone };
