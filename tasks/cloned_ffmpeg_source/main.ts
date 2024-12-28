import type { Context } from "@oomol/types/oocana";
import {FfmpegCommand} from "fluent-ffmpeg";

type Inputs = Readonly<{ 
  ffmpeg_source: FfmpegCommand,
 }>;
type Outputs = Readonly<{
  cloned_ffmpeg_source: FfmpegCommand,
}>;


export default async function(
  params: Inputs,
  context: Context<Inputs, Outputs>
): Promise<Outputs> {
  const inputPath = (params.ffmpeg_source as any)._inputs[0].source
  const cloned_ffmpeg_source = params.ffmpeg_source.clone().input(inputPath); 
  return { cloned_ffmpeg_source: cloned_ffmpeg_source };
};
