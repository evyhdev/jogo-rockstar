export class GameTimer {
  private interval: NodeJS.Timeout | null = null;
  private remainingSeconds: number;

  constructor(
    durationSeconds: number,
    private onTick: (secondsLeft: number) => void,
    private onExpire: () => void
  ) {
    this.remainingSeconds = durationSeconds;
  }

  start() {
    this.stop();
    this.onTick(this.remainingSeconds);
    this.interval = setInterval(() => {
      this.remainingSeconds -= 1;
      if (this.remainingSeconds <= 0) {
        this.stop();
        this.onTick(0);
        this.onExpire();
        return;
      }
      this.onTick(this.remainingSeconds);
    }, 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  setDuration(seconds: number) {
    this.remainingSeconds = seconds;
  }

  getTimeLeft() {
    return this.remainingSeconds;
  }
}
