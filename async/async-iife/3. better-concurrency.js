/*
  The cool thing about this patterns is that with multiple tasks
  we're actually just leveraging local variables and concurrency by default
  to essentially create a dependancy graph - the one which the JS runtime
  knows how to optimally evaluate for us.
  And we didn't have to define any explicit execution order - we just wrapped
  sequential chunks (where every single line depends on the previous lines) in
  async IIFEs and modelled the constraints using local variables.
*/

const importHandler = async (file) => {
  // Read the file task
  const readTask = read(file);

  // Parse out the ID3 metadata task
  const metaTask = (async () => {
    const meta = await parser(file);
    const songMeta = mapSongMeta(file);
    const albumMeta = mapAlbumMeta(file);
    return { meta, songMeta, albumMeta };
  })();

  // Compute the duration task
  const durationTask = (async () => {
    const buffer = await readTask;
    const duration = getDuration(buffer);
    return duration;
  })();

  // Import the album task
  const albumTask = (async () => {
    const { albumMeta } = await metaTask;
    const albumId = await importAlbum(albumMeta);
    return albumId;
  })();

  // Import the song task
  const songTask = (async () => {
    const { meta, songMeta } = await metaTask;
    const duration = await durationTask;
    const albumId = await albumTask;

    const songId = await importSong({
      ...songMeta,
      albumId,
      file,
      duration,
      meta,
    });
    return songId;
  })();

  const songId = await songTask;

  return songId;
};
