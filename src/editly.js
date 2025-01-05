import editly from 'editly';

await editly({
  clips: [
    {
      layers: [
        {
          type: "gl",
          fragmentPath: "./effects/fragments/chromakey.frag",
          uniforms: {
            u_Color: [0, 1, 0],
            u_Threshold: 0.1,
            u_Source: { type: "video", path: "./effects/video_effects/boom.mp4" },
          },
        },
      ],
    },
  ],
  outPath: "output.mp4",
  verbose: true,
})
