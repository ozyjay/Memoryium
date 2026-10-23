# Assets

All artwork used by these games is included in the application source.

- Garden Pairs uses Unicode emoji defined in `themes` in `dist/index.html`.
  The logo is inline SVG and the favicon is an embedded SVG data URL.
- Garden Glance uses inline SVG strings in `dist/glance.js`: `daisy`, `tulip`,
  `butterfly` and the four collections in `pictures`.
- CSS is embedded in each HTML file. Fonts use the device's system fonts and Georgia.

There are no external images, web fonts, audio files, asset downloads or CDN libraries.
To add a Garden Glance picture, add an object with `name` and `svg` fields to the
appropriate `pictures` collection. Answer buttons are generated from that collection.
