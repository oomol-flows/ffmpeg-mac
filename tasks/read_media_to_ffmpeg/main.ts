import type { Context } from "@oomol/types/oocana";
import ffmpeg, { FfmpegCommand } from "fluent-ffmpeg";
import { extractBaseName  } from "../../utils/get-file-name"

type Inputs = Readonly<{ video_source: string }>;
type Outputs = Readonly<{ ffmpeg_source: FfmpegCommand, file_address: string, file_name: string }>;

export default async function (inputs: Inputs, context: Context): Promise<Outputs> {
  const source = ffmpeg(inputs.video_source);
  const file_name = extractBaseName(inputs.video_source);
  return { ffmpeg_source: source, file_address: inputs.video_source, file_name: file_name };
};