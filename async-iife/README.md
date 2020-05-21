We're building iTunes in a browser.
We need to write the code for importing .mp3 files into our music library.
User can import by drag-&-droping their .mp3 files onto an application window.

There're 5 steps to import a song:
  1. Read file
  2. Parse ID3 Metadata
  3. Calculate duration (most parser don't include duration info)
  4. Import album (in case the album doesn't exist)
  5. Import song