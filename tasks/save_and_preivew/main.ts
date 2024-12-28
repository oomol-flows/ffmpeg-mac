import type { Context } from "@oomol/types/oocana";
import { FfmpegCommand } from "fluent-ffmpeg";

type Inputs = Readonly<{
  ffmpeg_source: FfmpegCommand,
  file_name: string,
  formate: string,
  save_address: string | null,
}>;
type Outputs = Readonly<{ file_adress: string }>;

export default async function (params: Inputs, context: Context): Promise<Outputs> {

  const save_address = params.save_address ? `${params.save_address}/${params.file_name}.${params.formate}` : `${context.sessionDir}/${params.file_name}.${params.formate}`
  try {
    await new Promise((resolve, reject) => {
      params.ffmpeg_source
        .save(save_address)
        .inputOption('-hwaccel', 'videotoolbox')
        .videoCodec('h264_videotoolbox').on("end", () => {
          resolve("ok");
        }).on('error', (err) => {
          console.log("ffmpeg error")
          reject(err);
        });
    });
    console.log('Conversion complete');
  } catch (err) {
    console.error('Error during conversion:', err);
  } finally {
    console.log(save_address);
    context.preview({ type: params.formate === "mp4" ? "video" : "audio", data: save_address })
    return { file_adress: save_address };
  }
};