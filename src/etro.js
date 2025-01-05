// import etro from 'etro'

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

setTimeout(() => {


  var movie = new etro.Movie({ canvas })
  movie.width = 1080
  movie.height = 720
  // const layer = new etro.layer.Visual({
  //   startTime: 0,
  //   duration: 2,
  //   background: etro.parseColor("blue"),
  // });
  // const layer2 = new etro.layer.Visual({
  //   startTime: 12,
  //   duration: 2,
  //   background: etro.parseColor("green"),
  // });
  var base2 = new etro.layer.Video({ startTime: 0, duration: 38, source: './base/2.mp4' })  // the layer starts at 0s
  var layer3 = new etro.layer.Video({ startTime: 2, duration: 10, source: './effects/video_effects/RABBITHAVE4side.mp4' })  // the layer starts at 0s
  const effect = new etro.effect.ChromaKey({
    target: { r: 0, g: 255, b: 0 },
    threshold: 0.1,
    interpolate: true,
  });

  layer3.effects.push(effect)
  movie.addLayer(base2);
  movie.addLayer(layer3);
  // movie.addLayer(layer2);

  movie
    .record({
      frameRate: 60,
      mediaRecorderOptions: {
        mimeType: 'video/webm',
        bitsPerSecond: 12000000,
        videoBitsPerSecond: 12000000,
        audioBitRate: 128000,
      },
      onProgress: (progress) => {
        console.log(`Progress: ${progress}`);
      },
    })
    .then((blob) => {
      // Create a download link for the video
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'output.webm';
      document.body.appendChild(a);
      a.click();

      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);

      console.log(`Recorded ${blob.size} bytes and saved as output.mp4`);
    });
}, 2000)