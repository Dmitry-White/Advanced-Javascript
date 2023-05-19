/*
  The problem here is in the blocking execution 
  (in terms of "one operation after another").
  E.g we don't really need "duration" to start importing "album",
  we could be doing it concurrently.
*/

const importHandler = async (file) => {
  // Read the file
  const buffer = await read(file);

  // Parse out the ID3 metadata
  const meta = await parser(file);
  const songMeta = mapSongMeta(meta);
  const albumMeta = mapAlbumMeta(meta);

  // Compute the duration
  const duration = await getDuration(buffer);

  // Import the album
  const albumId = await importAlbum(albumMeta);

  // Import the song
  const songId = await importSong({
    ...songMeta,
    albumId,
    file,
    duration,
    meta,
  });

  return songId;
};
