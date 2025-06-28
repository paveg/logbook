#!/usr/bin/env node

import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BLOG_DIR = join(__dirname, '../src/content/blog');

async function validateFrontmatter(filePath, content) {
  const errors = [];

  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    errors.push('Missing frontmatter');
    return errors;
  }

  const frontmatter = frontmatterMatch[1];

  // Check required fields
  const requiredFields = ['title', 'description', 'pubDate'];
  for (const field of requiredFields) {
    if (!frontmatter.includes(`${field}:`)) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate date format
  const dateMatch = frontmatter.match(/pubDate:\s*(.+)/);
  if (dateMatch) {
    const dateStr = dateMatch[1].trim();
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      errors.push(`Invalid pubDate format: ${dateStr}`);
    }
  }

  return errors;
}

async function validateContent(filePath, content) {
  const errors = [];

  // Check for empty content after frontmatter
  const contentAfterFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
  if (!contentAfterFrontmatter) {
    errors.push('Empty content after frontmatter');
  }

  // Check for TODO or FIXME comments
  if (content.includes('TODO') || content.includes('FIXME')) {
    errors.push('Contains TODO or FIXME comments');
  }

  return errors;
}

async function walkDirectory(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkDirectory(fullPath)));
    } else if (entry.isFile() && ['.md', '.mdx'].includes(extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  console.log('🔍 Validating blog content...\n');

  try {
    const files = await walkDirectory(BLOG_DIR);
    let totalErrors = 0;

    for (const file of files) {
      const relativePath = file.replace(BLOG_DIR + '/', '');
      const content = await readFile(file, 'utf-8');

      const frontmatterErrors = await validateFrontmatter(file, content);
      const contentErrors = await validateContent(file, content);

      const allErrors = [...frontmatterErrors, ...contentErrors];

      if (allErrors.length > 0) {
        console.log(`❌ ${relativePath}:`);
        allErrors.forEach((error) => console.log(`   - ${error}`));
        console.log();
        totalErrors += allErrors.length;
      } else {
        console.log(`✅ ${relativePath}`);
      }
    }

    console.log(`\n📊 Validation complete: ${files.length} files checked`);

    if (totalErrors > 0) {
      console.log(`❌ Found ${totalErrors} error(s)`);
      process.exit(1);
    } else {
      console.log('✅ All files are valid!');
    }
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    process.exit(1);
  }
}

main();
