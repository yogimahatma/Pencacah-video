export interface FrameData {
  id: string;
  timestamp: number;
  blob: Blob;
  url: string;
  fileName: string;
  aiPrompt?: string;
}

export interface ProcessingStats {
  totalFrames: number;
  processedFrames: number;
  startTime: number;
  estimatedTimeRemaining: number | null;
}

export enum AppState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}