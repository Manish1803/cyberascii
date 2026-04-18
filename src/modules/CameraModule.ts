export class CameraModule {
  private video: HTMLVideoElement | null = null;
  private stream: MediaStream | null = null;

  async initialize(width: number, height: number): Promise<HTMLVideoElement> {
    if (this.video) return this.video;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: width },
          height: { ideal: height },
          facingMode: 'user'
        },
        audio: false
      });

      this.video = document.createElement('video');
      this.video.srcObject = this.stream;
      this.video.autoplay = true;
      this.video.playsInline = true;

      return new Promise((resolve) => {
        if (!this.video) return;
        this.video.onloadedmetadata = () => {
          this.video?.play();
          resolve(this.video!);
        };
      });
    } catch (error) {
      console.error('Camera initialization failed:', error);
      throw error;
    }
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.video) {
      this.video.pause();
      this.video.srcObject = null;
      this.video = null;
    }
  }
}
