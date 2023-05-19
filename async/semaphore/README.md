We're building iTunes in a browser.
We need to write the code for importing .mp3 files into our music library.
User can import by drag-&-droping their .mp3 files onto an application window.

What if the user drag-&-drops a huge collection of .mp3 files.
We might not want to start importing all these files all at once -
this would create a horrible UX and even block the browser.

What we'd rather do is just import a few files at the same times and
queue up the rest of the files for import whenever another file finishes importing.
