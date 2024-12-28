import type { Context } from "@oomol/types/oocana";
import {FfmpegCommand} from "fluent-ffmpeg";

type Inputs = Readonly<{ 
  ffmpeg_source: FfmpegCommand,
 }>;
type Outputs = Readonly<{
  ffmpeg_only_video: FfmpegCommand,
  ffmpeg_only_audio: FfmpegCommand,
}>;

export default async function(inputs: Inputs, context: Context): Promise< Outputs> {
  const inputPath = (inputs.ffmpeg_source as any)._inputs[0].source
  const video = inputs.ffmpeg_source.clone().input(inputPath).noAudio();
  const audio = inputs.ffmpeg_source.clone().input(inputPath).noVideo();


  return { ffmpeg_only_video: video, ffmpeg_only_audio: audio};
};