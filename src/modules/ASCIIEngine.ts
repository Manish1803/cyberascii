export interface ASCIIOptions {
  width: number;
  height: number;
  chars: string;
  gain: number;
  contrast: number;
}

export class ASCIIEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;
  }

  process(video: HTMLVideoElement, options: ASCIIOptions): string {
    const { width, height, chars, gain, contrast } = options;
    
    this.canvas.width = width;
    this.canvas.height = height;

    // Draw video frame to hidden canvas
    this.ctx.drawImage(video, 0, 0, width, height);

    // Get pixel data
    const imageData = this.ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    
    let ascii = '';

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const offset = (y * width + x) * 4;
        const r = pixels[offset];
        const g = pixels[offset + 1];
        const b = pixels[offset + 2];

        // Grayscale conversion
        let gray = (0.299 * r + 0.587 * g + 0.114 * b);

        // Apply Gain and Contrast
        gray = ((gray - 128) * contrast + 128) * gain;
        gray = Math.max(0, Math.min(255, gray));

        // Map to ASCII character
        const charIdx = Math.floor((gray / 255) * (chars.length - 1));
        ascii += chars[charIdx];
      }
      ascii += '\n';
    }

    return ascii;
  }
}
