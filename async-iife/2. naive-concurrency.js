/*
  The problem here is that even though we broke up code into concurrent chunks,
  we found that if a "file reader" finishes before the parser,
  the "getDuration" function could start executing immediately.

  In other words, despite us trying to optimise for concurrency by
  allowing tasks to run in parallel, we picked suboptimal groups of tasks.

  The solution might be in letting the JavaScript runtime to optimise the execution
  by itself - we just need to tell it what chunks of code depend on each other,
  a.k.a build a dependecy graph.
*/

const importHandler = async (file) => {
  const [buffer, meta] = await Promise.all([
    // Read the file
    await read(file),

    // Parse out the ID3 metadata
    await parser(file)
  ]);

  const songMeta = mapSongMeta(meta);
  const albumMeta = mapAlbumMeta(meta);

  const [duration, albumId] = await Promise.all([
    // Compute the duration
    await getDuration(buffer),

    // Import the album
    await importAlbum(albumMeta)
  ]);

  // Import the song
  const songId = await importSong({
    ...songMeta,
    albumId,
    file,
    duration,
    meta
  });

  return songId;
}