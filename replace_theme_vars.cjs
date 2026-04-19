const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src/components', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Backgrounds
    content = content.replace(/bg-white\/(5|\[0\.0[2-5]\])/g, 'bg-[var(--glass)]');
    content = content.replace(/bg-white\/10/g, 'bg-[var(--glass-hover)]');
    content = content.replace(/bg-white\/(20|30)/g, 'bg-[var(--glass-active)]');
    content = content.replace(/bg-black\/(10|20|40)/g, 'bg-[var(--glass-active)]'); // Sometimes black is used for contrast, let's map it safely

    // Hover Backgrounds
    content = content.replace(/hover:bg-white\/(5|10|\[0\.08\])/g, 'hover:bg-[var(--glass-hover)]');
    content = content.replace(/hover:bg-white\/(20|30)/g, 'hover:bg-[var(--glass-active)]');

    // Borders
    content = content.replace(/border-white\/(5|10)/g, 'border-[var(--glass-border)]');
    content = content.replace(/border-white\/(20|30)/g, 'border-[var(--glass-border-hover)]');

    // Hover Borders
    content = content.replace(/hover:border-white\/(5|10)/g, 'hover:border-[var(--glass-border)]');
    content = content.replace(/hover:border-white\/(20|30)/g, 'hover:border-[var(--glass-border-hover)]');

    // Texts
    content = content.replace(/text-white\/(10|20|30|40|50)/g, 'text-[var(--text-mute)]');
    content = content.replace(/text-white\/(60|70|80)/g, 'text-[var(--text-mute-hover)]');

    // Important: replace hover:text-white where it implies maximum contrast of the UI 
    // EXCEPT when we know it's on a primary background, but generic 'hover:text-white' usually means text-primary
    content = content.replace(/hover:text-white/g, 'hover:text-[var(--color-text-primary)]');
    
    // Also, some generic 'text-white' inside glass might be an issue. We can replace standalone 'text-white' if it's explicitly paired with 'glass'
    // But let's stick to the safe ones first.

    // Shimmer/Gradient
    content = content.replace(/from-white\/(2|5|10)/g, 'from-[var(--glass-hover)]');
    content = content.replace(/via-white\/(5|10|20)/g, 'via-[var(--glass-hover)]');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
